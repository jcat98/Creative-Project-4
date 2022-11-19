const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

//rants
const rantSchema = new mongoose.Schema({
  problem: String,
  username: String,
  place: String,
});

rantSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

rantSchema.set('toJSON', {
  virtuals: true
});

const Rant = mongoose.model('Post', rantSchema);

app.get('/api/rants', async (req, res) => {
  try {
    let rants = await Rant.find();
    res.send({
      rants: rants
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/rants', async (req, res) => {
  console.log(req.body.problem);
  console.log(req.body.username);
  console.log(req.body.place);
  const rant = new Rant({
    problem: req.body.problem,
    username: req.body.username,
    place: req.body.place
  });
  try {
    await rant.save();
    res.send({
      rant: rant
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/rants/:id', async (req, res) => {
  try {
    await Rant.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//users
const userSchema = new mongoose.Schema({
  username: String,
  place: String,
});

userSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

userSchema.set('toJSON', {
  virtuals: true
});

const User = mongoose.model('User', userSchema);

app.get('/api/users', async (req, res) => {
  try {
    let users = await User.find();
    res.send({
      users: users
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/users', async (req, res) => {
  const user = new User({
    username: req.body.username,
    place: req.body.place
  });
  try {
    await user.save();
    res.send({
      user: user
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    await User.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3003, () => console.log('Server listening on port 3003!'));