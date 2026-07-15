"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [project, setProject] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function getRecommendation() {
    if (!project) return;

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ project }),
      });

      const data = await response.json();

      if (data.error) {
        setAnswer(data.error);
      } else {
        setAnswer(data.answer);
      }
    } catch (error) {
      console.log(error);
      setAnswer("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="hero bg-bg flex flex-col lg:flex-row items-center justify-center min-h-screen gap-8 lg:gap-10 px-4 sm:px-6 py-10 lg:py-0">
        {/* Left Image */}
        <div className="left rounded-2xl overflow-hidden border border-accent/20 w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[500px]">
          <Image
            src="/project11.webp"
            alt="project image"
            width={500}
            height={500}
            className="w-full h-auto"
          />
        </div>

        {/* Right Section */}
        <div className="right bg-surface p-6 sm:p-10 rounded-2xl flex flex-col items-center justify-center w-full max-w-[450px] border border-accent/20">
          <h1 className="text-text text-xl sm:text-2xl font-bold text-center">
            Enter your project idea to get the recommended tech stack
          </h1>

          <input
            className="mt-6 sm:mt-8 w-full rounded-2xl p-3 bg-bg text-text placeholder-muted outline-none border border-accent/30 focus:border-accent transition-colors"
            type="text"
            placeholder="Example: AI healthcare chatbot"
            value={project}
            onChange={(e) => setProject(e.target.value)}
          />

          <button
            onClick={getRecommendation}
            disabled={loading}
            className="mt-5 w-full sm:w-auto bg-accent text-bg font-semibold px-6 py-3 rounded-xl hover:bg-accentSoft transition-colors disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Stack"}
          </button>
        </div>
      </div>

      {answer && (
        <div className="right bg-surface p-6 sm:p-10 rounded-2xl mb-10 flex flex-col mx-auto justify-center w-[90%] sm:w-[450px] border border-accent/20">
          <h1 className="text-text text-xl sm:text-2xl font-bold text-center">
            Response
          </h1>
          <div className="mt-6 sm:mt-8 bg-bg border border-accent/20 p-4 sm:p-5 rounded-xl w-full text-text whitespace-pre-wrap text-sm sm:text-base">
            {answer}
          </div>
        </div>
      )}
    </>
  );
}