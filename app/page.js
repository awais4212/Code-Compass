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
        body: JSON.stringify({
          project,
        }),
      });


      const data = await response.json();

      setAnswer(data.answer);

    } catch (error) {

      console.log(error);
      setAnswer("Something went wrong.");

    } finally {

      setLoading(false);

    }
  }


  return (
    <div className="hero bg-purple-800 flex items-center justify-center min-h-screen gap-10">


      {/* Left Image */}
      <div className="left rounded-2xl overflow-hidden">
        <Image
          src="/images.jpg"
          alt="project"
          width={500}
          height={500}
        />
      </div>


      {/* Right Section */}
      <div className="right bg-purple-500 p-10 rounded-2xl flex flex-col items-center justify-center w-[450px]">

        <h1 className="text-white text-2xl font-bold text-center">
          Enter your project idea to get the recommended tech stack
        </h1>


        <input
          className="mt-8 w-full rounded-2xl p-3 text-black outline-none"
          type="text"
          placeholder="Example: AI healthcare chatbot"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />


        <button
          onClick={getRecommendation}
          className="mt-5 bg-purple-900 text-white px-6 py-3 rounded-xl hover:bg-purple-950"
        >
          {loading ? "Generating..." : "Generate Stack"}
        </button>


        {/* AI Response */}
        {answer && (
          <div className="mt-8 bg-white p-5 rounded-xl w-full text-black whitespace-pre-wrap">
            {answer}
          </div>
        )}


      </div>


    </div>
  );
}