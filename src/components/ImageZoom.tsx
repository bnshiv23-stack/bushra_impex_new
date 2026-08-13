"use client";

import { useState, useRef, useCallback, useEffect, TouchEvent, MouseEvent, WheelEvent } from "react";

// ─── Props Interface ────────────────────────────────────────
interface ImageZoomProps {
  imageUrl: string;
  alt: string;
  fuelBadge?: React.ReactNode;
}

// ─── Constants ──────────────────────────────────────────────
const ZOOM_FACTOR      = 3;
const LENS_SIZE        = 120;
const PANEL_SIZE       = 420;
const MODAL_MAX_SCALE  = 8;
const MODAL_MIN_SCALE  = 0.5;
const LONG_PRESS_MS    = 250;   // ms hold to trigger touch magnifier

// ─── Utilities ──────────────────────────────────────────────
function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}
function getTouchDistance(touches: React.TouchList): number {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.sqrt(dx * dx + dy * dy);
}
function getTouchMidpoint(touches: React.TouchList) {
  return {
    x: (touches[0].clientX + touches[1].clientX) / 2,
    y: (touches[0].clientY + touches[1].clientY) / 2,
  };
}

export default function ImageZoom({ imageUrl, alt, fuelBadge }: ImageZoomProps) {

  // ─── Hover / touch-magnifier state ─────────────────────────
  const [zoomActive, setZoomActive] = useState(false);  // lens visible
  const [lensPos,    setLensPos]    = useState({ x: 0, y: 0 });
  const [panelPos,   setPanelPos]   = useState({ top: 0, left: 0 });
  const [bgPct,      setBgPct]      = useState({ x: 0, y: 0 });

  // ─── Corner icon hover state ────────────────────────────────
  const [iconHovered, setIconHovered] = useState(false);

  // ─── Desktop device detection ───────────────────────────────
  const [hasHover, setHasHover] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setHasHover(mq.matches);
    const handler = (e: MediaQueryListEvent) => setHasHover(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // ─── Modal state ─────────────────────────────────────────────
  const [modalOpen, setModalOpen] = useState(false);
  const [scale,     setScale]     = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  // ─── Refs ─────────────────────────────────────────────────────
  const imgBoxRef   = useRef<HTMLDivElement>(null);
  const modalImgRef = useRef<HTMLDivElement>(null);

  // drag-to-pan in modal (desktop)
  const isDragging       = useRef(false);
  const dragStart        = useRef({ x: 0, y: 0 });
  const translateAtDrag  = useRef({ x: 0, y: 0 });

  // pinch-to-zoom in modal (mobile)
  const lastPinchDist    = useRef<number | null>(null);
  const lastPinchMid     = useRef<{ x: number; y: number } | null>(null);
  const scaleAtPinch     = useRef(1);
  const translateAtPinch = useRef({ x: 0, y: 0 });

  // long-press magnifier
  const longPressTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchZooming     = useRef(false);

  // ─── Body scroll lock ────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = modalOpen ? "hidden" : "";
    if (!modalOpen) { setScale(1); setTranslate({ x: 0, y: 0 }); }
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  // ─── Keyboard shortcuts (modal + TV navigation) ─────────────
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "+": case "=":
          e.preventDefault(); setScale(s => clamp(s * 1.2, MODAL_MIN_SCALE, MODAL_MAX_SCALE)); break;
        case "-": case "_":
          e.preventDefault(); setScale(s => clamp(s * 0.85, MODAL_MIN_SCALE, MODAL_MAX_SCALE)); break;
        case "ArrowUp":    e.preventDefault(); setTranslate(t => ({ ...t, y: t.y + 30 })); break;
        case "ArrowDown":  e.preventDefault(); setTranslate(t => ({ ...t, y: t.y - 30 })); break;
        case "ArrowLeft":  e.preventDefault(); setTranslate(t => ({ ...t, x: t.x + 30 })); break;
        case "ArrowRight": e.preventDefault(); setTranslate(t => ({ ...t, x: t.x - 30 })); break;
        case "Escape":     e.preventDefault(); setModalOpen(false); break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);

  // ═══════════════════════════════════════════════════════════
  // SHARED — update lens/panel from a page coordinate
  // ═══════════════════════════════════════════════════════════

  const updateLens = useCallback((cx: number, cy: number) => {
    if (!imgBoxRef.current) return;
    const rect = imgBoxRef.current.getBoundingClientRect();
    const relX = cx - rect.left;
    const relY = cy - rect.top;
    const lensX = clamp(relX - LENS_SIZE / 2, 0, rect.width  - LENS_SIZE);
    const lensY = clamp(relY - LENS_SIZE / 2, 0, rect.height - LENS_SIZE);
    const bgX = rect.width  > LENS_SIZE ? (lensX / (rect.width  - LENS_SIZE)) * 100 : 0;
    const bgY = rect.height > LENS_SIZE ? (lensY / (rect.height - LENS_SIZE)) * 100 : 0;
    setLensPos({ x: lensX, y: lensY });
    setBgPct({ x: bgX, y: bgY });
    const panelLeft = rect.right + 12;
    const fitsRight = panelLeft + PANEL_SIZE <= window.innerWidth - 8;
    setPanelPos({
      top:  clamp(rect.top, 8, window.innerHeight - PANEL_SIZE - 8),
      left: fitsRight ? panelLeft : rect.left - PANEL_SIZE - 12,
    });
  }, []);

  // ═══════════════════════════════════════════════════════════
  // HOVER ZOOM — desktop mouse
  // ═══════════════════════════════════════════════════════════

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!hasHover) return;
    updateLens(e.clientX, e.clientY);
  }, [hasHover, updateLens]);

  // ═══════════════════════════════════════════════════════════
  // LONG-PRESS ZOOM — touch devices
  // ═══════════════════════════════════════════════════════════

  const onTouchStartThumb = useCallback((e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    const t = e.touches[0];
    longPressTimer.current = setTimeout(() => {
      touchZooming.current = true;
      setZoomActive(true);
      updateLens(t.clientX, t.clientY);
    }, LONG_PRESS_MS);
  }, [updateLens]);

  const onTouchMoveThumb = useCallback((e: TouchEvent<HTMLDivElement>) => {
    if (!touchZooming.current) {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
      return;
    }
    e.preventDefault();
    updateLens(e.touches[0].clientX, e.touches[0].clientY);
  }, [updateLens]);

  const onTouchEndThumb = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    if (touchZooming.current) {
      touchZooming.current = false;
      setZoomActive(false);
    } else {
      setModalOpen(true);
    }
  }, []);

  // ═══════════════════════════════════════════════════════════
  // MODAL — desktop: wheel zoom + drag-to-pan
  // ═══════════════════════════════════════════════════════════

  const handleWheel = useCallback((e: WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY < 0 ? 1.15 : 0.87;
    setScale(prev => clamp(prev * delta, MODAL_MIN_SCALE, MODAL_MAX_SCALE));
  }, []);

  const handleMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (scale <= 1) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    translateAtDrag.current = { ...translate };
    e.currentTarget.style.cursor = "grabbing";
  }, [scale, translate]);

  const handleMouseMoveModal = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setTranslate({
      x: translateAtDrag.current.x + dx,
      y: translateAtDrag.current.y + dy,
    });
  }, []);

  const handleMouseUp = useCallback((e: MouseEvent<HTMLDivElement>) => {
    isDragging.current = false;
    e.currentTarget.style.cursor = scale > 1 ? "grab" : "default";
  }, [scale]);

  const handleDblClick = useCallback(() => {
    setScale(1); setTranslate({ x: 0, y: 0 });
  }, []);

  // ═══════════════════════════════════════════════════════════
  // MODAL — mobile: pinch-to-zoom + single-finger pan
  // ═══════════════════════════════════════════════════════════

  const handleTouchStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      lastPinchDist.current    = getTouchDistance(e.touches);
      lastPinchMid.current     = getTouchMidpoint(e.touches);
      scaleAtPinch.current     = scale;
      translateAtPinch.current = { ...translate };
    } else if (e.touches.length === 1 && scale > 1) {
      isDragging.current      = true;
      dragStart.current       = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      translateAtDrag.current = { ...translate };
    }
  }, [scale, translate]);

  const handleTouchMove = useCallback((e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.touches.length === 2 && lastPinchDist.current !== null) {
      const currentDist = getTouchDistance(e.touches);
      const newScale = clamp(
        scaleAtPinch.current * (currentDist / lastPinchDist.current!),
        MODAL_MIN_SCALE, MODAL_MAX_SCALE
      );
      setScale(newScale);
      const m  = getTouchMidpoint(e.touches);
      const dx = m.x - lastPinchMid.current!.x;
      const dy = m.y - lastPinchMid.current!.y;
      setTranslate({
        x: translateAtPinch.current.x + dx,
        y: translateAtPinch.current.y + dy,
      });
    } else if (e.touches.length === 1 && isDragging.current) {
      const dx = e.touches[0].clientX - dragStart.current.x;
      const dy = e.touches[0].clientY - dragStart.current.y;
      setTranslate({
        x: translateAtDrag.current.x + dx,
        y: translateAtDrag.current.y + dy,
      });
    }
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length < 2) { lastPinchDist.current = null; lastPinchMid.current = null; }
    if (e.touches.length === 0) { isDragging.current = false; }
  }, []);

  // ═══════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════

  return (
    <>
      {/* ── THUMBNAIL IMAGE BOX ─────────────────────────────── */}
      <div
        ref={imgBoxRef}
        tabIndex={0}  /* TV/keyboard: focusable */
        onMouseEnter={() => { if (hasHover) setZoomActive(true); }}
        onMouseLeave={() => setZoomActive(false)}
        onMouseMove={handleMouseMove}
        onClick={() => { if (hasHover) setModalOpen(true); }}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setModalOpen(true); } }}
        onTouchStart={onTouchStartThumb}
        onTouchMove={onTouchMoveThumb}
        onTouchEnd={onTouchEndThumb}
        style={{
          flex: 1,
          aspectRatio: "1 / 1",
          background: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
          position: "relative",
          overflow: "hidden",
          cursor: hasHover ? (zoomActive ? "crosshair" : "zoom-in") : "pointer",
          userSelect: "none",
          WebkitUserSelect: "none",
          outline: "none",
        }}
      >
        {/* Product image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl} alt={alt} draggable={false}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "contain", padding: "24px",
            pointerEvents: "none",
          }}
        />

        {fuelBadge}

        {/* Zoom lens square */}
        {zoomActive && hasHover && (
          <div style={{
            position: "absolute",
            width: LENS_SIZE, height: LENS_SIZE,
            top: lensPos.y, left: lensPos.x,
            border: "2px solid #D71920",
            background: "rgba(215,25,32,0.06)",
            pointerEvents: "none", zIndex: 10,
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
            background: iconHovered ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0.28)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.18)",
            cursor: "pointer",
            transition: "background 0.18s, transform 0.18s",
            transform: iconHovered ? "scale(1.12)" : "scale(1)",
            zIndex: 12,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
               stroke="rgba(255,255,255,0.9)" strokeWidth="2.2" strokeLinecap="round">
            <polyline points="15 3 21 3 21 9"/>
            <polyline points="9 21 3 21 3 15"/>
            <line x1="21" y1="3" x2="14" y2="10"/>
            <line x1="3" y1="21" x2="10" y2="14"/>
          </svg>
        </button>

        {/* Touch hint — tiny, non-intrusive, only on touch devices */}
        {!hasHover && (
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

      {/* ── DESKTOP SIDE PANEL ─────────────────────────────── */}
      {zoomActive && hasHover && (
        <div
          style={{
            position: "fixed",
            top: panelPos.top, left: panelPos.left,
            width: PANEL_SIZE, height: PANEL_SIZE,
            zIndex: 9000,
            border: "2px solid var(--border-color)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
            overflow: "hidden", pointerEvents: "none",
            backgroundColor: "var(--bg-secondary)",
            backgroundImage: `url(${imageUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${ZOOM_FACTOR * 100}% ${ZOOM_FACTOR * 100}%`,
            backgroundPosition: `${bgPct.x}% ${bgPct.y}%`,
          }}
        />
      )}

      {/* ── TOUCH LONG-PRESS ZOOM PANEL ─────────────────────── */}
      {zoomActive && !hasHover && (
        <div style={{
          position: "fixed",
          top: clamp(panelPos.top - (PANEL_SIZE * 0.7) / 2 - 60, 16, window.innerHeight - (PANEL_SIZE * 0.7) - 16),
          left: clamp(panelPos.left, 16, window.innerWidth  - (PANEL_SIZE * 0.7) - 16),
          width: PANEL_SIZE * 0.7, height: PANEL_SIZE * 0.7,
          zIndex: 9000, borderRadius: 16,
          border: "2px solid rgba(0,0,0,0.12)",
          boxShadow: "0 12px 48px rgba(0,0,0,0.3)",
          overflow: "hidden", pointerEvents: "none",
          backgroundColor: "var(--bg-secondary)",
          backgroundImage: `url(${imageUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: `${ZOOM_FACTOR * 100}% ${ZOOM_FACTOR * 100}%`,
          backgroundPosition: `${bgPct.x}% ${bgPct.y}%`,
        }} />
      )}

      {/* ── FULLSCREEN MODAL ─────────────────────────────────── */}
      {modalOpen && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 999999,
            background: "#000",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}
          onWheel={handleWheel}
        >
          {/* Close button */}
          <button
            onClick={() => setModalOpen(false)}
            style={{
              position: "absolute", top: 20, right: 20, zIndex: 10,
              background: "rgba(255,255,255,0.12)", border: "none",
              borderRadius: "50%", width: 44, height: 44,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#fff", transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          {/* Scale indicator */}
          <div style={{
            position: "absolute", top: 24, left: "50%", transform: "translateX(-50%)",
            color: "rgba(255,255,255,0.4)",
            fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em",
            pointerEvents: "none",
          }}>
            {Math.round(scale * 100)}%
          </div>

          {/* Device-adaptive hint */}
          <div style={{
            position: "absolute", top: 46, left: "50%", transform: "translateX(-50%)",
            color: "rgba(255,255,255,0.25)",
            fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em",
            pointerEvents: "none", whiteSpace: "nowrap",
          }}>
            {hasHover
              ? "Scroll to zoom · Drag to pan · +/− · Esc"
              : "Pinch to zoom · Drag to pan · Double-tap to reset"}
          </div>

          {/* Zoom controls (desktop) */}
          {hasHover && (
            <div style={{
              position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)",
              display: "flex", alignItems: "center", gap: 12, zIndex: 10,
            }}>
              <button onClick={() => setScale(s => clamp(s * 0.8, MODAL_MIN_SCALE, MODAL_MAX_SCALE))} style={btnStyle}>−</button>
              <button onClick={() => { setScale(1); setTranslate({ x: 0, y: 0 }); }}
                style={{ ...btnStyle, borderRadius: 10, width: "auto", padding: "0 12px", fontSize: 10, letterSpacing: "0.06em" }}>
                RESET
              </button>
              <button onClick={() => setScale(s => clamp(s * 1.25, MODAL_MIN_SCALE, MODAL_MAX_SCALE))} style={btnStyle}>+</button>
            </div>
          )}

          {/* Image interaction zone */}
          <div
            ref={modalImgRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMoveModal}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            onDoubleClick={handleDblClick}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: scale > 1 ? "grab" : "default",
              touchAction: "none", overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl} alt={alt} draggable={false}
              style={{
                maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain",
                transform: `scale(${scale}) translate(${translate.x / scale}px, ${translate.y / scale}px)`,
                transformOrigin: "center center",
                userSelect: "none", WebkitUserSelect: "none",
                pointerEvents: "none", display: "block",
                transition: isDragging.current ? "none" : "transform 0.1s ease",
              }}
            />
          </div>
        </div>
      )}

      <style>{``}</style>
    </>
  );
}

const btnStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.12)", border: "none",
  borderRadius: "50%", width: 36, height: 36,
  color: "#fff", fontSize: 20, fontWeight: 700,
  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
  lineHeight: 1,
};
