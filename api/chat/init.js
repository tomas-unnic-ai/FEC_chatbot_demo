import { chatService } from '../services/chat.service.js';

export default async function handler(req, res) {
  // Solo permitir GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const result = await chatService.initializeConversation();
    
    res.json({
      success: true,
      message: result.message,
      context: result.context,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al inicializar la conversación',
      message: error.message 
    });
  }
}

