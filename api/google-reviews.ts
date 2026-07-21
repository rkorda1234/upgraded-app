export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { placeId } = req.query;

  if (!placeId || typeof placeId !== "string") {
    return res.status(400).json({ error: "placeId query parameter is required." });
  }

  const mapsApiKey = process.env.GOOGLE_MAPS_PLATFORM_KEY || process.env.GOOGLE_MAPS_API_KEY;

  if (!mapsApiKey) {
    return res.status(400).json({ 
      error: "Google Maps API Key is not configured in Vercel environment variables. Please define GOOGLE_MAPS_PLATFORM_KEY." 
    });
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}?key=${mapsApiKey}`,
      {
        headers: {
          "X-Goog-FieldMask": "reviews,rating,userRatingCount,displayName,formattedAddress",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ 
        error: `Google Places API error: ${response.statusText}`, 
        details: errText 
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: any) {
    console.error("Error fetching Google Reviews:", error);
    return res.status(500).json({ error: error.message || "An error occurred while fetching reviews from Google." });
  }
}
