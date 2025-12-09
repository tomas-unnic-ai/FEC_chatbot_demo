import { chatService } from '../services/chat.service.js';

export const chatController = {
  async init(req, res) {
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
  },
  async sendMessage(req, res) {
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
};

