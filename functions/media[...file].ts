export const onRequestGet: PagesFunction = async (context) => {
  const filename = context.params.file?.join("/") || "";
  const r2URL = `https://pub-e0b8491e9e494c4fb47602b32e794bde.r2.dev/${filename}`; // Replace with your R2 URL

  const response = await fetch(r2URL);
  return new Response(response.body, {
    headers: {
      "Content-Type": response.headers.get("Content-Type") || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000", // 1 year cache
    },
    status: response.status,
  });
};
