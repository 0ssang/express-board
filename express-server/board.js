/**
 *                 게시판 API 스펙
 * 경로             HTTP        메서드 설명
 * /                get         게시판 목록 가져오기
 * /posts           post        게시판에 글 작성 id, title, name, text, createdDt
 * /delete/:id      delete      게시글 아이디가 id인 글 삭제
 */

const express = require("express")
const app = express()
// 게시판 리스트로 활용할 posts에 빈 리스트 할당
let posts = []

// req.body를 사용하기 위한 JSON 미들웨어
app.use(express.json())
// POST 요청시 content-type이 application.x-www-from-urlencoded인 경우 파싱
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    // 게시글 리스트를 json 형식으로 보여줌
    res.json(posts)
})

app.post("/posts", (req, res) => {
    console.log(req.body)
    // HTTP Body 데이터를 변수에 할당
    const {title, name, text} = req.body

    // 게시글 리스트에 새로운 게시글 정보 추가
    posts.push({id: posts.length + 1, title, name, text, createdDt: Date()})
    res.json({title, name, text})
})

app.delete("/posts/:id", (req, res) => {
    // 설정한 path정보에서 id값을 가져옴
    const id = req.params.id
    const filteredPosts = posts.filter((post) => post.id !== +id)
    // 삭제 확인
    const isLengthChanged = posts.length !== filteredPosts.length
    posts = filteredPosts
    if(isLengthChanged){
        res.json("OK")
        return
    }
    res.json("NOT CHANGED")
})

app.listen(3000, () => {
    console.log("welcome posts START!")
})