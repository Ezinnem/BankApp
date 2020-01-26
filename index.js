const express = require('express');
const bodyParser = require('body-parser');
const cons = require('consolidate');
const path = require('path');

// Creating a user signup details
let bankaUser =[
  {
    "id": "1", 
    "fullName": "John Doe",
    "userEmail": "jonny@gmail.com",
    "password": "12345",
     "nuban": "1001201301", "Balance": "200,000,000NGN"},
  {
    "id": "2",
    "fullName": "Ngozi Okafor",
    "userEmail": "ngok@gmail.com",
    "password": "12345",
    "nuban": "1001401501",
    "accountType": "Savings",
    "Balance": "500,000,000NGN"
  }
]

function BankaUser(fullName, userEmail, password, nuban, accountType) {
  this.fullName = fullName;
  this.userEmail = userEmail;
  this.password = password;
  this.nuban = nuban;
  this.accountType = accountType;
}

// Creating an admin signup details
function BankaAdmin(fullName, adminEmail, password, adminNumber, adminRank) {
  this.fullName = fullName;
  this.adminEmail = adminEmail;
  this.password = password;
  this.adminNumber = adminNumber;
  this.adminRank = adminRank;
}

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

// set public static files
app.use(express.static(path.join(__dirname, '/public')));


// home route
app.get('/', (req, res) => {
  res.render('userLogin.html');
});

app.get('/userLogin', (req, res) => {
  res.render('userLogin.html');
});

// userLogin submit
app.post('/userLogin', (req, res) => {
  let errors;
  if (errors) {
    res.render('userLogin.html', {
      title: 'Check Login Details again',
      errors,
    });
  } else {
    res.render('userAcountBal.html');
  }
});

// UserSignUp

app.get('/userSignUp', (req, res) => {
  res.render('userSignUp.html', {
    title: 'User SignUp',
  });
});

app.post('/userSignUp', (req, res) => {
  let errors;
  if (errors) {
    res.render('userSignUp.html', {
      title: 'Check Your Details',
      errors,
    });
  } else {
    
    let user = new bankaUser;
    user.fullName = req.body.fullName;
    user.userEmail = req.body.userEmail;
    user.password = req.body.password;
    user.nuban = req.body.nuban;
    user.save((err) => {
      if (err) {
        console.log(err);
      } else {
        user.push(bankaUser);
        res.redirect('/');
      }
    });
  }
});

// AccountBalance
app.get('/userAccountBal', (req, res) => {
  res.render('userAccountBal', {
    title: 'Your Account Bal',
  });
});

app.post('/userAccountBal', (req, res) => {
  res.render('userAccountBal', {
    title: 'Your Account Bal',
  });
});

// Accout Transaction
app.get('/userAccTransaction', (req, res) => {
  res.render('userAccTransaction', {
    title: 'Your Transactions',
  });
});
app.post('/userAccTransaction', (req, res) => {
  res.render('userAccTransaction', {
    title: 'Your Transactions',
  });
});

// Create Account
app.get('/createAccount', (req, res) => {
  res.render('createAccount', {
    title: 'Create Account',
  });
});
app.post('/createAccount', (req, res) => {
  res.render('createAccount', {
    title: 'Your Transactions',
  });
});

// ADMIN AND STAFF

// Admin Login
app.get('/adminLogin', (req, res) => {
  res.render('adminLogin.html');
});

// adminLogin submit
app.post('/adminLogin', (req, res) => {
  let errors;
  if (errors) {
    res.render('adminLogin.html', {
      title: 'Check Login Details again',
      errors,
    });
  } else {
    res.render('adminAllAccounts.html');
  }
});

//  Admin SignUp

app.get('/adminSignUp', (req, res) => {
  res.render('adminSignUp.html', {
    title: 'Admin SignUp',
  });
});

app.post('/adminSignUp', (req, res) => {
  let errors;
  if (errors) {
    res.render('adminSignUp.html', {
      title: 'Check Your Details',
      errors,
    });
  } else {
    const admin = new BankaAdmin();
    admin.fullName = req.body.fullName;
    admin.adminEmail = req.body.adminEmail;
    admin.password = req.body.password;
    admin.adminNumber = req.body.adminNumber;
    admin.adminRank = req.body.adminRank;
    admin.save((err) => {
      if (err) {
        console.log(err);
      } else {
        admin.push(BankaAdmin);
        res.redirect('/adminLogin');
      }
    });
  }
});
//  Admin view all accounts Page

app.get('/adminAllAccounts', (req, res) => {
  res.render('adminAllAccounts', {
    bankaUser: bankaUser,
  });
});
app.post('/adminAllAccounts', (req, res) => {
  res.render('adminAllAccounts', {
    title: 'All Account Page',
  });
});

// Admin credit accounts

app.get('/adminCreditClient', (req, res) => {
  res.render('adminCreditClient', {
    title: 'Admin Page',
  });
});
app.post('/adminCreditClient', (req, res) => {
  res.render('adminCreditClient', {
    title: 'All Account Page',
  });
});

// Admin Activate Clients
app.get('/adminActivateClient', (req, res) => {
  res.render('adminActivateClient', {
    title: 'Admin Page',
  });
});
app.post('/adminActivateClient', (req, res) => {
  res.send('Account Activated', {
    title: 'All Account Page',
  });
});

app.post('/adminDeactivateClient', (req, res) => {
  res.send('Account Deactivated', {
    title: 'All Account Page',
  });
});


app.listen(3000, () => {
  console.log('Server started at port 3000...');
});
