 import { NextResponse } from "next/server";
import { enquirySchema } from "@/lib/enquiry-schema";
import { buildEnquiryEmail } from "@/lib/emails/enquiry-email";
import { parsePhoneNumberFromString, type CountryCode } from "libphonenumber-js";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    // Honeypot filled = bot. Pretend success so it doesn't retry.
    if (typeof body === "object" && body && "website" in body && (body as { website?: string }).website) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const { website: _honeypot, ...rest } = parsed.data;

  // Store the phone in international format, e.g. +971 50 123 4567
  const formattedPhone =
    parsePhoneNumberFromString(rest.phone, rest.country as CountryCode)?.formatInternational() ?? rest.phone;

  const data = { ...rest, phone: formattedPhone };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;

  // No email configured yet (local dev): log and succeed
  if (!apiKey || !to) {
    console.info("[enquiry]", data);
    return NextResponse.json({ ok: true });
  }

  // Branded HTML email + plain-text fallback
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://afaqalbarakha.com";
  const email = buildEnquiryEmail(data, siteUrl);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM_EMAIL ?? "Afaq Website <onboarding@resend.dev>",
      to: [to],
      reply_to: data.email,
      subject: email.subject,
      html: email.html,
      text: email.text,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("[enquiry] email failed", detail);
    return NextResponse.json(
      {
        error: "Could not send your enquiry. Please try again.",
        // Resend's exact reason, only exposed in development
        ...(process.env.NODE_ENV === "development" && { detail }),
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}