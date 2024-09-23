const { MongoClient } = require("mongodb")
const uri = "mongodb+srv://detective:ysh31228*@cluster0.4huxy.mongodb.net/board?retryWrites=true&w=majority&appName=Cluster0";

module.exports = function(callback) {
    return MongoClient.connect(uri, callback)
}