const express = require('express');
const bodyParser = require('body-parser');
const cons = require('consolidate');
const path = require('path');

const BankaUser = {
  fullName: 'Ifeoma okeke',
  userEmail: 'ifyokeke@gmail.com',
  password: 'Ify123',
  nuban: '1005691124',
  accountType: 'Savings',
};
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

app.post('/userSignUp', (res, req) => {
  let errors;
  if (errors) {
    res.render('userSignUp.html', {
      title: 'Check Your Details',
      errors,
    });
  } else {
    const user = new BankaUser();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.nuban = req.body.nuban;
    user.save((err) => {
      if (err) {
        console.log(err);
      } else {
        user.push(BankaUser);
        res.redirect('/');
      }
    });
  }
});

// AccountBalance
app.get('/userAccountBal', (res, req) => {
  res.render('userAccountBal', {
    title: 'Your Account Bal',
  });
});

app.post('/userAccountBal', (res, req) => {
  res.render('userAccountBal', {
    title: 'Your Account Bal',
  });
});

// Accout Transactiom
app.get('/userAccTransaction', (req, res) => {
  app.render('userAccTransaction', {
    title: 'Your Transactions',
  });
});
app.post('/userAccTransaction', (req, res) => {
  app.render('userAccTransaction', {
    title: 'Your Transactions',
  });
});

// Create Account
app.get('/createAccount', (req, res) => {
  app.render('createAccount', {
    title: 'Create Account',
  });
});
app.post('/createAccount', (req, res) => {
  app.render('createAccount', {
    title: 'Your Transactions',
  });
});


app.listen(3000, () => {
  console.log('Server started at port 3000...');
});
