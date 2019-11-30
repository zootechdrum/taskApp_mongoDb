//Use destructuring to get methods of the Mongo object

const { MongoClient, ObjectID } = require('mongodb');


const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

//We get a unique ID from Object ID
const id = new ObjectID()

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("Unable to connect to Database")
    }

    //Gets refernce to the specific db to manipulate
    const db = client.db(databaseName)

    db.collection('users').find({ name: "Cesar" }).toArray((Array, users) => {
        console.log(users);
    })


})