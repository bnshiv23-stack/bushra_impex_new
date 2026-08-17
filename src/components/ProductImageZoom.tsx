"use client";

import { useState, useRef, useCallback, useEffect } from "react";

// ═══════════════════════════════════════════════════════════════
// PROPS
// ═══════════════════════════════════════════════════════════════
interface ProductImageZoomProps {
  imageUrl: string;
  altText?: string;
  fuelBadge?: React.ReactNode;
}

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════
const LENS_SIZE        = 160;
const PANEL_SIZE       = 400;
const MIN_ZOOM         = 100;
const MAX_ZOOM         = 500;
const ZOOM_STEP        = 15;
const LONG_PRESS_MS    = 250;   // hold duration to trigger touch magnifier

function clamp(v: number, lo: number, hi: number) {
  return Math.min(Math.max(v, lo), hi);
}

// ═══════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function ProductImageZoom({
  imageUrl,
  altText = "Product image",
  fuelBadge,
}: ProductImageZoomProps) {

  /* ─── Hover/touch-magnifier state ─────────────────────────── */
  const [zoomActive, setZoomActive]   = useState(false);  // lens visible
  const [lensX, setLensX]             = useState(0);
  const [lensY, setLensY]             = useState(0);
  const [boxSize, setBoxSize]         = useState({ w: 0, h: 0 });
  const [panelScreen, setPanelScreen] = useState({ top: 0, left: 0 });

  /* ─── Corner icon hover (desktop only) ────────────────────── */
  const [iconHovered, setIconHovered] = useState(false);

  /* ─── Modal state ─────────────────────────────────────────── */
  const [modalOpen,  setModalOpen]  = useState(false);
  const [zoom,       setZoom]       = useState(100);
  const [panX,       setPanX]       = useState(0);
  const [panY,       setPanY]       = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  /* ─── Device detection ────────────────────────────────────── */
  const [hasPointer, setHasPointer] = useState(false);  // fine mouse

  /* ─── Refs ────────────────────────────────────────────────── */
  const boxRef         = useRef<HTMLDivElement>(null);
  const rafId          = useRef(0);
  const dragOrigin     = useRef({ mx: 0, my: 0, px: 0, py: 0 });
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchZooming   = useRef(false);   // long-press zoom active on touch

  // Pinch refs
  const pinchDist0 = useRef<number | null>(null);
  const pinchZoom0 = useRef(100);
  const pinchPan0  = useRef({ x: 0, y: 0 });
  const pinchMid0  = useRef({ x: 0, y: 0 });

  // Swipe-to-close
  const swipeY0 = useRef<number | null>(null);

  /* ═══════════════════════════════════════════════════════════
     EFFECTS
     ═══════════════════════════════════════════════════════════ */

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setHasPointer(mq.matches);
    const fn = (e: MediaQueryListEvent) => setHasPointer(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    if (!modalOpen) { setZoom(100); setPanX(0); setPanY(0); }
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  // Keyboard shortcuts (modal + TV focus)
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "+": case "=":
          e.preventDefault(); setZoom(z => clamp(z + ZOOM_STEP, MIN_ZOOM, MAX_ZOOM)); break;
        case "-": case "_":
          e.preventDefault(); setZoom(z => clamp(z - ZOOM_STEP, MIN_ZOOM, MAX_ZOOM)); break;
        case "ArrowUp":    e.preventDefault(); setPanY(p => p + 30); break;
        case "ArrowDown":  e.preventDefault(); setPanY(p => p - 30); break;
        case "ArrowLeft":  e.preventDefault(); setPanX(p => p + 30); break;
        case "ArrowRight": e.preventDefault(); setPanX(p => p - 30); break;
        case "Escape":     e.preventDefault(); setModalOpen(false);  break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  /* ═══════════════════════════════════════════════════════════
     SHARED — update lens position from a page coordinate
     ═══════════════════════════════════════════════════════════ */

  const updateLens = useCallback((cx: number, cy: number) => {
    if (!boxRef.current) return;
    cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      const r = boxRef.current!.getBoundingClientRect();
      const mx = cx - r.left, my = cy - r.top;
      const half = LENS_SIZE / 2;
      const lx = clamp(mx - half, 0, r.width  - LENS_SIZE);
      const ly = clamp(my - half, 0, r.height - LENS_SIZE);
      setLensX(lx);
      setLensY(ly);
      setBoxSize({ w: r.width, h: r.height });
      const pr = r.right + 16;
      const fits = pr + PANEL_SIZE <= window.innerWidth - 16;
      setPanelScreen({
        top:  clamp(r.top, 16, window.innerHeight - PANEL_SIZE - 16),
        left: fits ? pr : r.left - PANEL_SIZE - 16,
      });
    });
  }, []);

  /* ═══════════════════════════════════════════════════════════
     HOVER ZOOM — desktop mouse
     ═══════════════════════════════════════════════════════════ */

  const onImgMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!hasPointer) return;
    updateLens(e.clientX, e.clientY);
  }, [hasPointer, updateLens]);

  /* ═══════════════════════════════════════════════════════════
     LONG-PRESS ZOOM — touch devices
     ═══════════════════════════════════════════════════════════ */

  const onTouchStartThumb = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    longPressTimer.current = setTimeout(() => {
      touchZooming.current = true;
      setZoomActive(true);
      updateLens(t.clientX, t.clientY);
    }, LONG_PRESS_MS);
  }, [updateLens]);

  const onTouchMoveThumb = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchZooming.current) {
      // Not yet a long-press — cancel if moved too much
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
      return;
    }
    e.preventDefault(); // stop scroll while long-press zooming
    updateLens(e.touches[0].clientX, e.touches[0].clientY);
  }, [updateLens]);

  const onTouchEndThumb = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    if (touchZooming.current) {
      // Long-press released → close magnifier, do NOT open modal
      touchZooming.current = false;
      setZoomActive(false);
    } else {
      // Quick tap → open modal lightbox
      setModalOpen(true);
    }
  }, []);

  /* ═══════════════════════════════════════════════════════════
     MODAL — wheel zoom
     ═══════════════════════════════════════════════════════════ */

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const step = e.deltaY < 0 ? ZOOM_STEP : -ZOOM_STEP;
    setZoom(z => clamp(z + step, MIN_ZOOM, MAX_ZOOM));
  }, []);

  /* ═══════════════════════════════════════════════════════════
     MODAL — drag-to-pan (mouse)
     ═══════════════════════════════════════════════════════════ */

  const onDragStart = useCallback((e: React.MouseEvent) => {
    if (zoom <= 100) return;
    e.preventDefault();
    setIsDragging(true);
    dragOrigin.current = { mx: e.clientX, my: e.clientY, px: panX, py: panY };
  }, [zoom, panX, panY]);

  const onDragMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanX(dragOrigin.current.px + (e.clientX - dragOrigin.current.mx));
    setPanY(dragOrigin.current.py + (e.clientY - dragOrigin.current.my));
  }, [isDragging]);

  const onDragEnd = useCallback(() => { setIsDragging(false); }, []);

  /* ═══════════════════════════════════════════════════════════
     MODAL — pinch-to-zoom + swipe-to-close (touch)
     ═══════════════════════════════════════════════════════════ */

  const dist = (t: React.TouchList) => {
    const dx = t[0].clientX - t[1].clientX;
    const dy = t[0].clientY - t[1].clientY;
    return Math.hypot(dx, dy);
  };
  const mid = (t: React.TouchList) => ({
    x: (t[0].clientX + t[1].clientX) / 2,
    y: (t[0].clientY + t[1].clientY) / 2,
  });

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      pinchDist0.current = dist(e.touches);
      pinchZoom0.current = zoom;
      pinchPan0.current  = { x: panX, y: panY };
      pinchMid0.current  = mid(e.touches);
    } else if (e.touches.length === 1) {
      if (zoom > 100) {
        setIsDragging(true);
        dragOrigin.current = {
          mx: e.touches[0].clientX, my: e.touches[0].clientY,
          px: panX, py: panY,
        };
      } else {
        swipeY0.current = e.touches[0].clientY;
      }
    }
  }, [zoom, panX, panY]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    if (e.touches.length === 2 && pinchDist0.current !== null) {
      const d = dist(e.touches);
      setZoom(clamp(pinchZoom0.current * (d / pinchDist0.current), MIN_ZOOM, MAX_ZOOM));
      const m = mid(e.touches);
      setPanX(pinchPan0.current.x + m.x - pinchMid0.current.x);
      setPanY(pinchPan0.current.y + m.y - pinchMid0.current.y);
    } else if (e.touches.length === 1 && isDragging) {
      setPanX(dragOrigin.current.px + (e.touches[0].clientX - dragOrigin.current.mx));
      setPanY(dragOrigin.current.py + (e.touches[0].clientY - dragOrigin.current.my));
    }
  }, [isDragging]);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (e.touches.length < 2) pinchDist0.current = null;
    if (e.touches.length === 0) {
      setIsDragging(false);
      if (swipeY0.current !== null && zoom <= 100) {
        const endY = e.changedTouches[0]?.clientY ?? 0;
        if (endY - swipeY0.current > 100) setModalOpen(false);
      }
      swipeY0.current = null;
    }
  }, [zoom]);

  const onDblClick = useCallback(() => {
    if (zoom > 100) { setZoom(100); setPanX(0); setPanY(0); }
    else setZoom(250);
  }, [zoom]);

  /* ═══════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════ */

  const modalCursor = isDragging ? "grabbing" : zoom > 100 ? "grab" : "zoom-in";
  const lensOn = zoomActive || (hasPointer && /* onMouseEnter sets zoomActive */ false);

  return (
    <>
      {/* ════════ MAIN IMAGE BOX ════════ */}
      <div
        ref={boxRef}
        tabIndex={0}    /* TV/keyboard: focusable */
        onMouseEnter={() => { if (hasPointer) setZoomActive(true); }}
        onMouseLeave={() => { setZoomActive(false); cancelAnimationFrame(rafId.current); }}
        onMouseMove={onImgMouseMove}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (hasPointer) setModalOpen(true); }}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setModalOpen(true); } }}
        onTouchStart={onTouchStartThumb}
        onTouchMove={onTouchMoveThumb}
        onTouchEnd={onTouchEndThumb}
        style={{
          flex: 1, aspectRatio: "1/1", background: "var(--bg-secondary)",
          border: "1px solid var(--border-color)", position: "relative",
          overflow: "hidden",
          cursor: zoomActive && hasPointer ? "crosshair" : "zoom-in",
          userSelect: "none", WebkitUserSelect: "none",
          outline: "none",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt={altText} draggable={false} style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "contain", padding: 10, pointerEvents: "none",
          transform: "scale(1.08)", // Gives wide machines like chainsaws extra presence and visual balance
          transition: "transform 0.3s ease",
        }} />

        {fuelBadge}

        {/* ── Hover / long-press lens square ── */}
        {zoomActive && (
          <div style={{
            position: "absolute", width: LENS_SIZE, height: LENS_SIZE,
            top: lensY, left: lensX,
            border: "1px solid rgba(0,0,0,0.15)",
            background: "rgba(255,255,255,0.35)",
            pointerEvents: "none", zIndex: 10,
            boxShadow: "0 0 10px rgba(0,0,0,0.05)",
          }} />
        )}

        {/* ── Corner expand icon (replaces the distracting bottom pill) ── */}
        <button
          aria-label="Enlarge image"
          onMouseEnter={() => setIconHovered(true)}
          onMouseLeave={() => setIconHovered(false)}
          onClick={(e) => { e.stopPropagation(); setModalOpen(true); }}
          style={{
            position: "absolute", top: 10, right: 10,
            width: 32, height: 32, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: iconHovered
              ? "rgba(0,0,0,0.55)"
              : "rgba(0,0,0,0.28)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.18)",
            cursor: "pointer",
            transition: "background 0.18s, transform 0.18s",
            transform: iconHovered ? "scale(1.12)" : "scale(1)",
            zIndex: 12,
          }}
        >
          {/* Expand arrows icon */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
               stroke="rgba(255,255,255,0.9)" strokeWidth="2.2" strokeLinecap="round">
            <polyline points="15 3 21 3 21 9"/>
            <polyline points="9 21 3 21 3 15"/>
            <line x1="21" y1="3" x2="14" y2="10"/>
            <line x1="3" y1="21" x2="10" y2="14"/>
          </svg>
        </button>

        {/* ── Touch hint: tiny bottom-right text, only on non-pointer devices, fades fast ── */}
        {!hasPointer && (
          <div style={{
            position: "absolute", bottom: 8, right: 10,
            fontSize: 9, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.1em", color: "rgba(0,0,0,0.32)",
            pointerEvents: "none",
          }}>
            Hold to zoom
          </div>
        )}
      </div>

      {/* ════════ SIDE ZOOM PANEL ════════ */}
      {zoomActive && hasPointer && (
        <div style={{
          position: "fixed",
          top: panelScreen.top, left: panelScreen.left,
          width: PANEL_SIZE, height: PANEL_SIZE,
          zIndex: 9999, border: "1px solid #E0E0E0",
          boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
          pointerEvents: "none", backgroundColor: "var(--bg-secondary)",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            width: boxSize.w * (PANEL_SIZE / LENS_SIZE),
            height: boxSize.h * (PANEL_SIZE / LENS_SIZE),
            left: -lensX * (PANEL_SIZE / LENS_SIZE),
            top: -lensY * (PANEL_SIZE / LENS_SIZE),
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt={altText} style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "contain",
              padding: 10 * (PANEL_SIZE / LENS_SIZE),
              transform: "scale(1.08)",
            }} />
          </div>
        </div>
      )}

      {/* ════════ TOUCH LONG-PRESS ZOOM PANEL (fixed, above finger) ════════ */}
      {zoomActive && !hasPointer && (
        <div style={{
          position: "fixed",
          top: Math.max(16, panelScreen.top - PANEL_SIZE / 2 - 60),
          left: clamp(panelScreen.left, 16, window.innerWidth - PANEL_SIZE - 16),
          width: PANEL_SIZE * 0.7, height: PANEL_SIZE * 0.7,
          zIndex: 9999, border: "2px solid rgba(0,0,0,0.12)",
          boxShadow: "0 12px 48px rgba(0,0,0,0.3)",
          pointerEvents: "none", backgroundColor: "var(--bg-secondary)",
          overflow: "hidden", borderRadius: 16,
        }}>
          <div style={{
            position: "absolute",
            width: boxSize.w * ((PANEL_SIZE * 0.7) / LENS_SIZE),
            height: boxSize.h * ((PANEL_SIZE * 0.7) / LENS_SIZE),
            left: -lensX * ((PANEL_SIZE * 0.7) / LENS_SIZE),
            top: -lensY * ((PANEL_SIZE * 0.7) / LENS_SIZE),
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt={altText} style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "contain",
              padding: 10 * ((PANEL_SIZE * 0.7) / LENS_SIZE),
              transform: "scale(1.08)",
            }} />
          </div>
        </div>
      )}

      {/* ════════ FULLSCREEN MODAL ════════ */}
      {modalOpen && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 999999,
            background: "rgba(0,0,0,0.92)", display: "flex",
            flexDirection: "column" as const,
            alignItems: "center", justifyContent: "center",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
        >
          {/* Top Bar with Safe Area Inset */}
          <div style={{
            position: "absolute", top: "calc(16px + env(safe-area-inset-top, 0px))",
            left: 16, right: 16, zIndex: 9999999,
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            {/* Prominent High-Contrast Close Button */}
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              style={{
                background: "#D71920", border: "none",
                borderRadius: 999, padding: "8px 18px",
                display: "flex", alignItems: "center", gap: 8,
                cursor: "pointer", color: "#fff", fontSize: 13, fontWeight: 700,
                letterSpacing: "0.05em", textTransform: "uppercase",
                boxShadow: "0 4px 20px rgba(215,25,32,0.6)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Close Zoom
            </button>

            {/* Top Right Quick Close ✕ */}
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              style={{
                background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "50%", width: 40, height: 40,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "#fff", fontSize: 18, fontWeight: 700,
                boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
              }}
            >✕</button>
          </div>

          {/* Zoom % indicator */}
          <div style={{
            position: "absolute", top: "calc(20px + env(safe-area-inset-top, 0px))", left: "50%",
            transform: "translateX(-50%)", color: "rgba(255,255,255,0.7)",
            fontSize: 12, fontWeight: 700, letterSpacing: "0.05em",
            background: "rgba(255,255,255,0.1)", padding: "4px 12px", borderRadius: 999,
            pointerEvents: "none", zIndex: 10,
          }}>{Math.round(zoom)}%</div>

          {/* Hint text — device adaptive */}
          <div style={{
            position: "absolute", top: "calc(64px + env(safe-area-inset-top, 0px))", left: "50%",
            transform: "translateX(-50%)", color: "rgba(255,255,255,0.35)",
            fontSize: 10, fontWeight: 700, textTransform: "uppercase" as const,
            letterSpacing: "0.1em", pointerEvents: "none",
            whiteSpace: "nowrap" as const, zIndex: 10,
          }}>
            {hasPointer
              ? "Scroll to zoom · Drag to pan · +/− keys · Esc to close"
              : "Pinch to zoom · Drag to pan · Swipe down to close"}
          </div>

          {/* Image interaction area */}
          <div
            onWheel={onWheel}
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            onDoubleClick={onDblClick}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{
              width: "100%", height: "calc(100% - 70px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: modalCursor, touchAction: "none", overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt={altText} draggable={false} style={{
              maxWidth: "85vw", maxHeight: "78vh", objectFit: "contain",
              transform: `scale(${zoom / 100}) translate(${panX / (zoom / 100)}px, ${panY / (zoom / 100)}px)`,
              transformOrigin: "center center",
              transition: isDragging ? "none" : "transform 0.12s ease-out",
              userSelect: "none", WebkitUserSelect: "none",
              pointerEvents: "none",
            }} />
          </div>

          {/* Zoom slider bar */}
          <div style={{
            position: "absolute", bottom: 20, left: "50%",
            transform: "translateX(-50%)", display: "flex",
            alignItems: "center", gap: 10, zIndex: 10,
            background: "rgba(0,0,0,0.55)", padding: "8px 16px",
            borderRadius: 999, backdropFilter: "blur(8px)",
          }}>
            <button onClick={() => setZoom(z => clamp(z - ZOOM_STEP, MIN_ZOOM, MAX_ZOOM))}
              style={ZOOM_BTN}>−</button>
            <input type="range" min={MIN_ZOOM} max={MAX_ZOOM} value={zoom}
              onChange={e => setZoom(Number(e.target.value))}
              style={{ width: 130, accentColor: "#D71920", cursor: "pointer" }} />
            <button onClick={() => setZoom(z => clamp(z + ZOOM_STEP, MIN_ZOOM, MAX_ZOOM))}
              style={ZOOM_BTN}>+</button>
            <button onClick={() => { setZoom(100); setPanX(0); setPanY(0); }}
              style={{ ...ZOOM_BTN, width: "auto", borderRadius: 10,
                       padding: "0 10px", fontSize: 10, letterSpacing: "0.06em" }}>
              RESET
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const ZOOM_BTN: React.CSSProperties = {
  background: "rgba(255,255,255,0.12)", border: "none",
  borderRadius: "50%", width: 30, height: 30,
  color: "#fff", fontSize: 17, fontWeight: 700,
  cursor: "pointer", display: "flex",
  alignItems: "center", justifyContent: "center", lineHeight: 1,
};
