export async function onRequest({ request }) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/media/', '');

  // Fetch from R2
  const r2Url = `https://pub-e0b8491e9e494c4fb47602b32e794bde.r2.dev/${path}`;

  const res = await fetch(r2Url);
  if (!res.ok) return new Response("Not found", { status: 404 });

  const contentType = res.headers.get("content-type") ?? "application/octet-stream";
  return new Response(res.body, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000", // <-- Add this
    }
  });
}
