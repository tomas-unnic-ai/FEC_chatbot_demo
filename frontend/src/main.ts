import './style.css';
import { Chatbot } from './components/Chatbot';

const app = document.querySelector<HTMLDivElement>('#app')!;

const chatbot = new Chatbot();
app.appendChild(chatbot.render());

async function init() 
{
    try {
      const response = await fetch('http://localhost:3001/api/init');
      const data = await response.json();
      console.log('Backend conectado:', data);
      
      // O cualquier otra llamada inicial que necesites
      // Por ejemplo, cargar historial de conversación:
      // const historyResponse = await fetch('http://localhost:3001/api/chat/history');
      // const history = await historyResponse.json();
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}