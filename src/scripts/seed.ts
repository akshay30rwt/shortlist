import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/user.model";
import { Organization } from "@/models/organization.model";
import { Membership } from "@/models/membership.model";
import { Job } from "@/models/job.model";
import { Candidate } from "@/models/candidate.model";
import { Application } from "@/models/application.model";

async function seed() {
  await connectToDatabase();

  const user = await User.create({
    name: "Akshay Rawat",
    email: "akshay@example.com",
    hashedPassword: null,
    emailVerified: true,
  });

  const organization = await Organization.create({
    name: "Acme Hiring Co",
    slug: "acme-hiring-co",
  });

  await Membership.create({
    userId: user._id,
    organizationId: organization._id,
    role: "admin",
    status: "active",
  });

  const job = await Job.create({
    organizationId: organization._id,
    title: "Senior Backend Engineer",
    slug: "senior-backend-engineer",
    description: "We are looking for an experienced backend engineer.",
    status: "published",
  });

  const candidate = await Candidate.create({
    name: "Jordan Smith",
    email: "jordan@example.com",
    resumeUrl: null,
  });

  const application = await Application.create({
    organizationId: organization._id,
    jobId: job._id,
    candidateId: candidate._id,
    stage: "applied",
  });

  console.log("Seed complete:");
  console.log({ user: user._id, organization: organization._id, job: job._id, candidate: candidate._id, application: application._id });

  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});