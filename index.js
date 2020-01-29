const express = require('express');
const Joi = require('joi');
const bodyParser = require('body-parser');
const cons = require('consolidate');
const path = require('path');
const UserAccount = require('./controllers/UserAccount');


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

// Creating a user signup details
const bankaUsers = [
  {
    id: 1,
    fullName: 'John Doe',
    userEmail: 'jonny@gmail.com',
    password: '12345',
    nuban: '1001201301',
    accountType: 'Current',
    Balance: '200,000NGN',
  },
  {
    id: 2,
    fullName: 'Ngozi Okafor',
    userEmail: 'ngok@gmail.com',
    password: '12345',
    nuban: '1001401501',
    accountType: 'Savings',
    Balance: '500,000,000NGN',
  },
];


const bankaAdmins = [
  {
    id: 1,
    fullName: 'AdJohn Doe',
    adminEmail: 'jonny@gmail.com',
    password: '12345',
  },
  {
    id: 2,
    fullName: 'AdNgozi Okafor',
    adminEmail: 'ngok@gmail.com',
    password: '12345',

  },
];

// Creating an admin signup details
function BankaAdmin(fullName, adminEmail, password, adminNumber, adminRank) {
  this.fullName = fullName;
  this.adminEmail = adminEmail;
  this.password = password;
  this.adminNumber = adminNumber;
  this.adminRank = adminRank;
}

// home route
app.get('/', (req, res) => {
  res.render('userLogin.html');
});
// UserSignUp

app.get('/api/v1/userSignUp', (req, res) => {
  res.render('userSignUp.html');
});

app.post('/api/v1/userSignUp', (req, res) => {
  const { error } = validateBankaUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let bankauser = {
    id: bankaUsers.length + 1,
    fullName: req.body.fullName,
    userEmail: req.body.userEmail,
    password: req.body.password,
    nuban: req.body.nuban,
  };
  bankausers.push(bankaUser);
  res.send(bankauser);
});

//Login
app.get('/api/v1/userLogin', (req, res) => {
  res.render('userLogin.html');
});

// userLogin submit
app.post('/api/v1/userLogin/:id', (req, res) => {
  const user = bankaUsers.find(c => c.id === parseInt(req.params.id));
  if (!user) res.send(404).send('User Not Found');
  // res.sendStatus(`Your Account balance is ${user.Balance}`);
  res.redirect('/api/v1/userAccountBal/:id');
});


// AccountBalance
app.get('/api/v1/userAccountBal/:id', (req, res) => {
  const bankaUser = bankaUsers.find((c) => c.id === parseInt(req.params.id));

  if (!bankaUser) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
  res.sendStatus(bankaUser.Balance);
});


app.post('/api/v1/userAccountBal', (req, res) => {
  res.render('userAccountBal');
});

// Accout Transaction
app.put('/api/v1/userAccTransaction/:id', (req, res) => {
  const bankaUser = bankaUsers.find((c) => c.id === parseInt(req.params.id));
  if (!bankaUser) res.status(404).send('Not Found');

  const { error } = validateBankaUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  bankaUser.fullName = req.body.fullName;
  bankaUser.userEmail = req.body.userEmail;
  bankaUser.nuban = req.body.nuban;
  bankaUser.Balance = req.body.Balance;
  res.send(bankaUser);
});
app.get('/api/v1/userAccTransaction', (req, res) => {
  res.render('userAccTransaction', {
    title: 'Your Transactions',
  });
});

// Create Account
app.get('/api/v1/createAccount', (req, res) => {
  res.render('createAccount', {
    title: 'Your Transactions',
  });
});


app.post('/api/v1/createAccount', (req, res) => {
  const { error } = validateBankaUser(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const userAccount = {
    id: UserAccount.length + 1,
    fullName: req.body.fullName,
    userEmail: req.body.userEmail,
    password: req.body.password,
    nuban: req.body.nuban,
  };
  UserAccount.push(userAccount);
  res.send(userAccount);
});
// ADMIN AND STAFF
//  Admin SignUp

app.get('/api/v1/adminSignUp', (req, res) => {
  res.render('adminSignUp.html');
});
app.post('/api/v1/adminSignUp', (req, res) => {
  let bankaAdmin = {
    id: bankaAdmins.length + 1,
    fullName: req.body.fullName,
    adminEmail: req.body.adminEmail,
    password: req.body.password,
  };
  bankaAdmins.push(bankaAdmin);
  // res.send(bankaAdmin);
  res.redirect('/api/v1/adminLogin');
});


// Admin Login
app.get('/api/v1/adminLogin', (req, res) => {
  res.render('adminLogin.html');
});

// adminLogin submit
app.post('/api/v1/adminLogin', (req, res) => {
  res.redirect('/api/v1/adminAllAccounts');
});

//  Admin view all accounts Page
app.get('/api/v1/adminAllAccounts/all',(req, res) => { 
 res.send(UserAccount.findAll);
});

// admin view a single account
app.get('/api/v1/adminAllAccounts/:id', (req, res) => {
  res.send(UserAccount.findOne);
});

// Admin create user account
app.post('/api/v1/adminAllAccounts/create', (req, res) => {
  res.send(UserAccount.create);
});

// Admin Update user account

app.put('/api/v1/adminAllAccounts/update/:id', (req, res) => {
  res.send(UserAccount.update);
});

// Admin delete account
app.delete('/api/v1/adminAllAccounts/delete/:id', (req, res) => {  res.send(UserAccount.delete);
});

app.post('/api/v1/adminAllAccounts', (req, res) => {
  res.render('adminAllAccounts', {
    title: 'All Account Page',
  });
});

// Admin credit accounts

app.get('/api/v1/adminCreditClient', (req, res) => {
  res.render('adminCreditClient', {
    title: 'Admin Page',
  });
});

app.put('/api/v1/adminCreditClient/:id', (req, res) => {
 res.send(UserAccount.update);
});


// Admin Activate Clients
app.get('/api/v1/ adminActivateClient', (req, res) => {
  res.render('adminActivateClient', {
    title: 'Admin Page',
  });
});
app.post('/api/v1/adminActivateClient', (req, res) => {
  res.send('Account Activated', {
    title: 'All Account Page',
  });
});

function validateBankaUser(bankaUser) {
  const schema = {
    fullName: Joi.string().min(3).required(),
    userEmail: Joi.string().min(3).required(),
    password: Joi.string().min(3).required(),
    nuban: Joi.string().min(3).required()
  };
  return Joi.validate(bankaUser, schema);
}


app.listen(3000, () => {
  console.log('Server is running at port 3000...');
});
