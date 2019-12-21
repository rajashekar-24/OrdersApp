1) Used Nodejs/Expressjs framework as backend for the orders application(Ordes-Express folder name) 
a. Mongoose driver is used for connectivity between expressjs and mongodb(MongoDB server was running on localhost:27017 and NodeJS at localhost:3000 ports) 
b. app.js having all routes configured and it is used to run the nodeJS at localhost:3000 
d. Models folder has files which defines the data models for orders and users. 
e. Controllers folder has all routes configured for orders in OrderController and userController for User (CRUD operations)
f. After login, jwt token will be generated with user details. 
g. Goto Orders-Express folder (cd Orders-Express), then enter "npm run dev" command to start the nodeJS application


2) Used NgModal for Orders modal form, Reactive forms for login and signup, bootstrap modules in angular application -- Defined 4 components: 
a. header: Navbar and Logout for the application
a. login : helps you to display login and signup html foms and to signup user and check whether user is authenticated or not. 
c. orders : It is used to display/add/edit/delete orders in form in popup modal. 
d. Orders-UI forlder (cd Orders-UI) has Front end part, it would run on localhost:4200
e. node_modules folder is removed, "run npm install" command to get all the dependencies. Then npm serve to start the application
