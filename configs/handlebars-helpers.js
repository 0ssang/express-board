module.exports = {
    // 1. 리스트 길이 반환
    // handlebars에서 리스트 객체가 null인 경우 빈 값이 나옴 -> 0으로 표시하기 위함
    lengthOfList: (list = []) => list.length,
    // 2. 두 값을 비교해 같은지 여부를 반환
    eq: (val1, val2) => val1 === val2,
    // 3. ISO 날짜 문자열에서 날짜만 반환
    // 현재 로케일을 반영해 뽑아내는 함수
    dateString: (isoString) => new Date(isoString).toLocaleDateString(),
};

// 헬퍼 함수 사용시 {{헬퍼 함수명 변수1 변수2 ... 변수n}}
// 중첩 사용시 {{헬퍼 함수1 (헬퍼 함수2 변수 1 변수2) 변수1}}
// 사용 예시
// {{lengthOfList comments}}개의 댓글이 있습니다.
// 작성일시 : {{dateString createdDt}}
// {{#if (eq . @root.paginator.page)}} eq 테스트 {{/if}}