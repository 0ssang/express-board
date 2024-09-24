const express = require("express")
const handlebars = require("express-handlebars")
const app = express()
// mongoDB 연결 함수
const mongodbConnection = require("./configs/mongodb-connection")
const postService = require("./services/post-service")

// template engine 등록
app.engine(
    "handlebars",
    handlebars.create({
        helpers: require("./configs/handlebars-helpers"),
    }).engine,
)

// 웹 페이지 로드 시 사용할 템플릿 엔진 설정
app.set("view engine", "handlebars")
// 뷰 디렉토리 설정
app.set("views", __dirname + "/views")

// req.body와 POST 요청을 해석하기 위한 설정
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// 라우터 설정
// 리스트 페이지
app.get("/", async (req, res) => {
    // 현재 페이지 데이터
    const page = parseInt(req.query.page) || 1
    // 검색어 데이터
    const search = req.query.search || ""
    try{
        // postService.list 에서 글 목록과 페이지네이터를 가져옴
        const [posts, paginator] = await postService.list(collection, page, search)

        // 리스트 페이지 렌더링
        res.render("home", {title: "테스트 게시판", search, paginator, posts})
    } catch (error) {
        // 에러가 나는 경우는 빈 값으로 렌더링
        console.log(error)
        res.render("home", {title: "테스트 게시판"})
    }
})

app.get("/write", (req, res) => {
    // write : 템플릿 파일 이름 => write.haldlebars
    res.render("write", {title: "테스트 게시판"})
})

// 상세 페이지로 이동
app.get("/detail/:id", async (req, res) => {
    // 게시글 정보 가져오기
    const result = await postService.getDetailPost(collection, req.params.id)
    res.render("detail", {
        title: "테스트 게시판",
        post: result.value,
    })
})

// 글쓰기
app.post("/write", async (req, res) => {
    const post = req.body
    // 글쓰기 후 결과 반환
    const result = await postService.writePost(collection, post);
    // 생성된 도큐면트의 _id를 사용해 상세페이지로 이동
    res.redirect(`/detail/${result.insertedId}`)
})

// Mongodb 라이브러리에서 내부 커넥션 풀을 관리하고 있으므로 글로벌 변수로 사용해도 문제가 없음
let collection
app.listen(3000, async () => {
    console.log("Server started")
    // mongodbConnection()의 결과는 mongoClient
    const mongoClient = await mongodbConnection()
    //  mongoClient.db()로 DB 선택 collection()으로 컬렉션 선택 후 collection에 할당
    collection = mongoClient.db('board').collection("post")
    console.log("MongoDB connected")
})