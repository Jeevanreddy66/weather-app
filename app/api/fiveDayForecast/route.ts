import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

    const searchParams = req.nextUrl.searchParams;

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    const resp = await fetch(url, { next: { revalidate: 3600 } });

    const dailyData = await resp.json();

    return NextResponse.json(dailyData);
  } catch (error: any) {
    console.log("Error in getting 5 day Forecast Data ", error.message);

    return new Response("Error fetching 5 day forecast data ", { status: 500 });
  }
}
