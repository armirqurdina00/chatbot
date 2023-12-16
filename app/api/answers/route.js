import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  const url = "https://api-v2.longshot.ai/custom/api/generate/factgpt/custom";
  const token = process.env.API_KEY;
  const req = await request.json();

  const data = {
    instruction: req.question,
    mode: "serp",
    domain_list: [],
    url_list: [],
    file_id: "",
  };

  try {
    const response = await axios.post(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(token);
    return NextResponse.json(response.data.copies[0], { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}