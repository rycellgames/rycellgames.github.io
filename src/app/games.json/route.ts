// app/games.json/route.ts

import { NextResponse } from "next/server";
import { getGamesList } from "@/lib/games/logic/list";

export const dynamic = "force-static";

export async function GET() {
  const games = await getGamesList();

  return NextResponse.json(games);
}