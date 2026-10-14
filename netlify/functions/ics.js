// קובץ יומן (ICS) חי של התורים. Google Calendar נכנס לכאן כ"יומן מכתובת (URL)" ומתעדכן לבד.
// שימוש: https://mor-sasson.com/cal.ics?t=<המפתח הסודי>
const SUPABASE_URL = "https://zwexfherrsukujuaarmv.supabase.co";
const ANON_KEY = "sb_publishable_fXEiQOQKi3P0x-0i9Eo1Cw_DofJpVwO";

exports.handler = async (event) => {
  const t = ((event.queryStringParameters || {}).t || "").trim();
  if (!t || t.length < 16) return { statusCode: 404, body: "Not found" };
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/pub_calendar_ics`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: ANON_KEY, Authorization: "Bearer " + ANON_KEY },
      body: JSON.stringify({ p_token: t }),
    });
    const body = await r.json();
    if (!body || typeof body !== "string") return { statusCode: 404, body: "Not found" };
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Cache-Control": "no-cache, max-age=0",
        "X-Robots-Tag": "noindex, nofollow",
      },
      body,
    };
  } catch (e) {
    return { statusCode: 500, body: "Error" };
  }
};
