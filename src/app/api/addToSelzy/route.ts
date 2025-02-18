import { NextResponse } from "next/server";
import axios from "axios";

const SELZY_API_KEY = "6rmyou3m7dd8p5oxg8c7zosoyd1q3n8f6nrkfy5y";
const SELZY_API_URL = "https://api.selzy.com/en/api/subscribe";

export async function POST(req: Request) {
  try {
    const { email, firstName, lastName } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const params = new URLSearchParams();
    params.append("format", "json");
    params.append("api_key", SELZY_API_KEY || "");
    params.append("list_ids", "3");
    params.append("fields[email]", email);
    params.append("fields[Name]", `${firstName} ${lastName}`);

    const response = await axios.post(`${SELZY_API_URL}?${params.toString()}`);

    return NextResponse.json({ message: "User added to Selzy", data: response.data }, { status: 200 });
  } catch (error) {
    console.error("Error adding user to Selzy:", error);
    return NextResponse.json({ error: "Failed to add user to Selzy" }, { status: 500 });
  }
}
