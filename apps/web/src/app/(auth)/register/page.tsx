"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api/auth";

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const store = useAuthStore();
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const data = await register(email, name, password);
      store.setToken(data.accessToken);

      router.push(`/onboarding`);
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

        <Label>Name</Label>
        <Input type="text" onChange={(e) => setName(e.target.value)} />

        <Label>Password</Label>
        <Input type="password" onChange={(e) => setPassword(e.target.value)} />

        <Button disabled={loading}>Submit</Button>
      </form>

      <Link href="/login">Already have an account?, login</Link>
    </div>
  );
}
