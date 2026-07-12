"use client";

import { useActionState } from "react";
import { signup } from "@/actions/signup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const initialState = { success: false, error: undefined };

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(signup, initialState);

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="flex flex-col gap-3">
            <Input name="name" placeholder="Full name" required />
            <Input name="email" type="email" placeholder="Email" required />
            <Input name="password" type="password" placeholder="Password" required />
            {state.error && (
              <p className="text-sm text-destructive">{state.error}</p>
            )}
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating account..." : "Sign up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}