const http = require("http")
let count = 0
const log = (count) => {
    console.debug((count += 1))
}

const server = http.createServer((req, res) => {
    log(count)
    res.statusCode = 200
    res.setHeader("Content-Type", "text/plain")
    res.write("hello\n")
    setTimeout(() => {
        res.end("Node.js")
    }, 2000)
})


server.listen(8000, () => console.debug("Hello Node.js"))