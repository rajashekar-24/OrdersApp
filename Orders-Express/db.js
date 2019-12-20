const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Orders', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
})
.then(()=> console.log('Database Connected !!'))
.catch((err)=> console.log(`Connection Error ${err}`))

module.exports = mongoose;