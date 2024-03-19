import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

    const searchParams = req.nextUrl.searchParams;

    const city = searchParams.get("search");

    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`;

    const resp = await axios.get(url);

    return NextResponse.json(resp.data);
  } catch (error: any) {
    console.log("Error in getting geoCoded Data ", error.message);

    return new Response("Error while fetching Geo Coded Data ", {
      status: 500,
    });
  }
}
