let express = require("express");
const translatte = require("translatte");
let cors = require("cors");
let app = express();
app.use(express.json());
app.use(cors());
app.post("/", (req, res) => {
  console.log(req.body.from, req.body.to);
  translatte(req.body.text, {
    from: req.body.from,
    to: req.body.to,
  })
    .then((response) => {
      console.log(response);
      res.json({ translateText: response.text });
    })
    .catch((err) => {
      console.error(err);
    });
});
app.listen(5000, () => {
  console.log("listening on port 5000");
});
