// 2023-01-25
import React from 'react'

import TodoHeader from './TodoHeader'
import TodoInput from './TodoInput'
import TodoMain from './TodoMain'

// css 로딩
import './css/TodoTemplate.css'

const TodoTemplate = () => {

    // 할일 api 데이터 
    const todos = [
        {
            id: 1,
            title: '아침 산책',
            done: true
        },
        {
            id: 2,
            title: '오늘의 뉴스 읽기',
            done: true
        },
        {
            id: 3,
            title: '샌드위치 사먹기',
            done: false
        },
        {
            id: 4,
            title: '리액트 공부하기',
            done: false
        },
    ];

    return (
        <div className='todo-template'>
            <TodoHeader todoList={todos} />     {/* '할 일 x개 남음' 을 위해 TodoHeader에서도 todos 데이터 필요 */}
            <TodoMain todoList={todos} />
            <TodoInput />
        </div>
    )
}

export default TodoTemplate