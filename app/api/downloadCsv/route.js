// app/api/downloadCsv/route.js
import { auth } from "@/app/_lib/auth";
import { createClient } from "@supabase/supabase-js";
import Papa from "papaparse";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

export async function GET() {
  const session = await auth();
  if (!session) throw new Error("Non autorizzato");

  const { data, error } = await supabase
    .from("wishlist")
    .select("platforms(platformName), gameName")
    .eq("userEmail", session?.user?.email)
    .order("platforms(platformName)", { ascending: true })
    .order("gameName", { ascending: true });

  const formattedData = data.map((item) => ({
    platformName: item.platforms.platformName,
    gameName: item.gameName,
  }));

  if (error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  if (!data || data.length === 0)
    return new Response("Nessun dato disponibile", { status: 404 });

  const csv = Papa.unparse(formattedData);
  return new Response(csv, {
    status: 200,
    headers: {
      "Content-Disposition": "attachment; filename=wishlist.csv",
      "Content-Type": "text/csv",
    },
  });
}
