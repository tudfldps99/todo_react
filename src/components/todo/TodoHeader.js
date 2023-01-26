// 2023-01-25
import React from 'react';

import './css/TodoHeader.css';

const TodoHeader = ({ todoList }) => {

    // todoList에서 done값이 flase인 객체들만 필터링
    const unDoneTodos = todoList.filter(todo => !todo.done);

    // 할일 1. 현재 날짜로 바꿔보기 - 2023.01.26
    const today = new Date();
    const dateString = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });

    return (
        <header>
            <h1>{dateString}</h1>
            <h2 className='day'>{dayName}</h2>
            <div className='tasks-left'>할 일 {unDoneTodos.length}개 남음</div>
        </header>      
    );
};

export default TodoHeader