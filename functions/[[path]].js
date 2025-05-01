export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const filePath = url.pathname.slice(1); // removes leading '/'

  const r2PublicUrl = "https://pub-e0b8491e9e494c4fb47602b32e794bde.r2.dev"; // Replace with your R2 URL
  const r2FileUrl = `${r2PublicUrl}/${filePath}`;

  const response = await fetch(r2FileUrl);

  if (!response.ok) {
    return new Response("File not found", { status: 404 });
  }

  return new Response(response.body, {
    status: response.status,
    headers: {
      ...Object.fromEntries(response.headers),
      "Cache-Control": "public, max-age=31536000"
    }
  });
}
