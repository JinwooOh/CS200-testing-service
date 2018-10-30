const express = require("express");
const bodyParser = require('body-parser');
const app = express()

app.use(express.json()); // application / json
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/test', (req, res) => {
  res.json({data: 'Hello World from server'});
});

app.post('/api/pullquestion', (req, res) => {
  console.log(req.body);
});

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Server is running on port ${port}`));