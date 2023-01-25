// 2023-01-25
import React from 'react';

import './css/TodoHeader.css';

const TodoHeader = ({ todoList }) => {

    // todoList에서 done값이 flase인 객체들만 필터링
    const unDoneTodos = todoList.filter(todo => !todo.done);

    let now = new Date();
    const week = ['일', '월', '화', '수', '목', '금', '토'];

    // 할일 1. 현재 날짜로 바꿔보기 (완료)
    return (
        <header>
            <h1>{now.getFullYear()}년 {now.getMonth() + 1}월 {now.getDate()}일</h1>
            <h2 className='day'>{week[now.getDay()]}요일</h2>
            <div className='tasks-left'>할 일 {unDoneTodos.length}개 남음</div>
        </header>      
    );
};

export default TodoHeader