const express = require('express');
const dotenv  = require('dotenv');

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.static('build'));
app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/build/index.html`);
})

app.listen(process.env.PORT || PORT, ()=>console.log('times gone'));
