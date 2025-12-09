import { chatService } from '../services/chat.service.js';

export const chatController = {
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
      console.error('Error en chatController.sendMessage:', error);
      res.status(500).json({ 
        error: 'Error interno del servidor',
        message: error.message 
      });
    }
  }
};

