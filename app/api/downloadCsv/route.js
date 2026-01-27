// app/api/downloadCsv/route.js
import { createClient } from "@/app/_lib/supabase/server";
import Papa from "papaparse";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("Utente non autenticato");

  const { data, error } = await supabase
    .from("wishlist")
    .select("platforms(platformName), gameName")
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
  // per far riconoscere l'encoding UTF-8 a Google Sheets;
  const csvWithBom = "\uFEFF" + csv;

  return new Response(csvWithBom, {
    status: 200,
    headers: {
      "Content-Disposition": "attachment; filename=wishlist.csv",
      "Content-Type": "text/csv",
    },
  });
}
