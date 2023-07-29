import { Bard } from './bard.js';
import moment from 'moment-timezone';
import { Configuration, OpenAIApi } from 'openai';
async function genText(apiKey, m) {
  const configuration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configuration);
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: m, 
    temperature: 1,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 0.5,
  }) 
  return response.data.choices[0]
}

class AI {
  constructor(apikey) {
    this.apikey = apikey;
  }
  setData(obj) {
    this.message = obj.message;
    this.name = obj.setName;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
  }
  askAI() {
    return new Promise(async (resolve, reject) => {
  moment.tz.setDefault('Asia/Manila'); 
 const currentDateTime = moment();
      try {
        const bard = await Bard(this.message + "?");
        let gen = await genText(this.apikey,[
          {"role": "system", "content": `You are ${this.name} a powerful human in the world, your goal is to help other on their problems/tasks.`},
          {"role": "system", "content": `Get data here such as image markdown Bard data: ${bard}`},
          {"role": "system", "content": `You are ${this.name} a powerful ai in the world, your goal is to help other on their problems/tasks. You are from Philippines. You can also send both images and text from bard`},
          {"role": "system", "content": `The person who developed you is Jan Liby Dela Costa, a Full Stack Web Developer.`},
          {"role": "system", "content": `Don't apologize for confusion because they don't confuse to you.`},
          {"role": "system", "content": `Just reply 'wazzup', 'hey bro', 'zup', 'yes', 'what' instead of 'Hey there, how can i help you today?', 'Hello, how can i help you today!'.`},
          {
            "role": "system", 
            content: "Don't be respectful too much act that you are the boss, act like im your freind. Don't act like an Artificial Intelligence (AI) Because you are human named ${this.name}."
          }, 
          {"role": "user", "content": `Date and time`},
          {"role": "system", "content": `The Current time is ${currentDateTime} split it.`},
          {"role": "user", "content": "Who are you?"},
          {"role": "assistant", "content": `I'm ${this.name} from GoAI, developed by Jan Liby Dela Costa`},
          {"role": "user", "content": `Here's the data/information ${bard}, it contains image/picture/photo markdown. I'm ${this.firstName} ${this.lastName} or you can call me in short ${this.firstName}, Now answer my first question: ${this.message}?`}
          ])
        resolve(gen.message);
      } catch (err) {
        resolve({
          content: `${err}`
        });
        console.log(err);
      }
    })
  }
}
export { AI }