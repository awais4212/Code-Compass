import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getGroqRecommendation(project) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content:
          "You are a senior software architect. Given a project idea, recommend the best technology stack. Always respond in this exact format:\n\nFrontend: ...\nBackend: ...\nDatabase: ...\nAI Tools: ...\nDeployment: ...\n\nReason: ...",
      },
      {
        role: "user",
        content: `Recommend the best technology stack for this project: ${project}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 500,
  });

  return completion.choices[0]?.message?.content?.trim();
}

async function getSupabaseFallback(query) {
  const { data: typeMatch } = await supabase
    .from("tech_stacks")
    .select("*")
    .ilike("project_type", `%${query}%`)
    .limit(1);

  let match = typeMatch?.[0];

  if (!match) {
    const words = query.split(/\s+/);
    const { data: keywordMatch } = await supabase
      .from("tech_stacks")
      .select("*")
      .overlaps("keywords", words)
      .limit(1);

    match = keywordMatch?.[0];
  }

  if (!match) return null;

  return `
Frontend: ${match.frontend}
Backend: ${match.backend}
Database: ${match.database}
AI Tools: ${match.ai_tools}
Deployment: ${match.deployment}

Reason: ${match.reason}
  `.trim();
}

export async function POST(req) {
  try {
    const { project } = await req.json();

    if (!project || !project.trim()) {
      return NextResponse.json(
        { error: "Please enter a project idea." },
        { status: 400 }
      );
    }

    const query = project.trim().toLowerCase();

    
    try {
      const groqAnswer = await getGroqRecommendation(project);

      if (groqAnswer) {
        return NextResponse.json({ answer: groqAnswer, source: "groq" });
      }
    } catch (groqErr) {
      console.log("GROQ ERROR:", groqErr.message);
    }

  
    try {
      const supabaseAnswer = await getSupabaseFallback(query);

      if (supabaseAnswer) {
        return NextResponse.json({
          answer: supabaseAnswer,
          source: "supabase",
          note: "Live AI generation is temporarily unavailable, so this recommendation is from our curated database.",
        });
      }
    } catch (supabaseErr) {
      console.log("SUPABASE ERROR:", supabaseErr.message);
    }

   
    return NextResponse.json(
      {
        error:
          "We couldn't generate a recommendation right now. Please try again shortly.",
      },
      { status: 503 }
    );
  } catch (error) {
    console.log("ROUTE ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}