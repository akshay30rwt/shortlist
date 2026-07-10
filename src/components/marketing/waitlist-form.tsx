"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    setLoading(true);
  }

  return (
    <Card className="mt-8 w-full max-w-sm">
      <CardContent className="flex gap-2">
        <Input
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button onClick={handleSubmit} disabled={loading || email === ""}>
          {loading ? "..." : "Join"}
        </Button>
      </CardContent>
    </Card>
  );
}