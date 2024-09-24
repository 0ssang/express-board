const express = require("express")
const handlebars = require("express-handlebars")
const app = express()
// mongoDB 연결 함수
const mongodbConnection = require("./configs/mongodb-connection")
const postService = require("./services/post-service")
const {ObjectId} = require("mongodb")

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

// 상세 페이지
app.get("/detail/:id", async (req, res) => {
    // 게시글 정보 가져오기
    const result = await postService.getDetailPost(collection, req.params.id)
    res.render("detail", {
        title: "테스트 게시판",
        post: result.value,
    })
})

// 글 쓰기 페이지 이동 mode는 create
app.get("/write", (req, res) => {
    // write : 템플릿 파일 이름 => write.haldlebars
    res.render("write", {title: "테스트 게시판", mode: "create"})
})

// 글 수정 페이지로 이동 mode는 modify
app.get("/modify/:id", async (req, res) => {
    // getPostById() 함수로 게시글 데이터 받아옴
    const post = await postService.getPostById(collection, req.params.id)
    res.render("write", { title: "테스트 게시판", mode: "modify", post })
})

// 게시글 쓰기
app.post("/write", async (req, res) => {
    const post = req.body
    // 글쓰기 후 결과 반환
    const result = await postService.writePost(collection, post);
    // 생성된 도큐면트의 _id를 사용해 상세페이지로 이동
    res.redirect(`/detail/${result.insertedId}`)
})

// 게시글 수정
app.post("/modify/", async (req, res) => {
    const { id, title, writer, password, content } = req.body

    const post = {
        title,
        writer,
        password,
        content,
        createdDt: new Date().toISOString(),
    }

    // 업데이트 결과
    const result = postService.updatePost(collection, id, post)
    res.redirect(`/detail/${id}`)
})

// 게시글 삭제
app.delete("/delete", async (req, res) => {
    const {id, password} = req.body
    try{
        const result = await collection.deleteOne({ _id: ObjectId(id), password: password })
        if(result.deletedCount !== 1){
            console.log("삭제 실패")
            return res.json({ isSuccess: false})
        }
        return res.json({ isSuccess: true})
    } catch (error) {
        console.log(error)
        return res.json({ isSuccess: false })
    }
})

// 패스워드 체크
app.post("/check-password", async (req, res) => {
    const { id, password } = req.body

    // postService의 getPostByIdAndPassword() 사용하여 게시글 데이터 확인
    const post = await postService.getPostByIdAndPassword(collection, {id, password})

    // 데이터가 있으면 isExist true, 없으면 isExist false
    if(!post){
        return res.status(404).json({isExist: false})
    } else {
        return res.json({isExist: true})
    }
})

// 댓글 추가
app.post("/write-comment", async (req, res) => {
    const {id, name, password, comment} = req.body
    const post = await postService.getPostById(collection, id)

    // 게시글에 기존 댓글 리스트가 있다면 추가
    if(post.comments){
        post.comments.push({
            idx: post.comments.length + 1,
            name,
            password,
            comment,
            createdDt: new Date().toISOString(),
        })
    } else {
    // 게시글에 기존 댓글 리스트가 없다면 리스트에 댓글 정보 추가
        post.comments = [
            {
                idx: 1,
                name,
                password,
                comment,
                createdDt: new Date().toISOString(),
            },
        ]
    }

    // 업데이트하기. 업데이트 후에는 상세페이지로 다시 리다이렉트
    postService.updatePost(collection, id, post)
    return res.redirect(`/detail/${id}`)
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