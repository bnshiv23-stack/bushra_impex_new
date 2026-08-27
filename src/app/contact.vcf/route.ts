import { DEFAULT_COMPANY_CONTACT, generateVCardString } from "@/lib/vcard";

export async function GET() {
  const vcard = generateVCardString(DEFAULT_COMPANY_CONTACT);

  return new Response(vcard, {
    status: 200,
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'attachment; filename="Bushra_Impex_X1_Power.vcf"',
      "Cache-Control": "public, max-age=86400",
    },
  });
}
