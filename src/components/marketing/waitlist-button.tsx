"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function WaitlistButton() {
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
  }

  return (
    <Button onClick={handleClick} disabled={loading} size="lg" className="mt-6">
      {loading ? "Loading..." : "Get Started"}
    </Button>
  );
}