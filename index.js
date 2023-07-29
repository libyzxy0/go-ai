import express from 'express';
import { AI } from './src/go-ai.js';
import { bardAI } from './src/bard.js';
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

//Initialize bard login
const bard = new bardAI(JSON.parse(process.env.BARD_COOKIE));
bard.login()


app.get('/', (req, res) => {
  res.json({ message: "Post request" })
})

app.post('/', async (req, res) => {
  try {
  let { message, firstName, lastName, setName } = req.body;
  if(!message) return res.status(500).send({ message: "Missing paraneter 'message'"});
  if(!firstName) return res.status(500).send({ message: "Missing paraneter 'firstName'"});
    if(!lastName) return res.status(500).send({ message: "Missing paraneter 'lastName'"});
    if(!setName) return res.status(500).send({ message: "Missing paraneter 'setName'"});
  let auth = req.headers.authorization;
  if(!auth) return res.status(401).json({ message: "Not authenticated" });
  let apikey = auth.split(" ")[1];
  if(!apikey) return res.status(401).json({ message: "Not authenticated" });
  console.log(req.body, apikey);
  let ai = new AI(apikey);
  ai.setData({ firstName, lastName, setName, message })
  let ans = await ai.askAI(message);
  res.send(ans);
  console.log(ans);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error while getting your request" })
  }
})
app.listen(port, () => console.log(`App is listening on port ${port}`))