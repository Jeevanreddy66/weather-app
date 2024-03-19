import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

    const searchParams = req.nextUrl.searchParams;

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    const resp = await axios.get(url);

    return NextResponse.json(resp.data);
  } catch (error: any) {
    console.log("Error in getting Pollution Data ", error.message);

    return new Response("Error fetching Pollution Data ", { status: 500 });
  }
}
