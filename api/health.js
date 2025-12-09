export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  res.json({ status: 'ok', message: 'Backend is running' });
}

