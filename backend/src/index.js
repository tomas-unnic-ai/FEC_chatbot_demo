import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
    }),
  });
  
  const data = await response.json();
  console.log(data);
}

main();
