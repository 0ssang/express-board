const { MongoClient } = require("mongodb")
const uri = "mongodb+srv://manager:1q2w3er4$@cluster0.ul1kj.mongodb.net/board"

module.exports = function(callback) {
    return MongoClient.connect(uri, callback)
}