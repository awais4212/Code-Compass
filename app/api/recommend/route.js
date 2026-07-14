import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

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

    // 1. Try fuzzy match on project_type
    const { data: typeMatch, error: typeError } = await supabase
      .from("tech_stacks")
      .select("*")
      .ilike("project_type", `%${query}%`)
      .limit(1);

    let match = typeMatch?.[0];

    // 2. Fallback: match against keywords array
    if (!match) {
      const words = query.split(/\s+/); // split input into words

      const { data: keywordMatch, error: keywordError } = await supabase
        .from("tech_stacks")
        .select("*")
        .overlaps("keywords", words)
        .limit(1);

      match = keywordMatch?.[0];
    }

    if (!match) {
      return NextResponse.json(
        {
          error:
            "No matching stack found yet. Try terms like 'chatbot', 'ecommerce', 'healthcare', 'social media', 'portfolio', 'task manager', or 'LMS'.",
        },
        { status: 404 }
      );
    }

    const answer = `
Frontend: ${match.frontend}
Backend: ${match.backend}
Database: ${match.database}
AI Tools: ${match.ai_tools}
Deployment: ${match.deployment}

Reason: ${match.reason}
    `.trim();

    return NextResponse.json({ answer });
  } catch (error) {
    console.log("SUPABASE ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}