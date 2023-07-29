# GoAI
**ChatGPT + Bard Artificial Intelligence Combination.**

## How to use?
```sh
npm i axios
```

```javascript
(async function () {
const headers = {
   'Authorization': 'Bearer <OPEN_AI_KEY>',
   'Content-Type': 'application/json'
};

const body = {
    message: msg,
    firstName: userInfo.firstName,
    lastName: userInfo.name,
    setName: "YOUR-BOT-NAME",
};
let res = await axios.post('https://go-ai.libyzxy0.repl.co/', body, { headers });
let response = res.data.content;
 console.log(response);
})();
```
