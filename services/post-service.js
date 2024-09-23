// 글쓰기 서비스
async function writePost(collection, post){
    // 생성일시와 조회수 넣어주기
    post.hits = 0
    post.createdDt = new Date().toISOString() // 날짜는 ISO 포맷으로 저장
    return collection.insertOne(post)
}

// require()로 파일을 임포트 시 외부로 노출하는 객체
module.exports = {
    writePost,
}