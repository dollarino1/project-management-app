"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { login } from "@/lib/api/auth";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { getMyOrganizations } from "@/lib/api/organizations";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const store = useAuthStore();
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const data = await login(email, password);
      store.setToken(data.accessToken);

      const organizations = await getMyOrganizations(data.accessToken);
      const firstOrg = organizations[0];
      if (!firstOrg) {
        setErrorMsg("No organizations found");
        return;
      }
      router.push(`/${firstOrg.slug}/projects`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {errorMsg && <div>{errorMsg}</div>}
      <form onSubmit={onSubmit}>
        <Label>Email</Label>
        <Input type="email" onChange={(e) => setEmail(e.target.value)} />

        <Label>Password</Label>
        <Input type="password" onChange={(e) => setPassword(e.target.value)} />

        <Button disabled={loading}>Submit</Button>
      </form>

      <Link href="/register">Don't have an account? Register</Link>
    </div>
  );
}
