"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormMessage } from "@/components/ui/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSupabase } from "@/providers/supabase-provider";

import { loginSchema, type LoginFormValues } from "../schemas";

export function LoginForm() {
  const supabase = useSupabase();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const source = searchParams.get("source") || "";
  const loginMessage = searchParams.get("loginMessage");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      username: "",
      password: "",
      remember: true,
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    setError(null);
    const { username, password } = values;

    // Try to login with username as email (Supabase uses email)
    // In production, you might need to query user by username first
    const result = await supabase.auth.signInWithPassword({
      email: username.includes("@") ? username : `${username}@temp.local`, // Temporary workaround
      password,
    });

    if (result.error) {
      setError("Username atau password salah.");
      setLoading(false);
      return;
    }

    // Redirect based on source or default to dashboard
    if (source && source.startsWith("/")) {
      router.push(source);
    } else {
      router.push("/admin/dashboard");
    }
  });

  return (
    <form className="space-y-6" onSubmit={onSubmit} id="login">
      <input type="hidden" name="source" value={source} />

      {loginMessage && (
        <FormMessage tone="muted">{loginMessage}</FormMessage>
      )}

      {error && <FormMessage tone="error">{error}</FormMessage>}

      <fieldset className="space-y-4">
        <legend className="sr-only">Login</legend>
        
        <div className="space-y-1">
          <Label htmlFor="username">
            <span className="label">
              Username
              <span className="text-[#b91c1c]" aria-hidden="true">*</span>
              <span className="sr-only">Required</span>
            </span>
          </Label>
          <Input
            id="username"
            type="text"
            autoComplete="username"
            maxLength={32}
            required
            aria-required="true"
            {...register("username")}
          />
          {errors.username && (
            <FormMessage tone="error">{errors.username.message}</FormMessage>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">
            <span className="label">
              Password
              <span className="text-[#b91c1c]" aria-hidden="true">*</span>
              <span className="sr-only">Required</span>
            </span>
          </Label>
          <div className="space-y-1">
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              maxLength={32}
              required
              aria-required="true"
              {...register("password")}
            />
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-dark)]"
              >
                Lupa kata sandi?
              </Link>
            </div>
          </div>
          {errors.password && (
            <FormMessage tone="error">{errors.password.message}</FormMessage>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="remember" {...register("remember")} />
          <Label
            htmlFor="remember"
            className="mb-0 text-sm font-semibold text-[var(--foreground)]"
          >
            Tetap masuk
          </Label>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Link
            href={`/register${source ? `?source=${encodeURIComponent(source)}` : ""}`}
            className="text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary-dark)]"
          >
            Daftar akun baru
          </Link>
          <Button type="submit" loading={loading}>
            Masuk
          </Button>
        </div>
      </fieldset>
    </form>
  );
}

