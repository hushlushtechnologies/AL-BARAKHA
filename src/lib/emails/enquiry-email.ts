 import type { Enquiry } from "@/lib/enquiry-schema";

type EnquiryData = Omit<Enquiry, "website">;

/* Escape user input so nothing they type can break or inject HTML */
const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/* Brand colours (email clients need plain hex, no CSS variables) */
const C = {
  page: "#010403",
  card: "#07100c",
  row: "#0b1d16",
  border: "#16352a",
  brand: "#105646",
  brandLight: "#33b082",
  glow: "#23e29b",
  text: "#f5f4ed",
  muted: "#9fb0a8",
  white: "#ffffff",
};

const FONT = "Helvetica, Arial, sans-serif";

export function buildEnquiryEmail(data: EnquiryData, siteUrl: string) {
  const name = esc(data.name);
  const email = esc(data.email);
  const phone = esc(data.phone);
  const service = esc(data.service);
  const message = data.message ? esc(data.message).replace(/\n/g, "<br />") : "<em>No message provided</em>";
  const phoneDigits = data.phone.replace(/[^\d]/g, "");

  const submitted = new Date().toLocaleString("en-GB", {
    timeZone: "Asia/Dubai",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const subject = `New enquiry: ${data.service} (${data.name})`;

  const detailRow = (label: string, value: string) => `
    <tr>
      <td style="padding:14px 20px;border-bottom:1px solid ${C.border};font:500 13px/1.4 ${FONT};color:${C.muted};width:140px;vertical-align:top;">${label}</td>
      <td style="padding:14px 20px;border-bottom:1px solid ${C.border};font:500 15px/1.5 ${FONT};color:${C.text};vertical-align:top;">${value}</td>
    </tr>`;

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="dark" />
  <meta name="supported-color-schemes" content="dark" />
  <title>${esc(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${C.page};">
  <!-- Preview text shown in the inbox list -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    ${name} is interested in ${service}. Reply directly to this email to respond.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.page}" style="background:${C.page};">
    <tr>
      <td align="center" style="padding:48px 16px 40px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">

          <!-- Card -->
          <tr>
            <td bgcolor="${C.card}" style="background:${C.card};border:1px solid ${C.border};border-radius:20px;overflow:hidden;">

              <!-- Green accent bar -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td height="4" bgcolor="${C.brandLight}" style="background:${C.brandLight};font-size:0;line-height:0;">&nbsp;</td></tr>
              </table>

              <!-- Heading -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:32px 32px 8px;">
                    <span style="display:inline-block;padding:6px 14px;border:1px solid ${C.white};border-radius:999px;font:600 11px/1 ${FONT};letter-spacing:1.5px;text-transform:uppercase;color:${C.white};">
                      New Consultation Enquiry
                    </span>
                    <h1 style="margin:20px 0 8px;font:600 26px/1.3 ${FONT};color:${C.text};">
                      ${name} would like to talk
                    </h1>
                    <p style="margin:0;font:400 15px/1.6 ${FONT};color:${C.muted};">
                      Interested in <strong style="color:${C.glow};font-weight:600;">${service}</strong>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Details -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:24px 32px 8px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.row}" style="background:${C.row};border:1px solid ${C.border};border-radius:14px;border-collapse:separate;overflow:hidden;">
                      ${detailRow("Full Name", name)}
                      ${detailRow("Email", `<a href="mailto:${email}" style="color:${C.glow};text-decoration:none;">${email}</a>`)}
                      ${detailRow("Phone", `<a href="tel:${esc(phoneDigits)}" style="color:${C.glow};text-decoration:none;">${phone}</a>`)}
                      ${detailRow("Service", service)}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:16px 32px 8px;">
                    <p style="margin:0 0 10px;font:500 13px/1.4 ${FONT};color:${C.muted};">Message</p>
                    <div style="padding:18px 20px;background:${C.row};border:1px solid ${C.border};border-left:3px solid ${C.brandLight};border-radius:14px;font:400 15px/1.7 ${FONT};color:${C.text};">
                      ${message}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Actions -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:24px 32px 32px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding:0 10px 10px 0;">
                          <a href="mailto:${email}?subject=${encodeURIComponent("Re: Your consultation enquiry")}"
                             style="display:inline-block;padding:13px 24px;background:${C.brand};border-bottom:3px solid ${C.brandLight};border-radius:999px;font:600 14px/1 ${FONT};color:${C.white};text-decoration:none;">
                            Reply by Email
                          </a>
                        </td>
                        <td style="padding:0 10px 10px 0;">
                          <a href="https://wa.me/${phoneDigits}"
                             style="display:inline-block;padding:12px 22px;border:1px solid ${C.brandLight};border-radius:999px;font:600 14px/1 ${FONT};color:${C.glow};text-decoration:none;">
                            WhatsApp
                          </a>
                        </td>
                        <td style="padding:0 0 10px 0;">
                          <a href="tel:${esc(phoneDigits)}"
                             style="display:inline-block;padding:12px 22px;border:1px solid ${C.border};border-radius:999px;font:600 14px/1 ${FONT};color:${C.text};text-decoration:none;">
                            Call
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:24px 16px 0;font:400 12px/1.6 ${FONT};color:${C.muted};">
              Received ${esc(submitted)} (Dubai time) via the enquiry form on
              <a href="${siteUrl}/enquiry" style="color:${C.muted};">${siteUrl.replace(/^https?:\/\//, "")}</a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  /* Plain-text version for clients that block HTML (also helps deliverability) */
  const text = [
    "NEW CONSULTATION ENQUIRY",
    "",
    `Name:    ${data.name}`,
    `Email:   ${data.email}`,
    `Phone:   ${data.phone}`,
    `Service: ${data.service}`,
    "",
    "Message:",
    data.message || "(no message)",
    "",
    `Received ${submitted} (Dubai time)`,
  ].join("\n");

  return { subject, html, text };
}