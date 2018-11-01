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
  const dummy = {
    "q1": {
      "answers": [
        3,
        2,
        1
      ],
      "updated": "01/01/2018",
      "question": "1+2?",
      "correctAnswer": "3"
    },
    "q2": {
      "answers": [
        5,
        4,
        3,
        1,
        0
      ],
      "updated": "12/31/2018",
      "question": "0+0?",
      "correctAnswer": "0"
    },
    "q3": {
      "answers": [
        1,
        0
      ],
      "updated": "12/31/2018",
      "question": "0+0?",
      "correctAnswer": "0"
    }
  }
  res.json(dummy);
});

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Server is running on port ${port}`));