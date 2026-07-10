import { Hero } from "@/components/marketing/hero";
import { WaitlistForm } from "@/components/marketing/waitlist-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center">
      <Hero
        headline="Hiring, organized for small teams."
        subtext="Shortlist helps small hiring teams manage job openings, track candidates, and move through the recruitment pipeline, without the spreadsheet chaos."
      />
      <WaitlistForm />
    </main>
  );
}