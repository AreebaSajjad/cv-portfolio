export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const apiKey = process.env.GNEWS_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key missing' });

  const query = req.query.q || 'software technology developer';
 const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&sortby=publishedAt&lang=en&max=6&token=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.errors) return res.status(400).json({ error: data.errors[0] });
    return res.status(200).json({
      articles: (data.articles || []).map(a => ({
        title: a.title,
        description: a.description || '',
        url: a.url,
        image: a.image || null,
        publishedAt: a.publishedAt,
        source: { name: a.source?.name || 'Tech News' }
      }))
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}