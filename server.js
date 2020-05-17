const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let Web3 = require('web3');
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/fresh_pork");
const db = mongoose.connection;

const userSchema = new mongoose.Schema({
  id: String,
  pw: String,
  role: String,
  status: String
});

const users = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.render("Login");
});

app.get("/registerUser", (req, res) => {
  res.render("registerUser");
});

app.post("/", (req, res) => {
  let info = {
    id: req.body.id,
    pw: req.body.pw
  };

  let inputValue = req.body.button;
  if (inputValue === "Login") {
    if (!info.id || !info.pw) {
      res.send('<script type="text/javascript">alert("Please type both ID and password"); window.location=history.back(); </script>');
      return;
    }

    users.find({ id: info.id, pw: info.pw }, (err, item) => {
      let data = JSON.stringify(item);

      if (data === "[]") {
        res.send('<script type="text/javascript">alert("Username or password is not correct"); window.location=history.back(); </script>');
        return;
      }
      else {
        res.send('<script type="text/javascript">alert("Login Confirm"); window.location=history.back(); </script>');
        return;
      }
    });
  }
  if (inputValue === "Register") {
    res.redirect("/registerUser");
  }
});

app.post("/registerUser", (req, res) => {
  let inputValue = req.body.button;

  if (inputValue === "Confirm") {
    let registerForm = new users();
    registerForm.id = req.body.id;
    registerForm.pw = req.body.pw;

    if (registerForm.username === "" || registerForm.password === "") {
      res.send('<script type="text/javascript">alert("Form error, missing input"); window.location=history.back(); </script>');
      return;
    }

    users.exists({ id: registerForm.id }, (err, item) => {
      if (!item) {
        registerForm.save((err_save) => {
          if (err_save) {
            console.error(err2);
            res.send('<script type="text/javascript">alert("Form error"); window.location=history.back(); </script>');
          }

          res.send('<script type="text/javascript">alert("Form is registered"); window.location="/"; </script>');
        });
      }
      else {
        res.send('<script type="text/javascript">alert("Username already exists"); window.location=history.back(); </script>');
      }
    });
  }
  if (inputValue === "Cancel") {
    res.redirect("/");
  }
});

app.listen(PORT, () => {
  console.log("Server has started on port " + PORT);
});
