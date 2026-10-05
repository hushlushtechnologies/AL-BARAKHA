import { z } from "zod";
import { isValidPhoneNumber, type CountryCode } from "libphonenumber-js";

export const enquirySchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your full name"),
    email: z
      .string()
      .trim()
      .min(1, "Please enter your email address")
      .email("Please enter a valid email address"),
    country: z.string().min(2, "Please select a country code"),
    phone: z.string().trim().min(1, "Please enter your phone number"),
    service: z.string().min(1, "Please pick a service"),
    message: z.string().trim().max(2000, "Message is too long"),
    // Honeypot: real users never see or fill this
    website: z.string().max(0),
  })
  .superRefine((data, ctx) => {
    if (!data.phone) return;
    if (!isValidPhoneNumber(data.phone, data.country as CountryCode)) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Please enter a valid phone number for the selected country",
      });
    }
  });

export type Enquiry = z.infer<typeof enquirySchema>;