"use client";

import { useState } from "react";

export function WaitlistButton() {
  const [loading, setLoading] = useState(false);

  function handleClick() {
    setLoading(true);
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="mt-6 rounded-md bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 disabled:opacity-50"
    >
      {loading ? "Loading..." : "Get Started"}
    </button>
  );
}