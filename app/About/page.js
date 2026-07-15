import React from "react";

const Page = () => {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl bg-surface rounded-2xl p-10 text-text border border-accent/20">
        <h1 className="text-3xl font-bold mb-6 text-center text-accentSoft">
          About Code Compass
        </h1>

        <p className="mb-6 leading-relaxed">
          Starting a new project often means the same frustrating first step:
          staring at a blank screen, unsure which frontend, backend, or
          database to pick. Should you use Next.js or plain React? SQL or
          NoSQL? Where should you even deploy it? For beginners, this decision
          alone can eat up hours  or lead to picking a stack that doesn&apos;t
          fit the project at all.
        </p>

        <p className="mb-8 leading-relaxed">
          Code Compass removes that friction. Just describe your project idea
          in a few words, and get an instant, clear recommendation covering
          everything you need to get started  frontend, backend, database,
          relevant AI tools, and deployment  along with a short explanation
          of why that combination works well together.
        </p>

        <h2 className="text-xl font-semibold mb-4 text-accentSoft">
          Who it&apos;s for
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-8 text-muted">
          <li>
            Students working on assignments or final year projects who need a
            solid starting point fast
          </li>
          <li>
            Beginners who don&apos;t yet have the experience to confidently
            choose between competing technologies
          </li>
          <li>
            Developers exploring a new project idea and want a quick sanity
            check before diving in
          </li>
          <li>
            Hackathon teams who need to move fast and can&apos;t afford to
            waste time debating stack choices
          </li>
        </ul>

        <h2 className="text-xl font-semibold mb-4 text-accentSoft">
          Why it matters
        </h2>
        <p className="leading-relaxed mb-10">
          The goal isn&apos;t just to give you an answer it&apos;s to help
          you understand why that stack fits, so you walk away with a
          recommendation you can trust and build on immediately. No more
          decision paralysis. No more piecing together advice from a dozen
          different blog posts. Just a clear starting point, in seconds.
        </p>

        <div className="border-t border-accent/20 pt-6 text-center">
          <p className="text-muted text-sm">
            Made with <span className="text-accent">♥</span> by{" "}
            <span className="text-accentSoft font-semibold">
              Momina Aamir Ali
            </span>{" "}
            and{" "}
            <span className="text-accentSoft font-semibold">
              Syed Muhammad Awais Hashmi
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;