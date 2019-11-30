const mongodb = require('mongodb')

//Initialize connection gives access to function necessary to create CRUD operations
const MongoClient = mongodb.MongoClient;


const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if(error){
        return console.log("Unable to connect to Database")
    }

    //Gets refernce to the specific db to manipulate
    const db = client.db(databaseName)

    db.collection('users').insertOne({
        name: 'Cesar',
        age: '29'
    })
})