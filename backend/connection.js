    const mongoose = require('mongoose');
    const url= "mongodb+srv://anushree47:anushree1234@cluster0.1wrlv.mongodb.net/mymajorproject?retryWrites=true&w=majority&appName=Cluster0" ;
    // asynchroneous function - returns Promise
    mongoose.connect(url)
        .then((result) => {
            console.log('database connected');
        })
        .catch((err) => {
            console.log(err);
        });

    module.exports =  mongoose;