"use client";

import { Input } from "@/components/ui/input";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { createOrganization } from "@/lib/api/organizations";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const [name, setName] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const authStore = useAuthStore();
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();

      if (!authStore.token) {
        setErrorMsg("User is not authorized.");
        return;
      }

      const organization = await createOrganization(
        name,
        slug,
        authStore.token,
      );

      if (!organization) {
        setErrorMsg("Something went wrong.");
        return;
      }

      router.push(`/${organization.slug}/projects`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      setErrorMsg(message);
    }
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
  };

  return (
    <div>
      <div>Onboarding page</div>
      <div>{errorMsg}</div>
      <form onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="Organization name"
          required
          onChange={onNameChange}
        />
        <Input
          type="text"
          placeholder="Organization slug"
          required
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />

        <Button type="submit">Create organization</Button>
      </form>
    </div>
  );
}
