const express = require("express")
const handlebars = require("express-handlebars")
const app = express()

// template engine 등록
app.engine("handlebars", handlebars.engine())

// 웹 페이지 로드 시 사용할 템플릿 엔진 설정
app.set("view engine", "handlebars")
// 뷰 디렉토리 설정
app.set("views", __dirname + "/views")

// 라우터 설정
app.get("/", (req, res) => {
    // home : 템플릿 파일 이름 => home.haldlebars
    res.render("home", {title: "테스트 게시판"})
})

app.get("/write", (req, res) => {
    // write : 템플릿 파일 이름 => write.haldlebars
    res.render("write", {title: "테스트 게시판"})
})

app.get("/detail/:id", async (req, res) => {
    res.render("detail", {
        title: "테스트 게시판",
    })
})

app.listen(3000)