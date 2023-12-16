require("dotenv").config();
const openai = require("openai");
const fetch = require("node-fetch");
const openaikey = process.env.OPENAI;
//const openai = new OpenAI();
//openai.ChatCompletion.create()

function openaiResponse(message) {
  const endpoint = "https://api.openai.com/v1/chat/completions";

  return fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaikey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a coding tutor. If asked for code reading problems, give the the user difficult javascript code read problems, with a variety of array and string methods. The functions should have letters for names. Don't make it clear if the input is an array or string etc. just use letters as arguments. Do not give the output. "
        },
        { role: "user", content: `${message}` }
      ],
      temperature: 0.7,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `OpenAI API request failed with status ${response.status}`
        );
      }
      return response.json();
    })
    .then((data) => {
      if (
        data.choices &&
        data.choices.length > 0 &&
        data.choices[0].message &&
        data.choices[0].message.content
      ) {
        return data.choices[0].message.content;
      } else {
        throw new Error("Unexpected response format from OpenAI API");
      }
    })
    .catch((error) => {
      console.error("Error in openaiResponse:", error);
      throw error;
    });
}

module.exports = { openaiResponse };
