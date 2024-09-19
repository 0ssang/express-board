
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://detective:ysh31228*@cluster0.4huxy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    await client.connect();
    // admin DB 인스턴스
    const adminDB = client.db('test').admin();
    const listDatabases = await adminDB.listDatabases();
    console.log(listDatabases);
    return "OK"
    // try {
    //     // Connect the client to the server	(optional starting in v4.7)
    //     await client.connect();
    //     // Send a ping to confirm a successful connection
    //     const adminDB = client.db("test").admin();
    //     const listDatabases = await adminDB.listDatabases()
    //     console.log(listDatabases);
    // } finally {
    //     // Ensures that the client will close when you finish/error
    //     await client.close();
    // }
}
run().then(console.log).catch(console.error).finally(() => client.close());