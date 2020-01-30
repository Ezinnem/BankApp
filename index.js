/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
const express = require('express');
const Joi = require('joi');
const bodyParser = require('body-parser');
const cons = require('consolidate');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');
const UserAccount = require('./controllers/UserAccount');
const User = require('./controllers/user');
const UserTransaction = require('./controllers/transaction');


// initializing app
const app = express();


// view engine
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// body-parser middleware
app.use(bodyParser.urlencoded({
  extended: false,
}));

// parse application/json
app.use(bodyParser.json());
app.use(express.json());

// set public static files
app.use(express.static(path.join(__dirname, '/public')));

// home route
app.get('/', (req, res) => {
  res.render('userLogin.html');
});
// UserSignUp

app.get('/api/v1/userSignUp', (req, res) => {
  res.render('userSignUp.html');
});

app.post('/api/v1/userSignUp', (req, res) => {
  if (error) {
    res.status(400).send('All fields are required');
  } else {
    res.status(200).send(User.create);
  }
});

// Login
app.get('/api/v1/userLogin', (req, res) => {
  res.render('userLogin.html');
});

// userLogin submit
app.post('/api/v1/userLogin/:id', (req, res) => {
  if (!user) {
    res.status(404).send('User Not Found');
  } else {
    res.status(200).send(User.getOne);
  }
});


// AccountBalance
app.post('/api/v1/userAccountBal/:id', (req, res) => {
  if (!bankaUser) {
    res.status(404).send('Not Found');
  } else {
    res.status(200).send(UserAccount.getOne);
  }
});


app.get('/api/v1/userAccountBal/:id', (req, res) => {
  res.render('userAccountBal');
});

// Accout Transaction
app.get('/api/v1/userAccTransaction', (req, res) => {
  res.render('userAccTransaction');
});

app.post('/api/v1/userAccTransaction', (req, res) => {
  if (error) {
    res.status(400).send('Not Found');
  } else {
    res.status(200).send(UserAccount.getOne);
  }
});

app.put('/api/v1/userAccTransaction/:id', (req, res) => {
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    res.status(200).send(UserTransaction.update);
  }
});


// Create Account
app.get('/api/v1/createAccount', (req, res) => {
  res.render('createAccount');
});


app.post('/api/v1/createAccount', (req, res) => {
  const { error } = validateBankaUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    res.status(200).send(UserAccount.create);
  }
});


// ADMIN AND STAFF
//  Admin SignUp

app.get('/api/v1/adminSignUp', (req, res) => {
  res.render('adminSignUp.html');
});
app.post('/api/v1/adminSignUp', (req, res) => {
  if (error) {
    res.status(400).send('All fields are required');
  } else {
    res.status(200).send(User.create);
  }
});


// Admin Login
app.get('/api/v1/adminLogin', (req, res) => {
  res.render('adminLogin.html');
});

// adminLogin submit
app.post('/api/v1/adminLogin', (req, res) => {
  if (!user) {
    res.status(404).send('User Not Found');
  } else {
    res.status(200).send(User.getOne);
  }
});

//  Admin view all accounts Page
app.get('/api/v1/adminAllAccounts', (req, res) => {
  res.render('adminAllAccounts');
});

app.get('/api/v1/adminAllAccounts/all', (req, res) => {
  if (error) {
    res.status(400).send('Not Found');
  } else {
    res.status(200).send(UserAccount.getAll);
  }
});
// admin view a single account
app.get('/api/v1/adminAllAccounts/:id', (req, res) => {
  if (error) {
    res.status(400).send('Not Found');
  } else {
    res.status(200).send(UserAccount.getAll);
  }
});

// Admin create user account


app.post('/api/v1/adminAllAccounts/create', (req, res) => {
  if (error) {
    res.status(400).send('All fields are required');
  } else {
    res.status(200).send(UserAccount.create);
  }
});

// Admin Update user account

app.put('/api/v1/adminAllAccounts/update/:id', (req, res) => {
  if (error) {
    res.status(400).send('All fields are required');
  } else {
    res.status(200).send(UserAccount.create);
  }
});

// Admin delete account
app.delete('/api/v1/adminAllAccounts/delete/:id', (req, res) => {
  if (error) {
    res.status(400).send('All fields are required');
  } else {
    res.status(200).send(UserAccount.delete);
  }
});

// Admin credit accounts

app.get('/api/v1/adminCreditClient', (req, res) => {
  res.render('adminCreditClient');
});

app.put('/api/v1/adminCreditClient/:id', (req, res) => {
  if (error) {
    res.status(400).send('All fields are required');
  } else {
    res.status(200).send(UserAccount.update);
  }
});


// Admin Activate Clients
app.get('/api/v1/ adminActivateClient', (req, res) => {
  res.render('adminActivateClient');
});
app.post('/api/v1/adminActivateClient', (req, res) => {
  res.send('Account Activated');
});

function validateBankaUser(bankaUser) {
  const schema = {
    fullName: Joi.string().min(3).required(),
    userEmail: Joi.string().min(3).required(),
    password: Joi.string().min(3).required(),
    nuban: Joi.string().min(3).required(),
  };
  return Joi.validate(bankaUser, schema);
}


app.listen(3000, () => {
  console.log('Server is running at port 3000...');
});
