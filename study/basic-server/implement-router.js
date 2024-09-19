const http = require("http")
const url = require("url")
/*
요청에 대한 응답을 createServer()안에서 직접 컨트롤함 -> 콜백함수에 모든 코드를 다 추가해야 하므로 좋지 않다.
라우팅 이후의 처리를 별도의 함수를 만들어서 처리하도록 코드를 리팩터링함
*/
http
    .createServer((req, res) => {
        const path = url.parse(req.url, true).pathname
        res.setHeader("Content-Type", "text/html; charset=utf-8")

        if(path === "/user"){
            user(req, res)
        } else if(path === "/feed"){
            feed(req, res)
        } else {
            notFound(req, res)
        }
    })
    .listen("3000", () => console.log("make a router!"))

// 라우팅 이후 처리하는 함수 선언
const user = (req, res) => {
    // 쿼리 스트링 데이터를 userInfo에 할당
    const userInfo = url.parse(req.url, true).query
    // 결괏값으로 이름과 나이 설정
    res.end(`[user] name: ${userInfo.name}, age: ${userInfo.age}`)
}

const feed = (req, res) => {
    res.end(`<ul>
        <li>picture1</li>
        <li>picture2</li>
        <li>picture3</li>
        </ul>
    `)
}

const notFound = (req, res) => {
    res.statusCode = 404
    res.end("404 page not found")
}