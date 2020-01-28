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
let bankaUsers =[
  {
    id: 1, 
    fullName: 'John Doe',
    userEmail: 'jonny@gmail.com',
    password: '12345',
     nuban: '1001201301',
    accountType: 'Current',
     Balance: '200,000NGN'},
  {
    id: 2,
    fullName: 'Ngozi Okafor',
    userEmail: 'ngok@gmail.com',
    password: '12345',
    nuban: '1001401501',
    accountType: 'Savings',
    Balance: '500,000,000NGN'
  }
]


let bankaAdmins =[
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
  
  }
]

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

app.get('/api/v1/userLogin',  (req, res) => {
  res.render('userLogin.html');
});

// userLogin submit
app.post('/api/v1/userLogin/:id', (req, res) => {
  const user = user.find(bankaUsers => bankaUsers.id === parseInt(req.params.id));
  if(!user) res.send(404).send("User Not Found");
  res.send(user);
  }
);

// UserSignUp

app.get('/api/v1/userSignUp', (req, res) => {
  res.render('userSignUp.html');
});

app.post('/api/v1/userSignUp', (req, res) => {
  let {error} = validateBankaUser (req.body);
  if (error) {
    res.status(400).send(error.details[0].message)
    return;
  }
  let bankauser = {
    id: bankaUsers.length +1,
    fullName: req.body.fullName,
    userEmail: req.body.userEmail,
    password: req.body.password,
    nuban: req.body.nuban, 
  }
  bankausers.push(bankaUser);
  res.send(bankauser);
});
  

// AccountBalance
app.get('/api/v1/userAccountBal/:id', (req, res) => {
  let bankaUser = bankaUsers.find(c => c.id === parseInt(req.params.id));

  if (!bankaUser) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Ooops... Cant find what you are looking for!</h2>');
  res.send(bankauser);
});
  

app.post('/api/v1/userAccountBal', (req, res) => {
  res.render('userAccountBal');
});

// Accout Transaction
app.put('/api/v1/userAccTransaction/:id', (req, res) => {
  let bankaUser = bankaUsers.find(c => c.id === parseInt(req.params.id));
  if(!bankaUser) res.status(404).send("Not Found");

  const { error } = validateBankaUser(req.body);
  if(error){
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
  let { error } = validateBankaUser (req.body);
  if (error){
    res.status(400).send(error.details[0].message)
    return;
  }
  let userAccount = {
    id: UserAccount.length + 1,
    fullName: req.body.fullName,
    userEmail: req.body.userEmail,
    password: req.body.password,
    nuban: req.body.nuban
  };
    UserAccount.push(userAccount);
    res.send(userAccount);

});
// ADMIN AND STAFF
//  Admin SignUp

app.get('/api/v1/adminSignUp', (req, res) => {
  res.render('adminSignUp.html', {
    title: 'Admin SignUp',
  });
});
app.post('/api/v1/adminSignUp', (req, res) => {
      let {
        error
      } = validateBankaAdmin(req, res);
      if (error) {
        res.status(400).send(error.details[0].message)
        return;
      }
      let bankaAdmin = {
        id: bankaAdmins.length + 1,
        fullName: req.body.fullName,
        adminEmail: req.body.adminEmail,
        password: req.body.password
      };
      bankaAdmins.push(bankaAdmin);
      res.send(bankaAdmin);
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
app.get('/api/v1/adminAllAccounts', UserAccount.getAll);

//admin view a single account
app.get('/api/v1/useraccounts/:id', UserAccount.getOne);

app.post('/api/v1/useraccounts/:id', UserAccount.getOne);

//Admin create user account
app.post('/api/v1/adminAllAccounts', UserAccount.create);

//Admin Update user account

app.put('/api/v1/adminAllAccounts/update/:id', UserAccount.update);

//Admin delete account
app.delete('/api/v1/adminAllAccounts/delete/:id', UserAccount.delete);

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

app.put('/api/v1/adminCreditClient/:id', UserAccount.update);


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
app.listen(3000, function () {
  console.log("Server is running at port 5000...")
});
