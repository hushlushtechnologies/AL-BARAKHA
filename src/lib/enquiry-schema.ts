import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{7,20}$/, "Please enter a valid phone number"),
  service: z.string().min(1, "Please pick a service"),
  message: z.string().trim().max(2000, "Message is too long"),
  // Honeypot: real users never see or fill this
  website: z.string().max(0),
});

export type Enquiry = z.infer<typeof enquirySchema>;