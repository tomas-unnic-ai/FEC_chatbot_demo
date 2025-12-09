import { chatService } from '../services/chat.service.js';

export default async function handler(req, res) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ 
        error: 'El mensaje es requerido y debe ser un texto válido' 
      });
    }
    
    const response = await chatService.processMessage(message);
    
    res.json({
      response: response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error interno del servidor',
      message: error.message 
    });
  }
}

