require("dotenv").config();
const openai = require('openai');
const openaikey = process.env.OPENAI;
//const openai = new OpenAI();

//openai.ChatCompletion.create()

function openaiResponse(message) {
    const endpoint = 'https://api.openai.com/v1/chat/completions';
  
    fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaikey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ "role": "user", "content": `${message}`}],
        temperature: 0.7,
      }),
    })
      .then(response =>
        response.json())
      .then(data => {
        
        console.log(data.choices[0].message.content);
        
      })
      .catch(error => {
        // Handle errors here
        console.error('Error:', error);
      });
  }
  
  openaiResponse("is sky blue?")