export default async function handler(req, res) {
  try {
    await fetch('https://khfvuodavivuqylcttfz.supabase.co/rest/v1/', {
      headers: {
        'apikey': process.env.SUPABASE_ANON_KEY,
      }
    });
    return res.status(200).json({ message: 'Supabase pinged successfully' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}