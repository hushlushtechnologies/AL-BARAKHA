"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { ease, fadeUp, stagger } from "@/lib/motion";
import { enquirySchema, type Enquiry } from "@/lib/enquiry-schema";
import { serviceOptions } from "@/lib/site";
import { ChevronDown, Spinner } from "@/components/ui/icons";

const fieldClass =
  "w-full rounded-xl border border-white/[0.06] bg-[linear-gradient(180deg,rgb(20_48_37/0.8),rgb(10_28_22/0.8))] px-6 text-[15px] text-primary shadow-[inset_0_1px_0_rgb(255_255_255/0.04)] outline-none backdrop-blur-sm transition-[border-color,box-shadow] duration-300 placeholder:text-primary/45 hover:border-white/15 focus:border-brand-light/60 focus:shadow-[0_0_0_4px_rgb(51_176_130/0.15),0_0_30px_-8px_rgb(35_226_155/0.5)] aria-[invalid=true]:border-red-400/60";

type Status = "idle" | "success" | "error";

export function EnquiryForm() {
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Enquiry>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { name: "", email: "", phone: "", service: "", message: "", website: "" },
  });

  const serviceValue = watch("service");

   const onSubmit = async (values: Enquiry) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        // Shows Resend's exact reason in the browser console (development only)
        if (process.env.NODE_ENV === "development") {
          console.error("Enquiry failed:", data.detail ?? data.error ?? res.status);
        }
        throw new Error();
      }

      reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };
  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <SuccessPanel key="success" onReset={() => setStatus("idle")} />
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          variants={stagger(0.08, 0.4)}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
          className="flex flex-col gap-7"
        >
          <Field id="name" label="Full Name" error={errors.name?.message}>
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Enter your full name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`${fieldClass} h-[63px]`}
              {...register("name")}
            />
          </Field>

          <Field id="email" label="Email Address" error={errors.email?.message}>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your email address"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`${fieldClass} h-[63px]`}
              {...register("email")}
            />
          </Field>

          <Field id="phone" label="Phone Number" error={errors.phone?.message}>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Enter your phone number"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={`${fieldClass} h-[63px]`}
              {...register("phone")}
            />
          </Field>

          <Field id="service" label="Service Interested In" error={errors.service?.message}>
            <div className="relative">
              <select
                id="service"
                aria-invalid={!!errors.service}
                aria-describedby={errors.service ? "service-error" : undefined}
                className={`${fieldClass} h-[63px] cursor-pointer appearance-none pr-14 [&>option]:bg-[#0b221a] [&>option]:text-primary ${
                  serviceValue ? "" : "text-primary/45"
                }`}
                {...register("service")}
              >
                <option value="" disabled hidden>
                  Pick a service
                </option>
                {serviceOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-6 top-1/2 size-5 -translate-y-1/2 text-brand-light" />
            </div>
          </Field>

          <Field id="message" label="Message" error={errors.message?.message}>
            <textarea
              id="message"
              rows={5}
              placeholder="Write something"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`${fieldClass} h-[157px] resize-none py-5`}
              {...register("message")}
            />
          </Field>

          {/* Honeypot: hidden from people, visible to bots */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] size-px opacity-0"
            {...register("website")}
          />

          <motion.div variants={fadeUp} className="mt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary h-[42px] w-full px-6 disabled:cursor-wait disabled:opacity-80"
            >
              {isSubmitting ? (
                <>
                  <Spinner className="size-4" />
                  Sending…
                </>
              ) : (
                "Submit Enquiry"
              )}
            </button>

            <AnimatePresence>
              {status === "error" && (
                <motion.p
                  role="alert"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 text-center text-sm text-red-400"
                >
                  Something went wrong. Please try again, or reach us on WhatsApp.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

/* ───────────── Pieces ───────────── */

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={fadeUp}>
      <label htmlFor={id} className="text-lg font-medium text-primary">
        {label}
      </label>
      <div className="mt-3">{children}</div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: ease.out }}
            className="mt-2 text-sm text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SuccessPanel({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: ease.out }}
      role="status"
      className="flex min-h-[560px] flex-col items-center justify-center rounded-[24px] border border-white/[0.06] bg-[linear-gradient(180deg,rgb(20_48_37/0.7),rgb(10_28_22/0.7))] p-10 text-center backdrop-blur-sm"
    >
      <div className="flex size-20 items-center justify-center rounded-full bg-brand/50 shadow-[0_0_50px_-6px_rgb(35_226_155/0.6)]">
        <svg viewBox="0 0 24 24" fill="none" className="size-10 text-brand-glow" aria-hidden="true">
          <motion.path
            d="M5 12.5 10 17.5 19 7.5"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: ease.out }}
          />
        </svg>
      </div>
      <h2 className="mt-8 font-display text-[28px] font-medium text-primary">Thank you</h2>
      <p className="mt-4 max-w-[340px] text-[15px] leading-snug text-primary/85">
        Your enquiry has been received. One of our advisors will contact you shortly to schedule your
        consultation.
      </p>
      <button type="button" onClick={onReset} className="btn-outline mt-8 px-6 py-3">
        Send another enquiry
      </button>
    </motion.div>
  );
}