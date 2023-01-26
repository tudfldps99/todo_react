// 2023-01-26
// (component가 아니기 때문에 파일 시작을 소문자로 해도 됨)

// 브라우저가 현재 클라이언트의 호스트 이름을 얻어옴
const hostname = window.location.hostname;

let backendHost;        // 백엔드 호스트 이름

if (hostname === 'localhost') {
    backendHost = 'http://localhost:8080';
} else if (hostname === 'lalala.com') {     // (예시)
    backendHost = 'http://rururu.com';
}

export const BASE_URL = backendHost;
export const TODO = '/api/todos';
export const USER = '/api/auth';