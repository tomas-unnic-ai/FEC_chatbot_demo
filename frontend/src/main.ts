import './style.css';
import { Chatbot } from './components/Chatbot';
import { API_URL } from './config';

const app = document.querySelector<HTMLDivElement>('#app')!;

const chatbot = new Chatbot();
app.appendChild(chatbot.render());

async function init() 
{
    try {
      await fetch(`${API_URL}/api/chat/init`);
    } catch (error) {
        // Error silencioso
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}