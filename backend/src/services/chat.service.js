// Servicio para procesar mensajes del chatbot
// Aquí puedes integrar OpenAI, otros servicios de IA, o lógica de negocio

export const chatService = {
  async processMessage(message) {
    // Por ahora retornamos una respuesta de ejemplo
    // Aquí puedes integrar tu lógica de OpenAI u otros servicios
    
    // Ejemplo de integración con OpenAI (descomenta y configura):
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.APIKEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "user", content: message }
        ],
      }),
    });
    
    const data = await response.json();
    return data.choices[0].message.content;
    
    // Respuesta temporal
    // return `Respuesta del bot para: "${message}". Aquí puedes integrar tu API de OpenAI.`;
  }
};

