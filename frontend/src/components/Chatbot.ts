import { API_URL } from '../config';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export class Chatbot {
  private messages: Message[] = [];
  private container: HTMLDivElement;
  private messagesContainer: HTMLDivElement;
  private inputBox: HTMLInputElement;
  private sendButton: HTMLButtonElement;

  constructor() {
    this.container = document.createElement('div');
    this.messagesContainer = document.createElement('div');
    this.inputBox = document.createElement('input');
    this.sendButton = document.createElement('button');
  }

  render(): HTMLDivElement {
    this.container.className = 'min-h-screen bg-black flex flex-col items-center justify-center p-4';
    
    // Título
    const title = document.createElement('h1');
    title.className = 'text-white text-4xl font-bold mb-2 text-center';
    title.textContent = 'AI Chatbot';
    
    // Instrucción
    const instruction = document.createElement('p');
    instruction.className = 'text-gray-400 text-sm mb-8 text-center';
    instruction.textContent = 'Escribe un mensaje para comenzar la conversación';
    
    // Contenedor de mensajes
    this.messagesContainer.className = 'w-full max-w-2xl h-96 bg-gray-900 rounded-lg p-4 mb-4 overflow-y-auto border border-gray-800';
    
    // Contenedor de input
    const inputContainer = document.createElement('div');
    inputContainer.className = 'w-full max-w-2xl flex gap-2';
    
    // Input box
    this.inputBox.type = 'text';
    this.inputBox.placeholder = 'Escribe tu mensaje...';
    this.inputBox.className = 'flex-1 bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-600 placeholder-gray-500';
    
    // Botón de enviar
    this.sendButton.className = 'bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg border border-gray-700 transition-colors flex items-center justify-center';
    this.sendButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    `;
    
    // Event listeners
    this.sendButton.addEventListener('click', () => this.handleSend());
    this.inputBox.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.handleSend();
      }
    });
    
    // Branding
    const branding = document.createElement('button');
    branding.className = 'text-gray-400 text-base mt-8 px-6 py-3 rounded-full border border-gray-700 bg-gray-900 hover:bg-gray-800 hover:border-gray-600 transition-colors';
    branding.textContent = 'unnic.';
    branding.addEventListener('click', () => {
      window.open('https://unnic.ai', '_blank');
    });
    // Ensamblar
    inputContainer.appendChild(this.inputBox);
    inputContainer.appendChild(this.sendButton);
    
    this.container.appendChild(title);
    this.container.appendChild(instruction);
    this.container.appendChild(this.messagesContainer);
    this.container.appendChild(inputContainer);
    this.container.appendChild(branding);
    
    // Renderizar estado inicial
    this.renderMessages();
    
    return this.container;
  }

  private async handleSend(): Promise<void> {
    const text = this.inputBox.value.trim();
    if (!text) return;
    
    // Agregar mensaje del usuario
    this.addMessage(text, true);
    
    // Limpiar input
    this.inputBox.value = '';
    
    // Deshabilitar input mientras se procesa
    this.inputBox.disabled = true;
    this.sendButton.disabled = true;
    
    try {
      // Llamar al backend
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });
      
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      
      const data = await response.json();
      this.addMessage(data.response, false);
    } catch (error) {
      this.addMessage('Error al conectar con el servidor. Por favor, intenta de nuevo.', false);
    } finally {
      // Rehabilitar input
      this.inputBox.disabled = false;
      this.sendButton.disabled = false;
      this.inputBox.focus();
    }
  }

  private addMessage(text: string, isUser: boolean): void {
    const message: Message = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      text,
      isUser,
      timestamp: new Date()
    };
    
    this.messages.push(message);
    this.renderMessages();
  }

  private renderMessages(): void {
    this.messagesContainer.innerHTML = '';
    
    if (this.messages.length === 0) {
      const emptyState = document.createElement('p');
      emptyState.className = 'text-gray-500 text-center mt-20';
      emptyState.textContent = 'No hay mensajes aún. Comienza la conversación...';
      this.messagesContainer.appendChild(emptyState);
      return;
    }
    
    this.messages.forEach((message) => {
      const messageDiv = document.createElement('div');
      messageDiv.className = `mb-4 ${message.isUser ? 'flex justify-end' : 'flex justify-start'}`;
      
      const bubble = document.createElement('div');
      bubble.className = `max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        message.isUser 
          ? 'bg-gray-700 text-white' 
          : 'bg-gray-800 text-gray-100 border border-gray-700'
      }`;
      bubble.textContent = message.text;
      
      messageDiv.appendChild(bubble);
      this.messagesContainer.appendChild(messageDiv);
    });
    
    // Scroll al final
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
}

