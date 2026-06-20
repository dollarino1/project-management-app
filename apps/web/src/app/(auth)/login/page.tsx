"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthPage() {
    return (
        <div>
            <form>
                <Label>Email</Label>
                <Input type="email" />

                <Label>Password</Label>
                <Input type="password" />

                <Button>Submit</Button>
            </form>

            <Link href="/register">Don't have an account? Register</Link>
        </div>
    );
}