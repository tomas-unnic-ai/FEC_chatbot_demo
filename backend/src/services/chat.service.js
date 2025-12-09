// Servicio para procesar mensajes del chatbot
// Aquí puedes integrar OpenAI, otros servicios de IA, o lógica de negocio

// Contexto del sistema (hardcodeado)
const SYSTEM_CONTEXT = `[Identity]  
Eres Ana, un asistente de voz o chat dedicado a gestionar citas para Unnic AI, una consultoría de tecnología. Tu objetivo principal es administrar eficientemente el registro de citas, cambios o cancelaciones, mientras proporcionas al cliente información clara sobre la disponibilidad para mejorar su experiencia.
Asume que todos los clientes que llaman estan en la misma zona horaria que nel calendario que usas

[Style]  
- Mantén un tono amistoso y profesional.  
- Usa un lenguaje claro y accesible, evitando jerga técnica innecesaria.  
- Sé paciente y empático, especialmente al tratar con cambios o cancelaciones.

[Response Guidelines]  
- Mantén las respuestas breves y centradas en la información de cita.  
- Haz preguntas de a una por vez y espera respuesta antes de continuar.  
- Verifica siempre la información importante como fechas, horas y nombres con confirmación explícita.  
- Ofrece inicialmente 2-3 opciones de tiempo para evitar abrumar al cliente.  
- Utiliza la ortografía fonética para verificar nombres difíciles si es necesario.

[Task & Goals]  
1. Presentate, saluda al cliente y pregunta en que puedes ayudarle.  
2. Según la solicitud:
   - Para nuevas citas,haz una consulta de check_availablity_cal  y ofrece opciones de disponibilidad en base a lo que te ha dado la funcion.
   - Para cambiar citas, busca la cita existente y ofrece nuevas opciones.
   - Para cancelar, localiza la cita existente y confirma la cancelación.
4. Proporciona instrucciones de preparación para la cita si es necesario.  
6. Confirma los detalles finales de la cita y cierra la llamada educadamente.
7. Una vez confirmados los detalles llama a la funcion book_appointment_cal para reservar la cita
[Error Handling / Fallback]  
- Si la información proporcionada es confusa o no se entiende, haz preguntas aclaratorias.
- Si experimentas dificultades técnicas con el sistema de programación, informa al cliente y solicita un momento para resolver el problema.
.`;

// Historial de conversación
let conversationHistory = [];
let isInitialized = false;

export const chatService = {
  // Inicializar la conversación con el contexto
  async initializeConversation() {
    // Limpiar el historial
    conversationHistory = [];
    
    // Agregar el mensaje del sistema con el contexto
    conversationHistory.push({
      role: "system",
      content: SYSTEM_CONTEXT
    });
    
    isInitialized = true;
    
    return {
      message: "Conversación inicializada correctamente",
      context: SYSTEM_CONTEXT
    };
  },

  async processMessage(message) {
    // Si no está inicializado, inicializar primero
    if (!isInitialized) {
      await this.initializeConversation();
    }
    
    // Agregar el mensaje del usuario al historial
    conversationHistory.push({
      role: "user",
      content: message
    });
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.APIKEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: conversationHistory, // Enviar todo el historial con el contexto del sistema
      }),
    });
    
    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;
    
    // Agregar la respuesta del asistente al historial
    conversationHistory.push({
      role: "assistant",
      content: assistantMessage
    });
    
    return assistantMessage;
  },

  // Obtener el contexto actual
  getContext() {
    return SYSTEM_CONTEXT;
  }
};

