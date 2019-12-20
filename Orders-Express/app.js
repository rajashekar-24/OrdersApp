const express = require('express');
const app = express();
const cors = require('cors');
const { mongoose } = require('./db.js');
const userController = require('./Controllers/UserController.js');
const orderController = require ('./Controllers/OrderController.js');
const authController = require('./Controllers/AuthController.js');
const port = 3000;

app.use(cors({ origin : 'http://localhost:4200' , optionsSuccessStatus: 200}));

// parse request bodies (req.body)
app.use(express.urlencoded({extended: false}))
app.use(express.json())

/* Server Check */
app.get('/check',(req,res)=>{
   res.send('Hello from server..!!');
})

/* Auth Routes */
app.use('/', authController);
/* User Routes */
app.use('/user', userController);
/* Order Routes */
app.use('/order', orderController);


app.listen(port,() => `Server Listening to the port ${port}`);

app.use((req,res,next)=>{
   res.status(404).send(`Sorry couldn't Find the request !!`);
})
