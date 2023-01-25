// 2023-01-25
import React, { useEffect, useState } from 'react'

import TodoHeader from './TodoHeader'
import TodoInput from './TodoInput'
import TodoMain from './TodoMain'

// css 로딩
import './css/TodoTemplate.css'

const TodoTemplate = () => {

    const API_BASE_URL = 'http://localhost:8080/api/todos';

    // 할일 api 데이터 
    const [todos, setTodos] = useState([]);

    // 할일 등록 서버 요청  (POST에 대한 응답처리)
    const addTodo = ( todo ) => {
        fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(todo)          // todo : <form> 입력 데이터 --> 자식에게 있는 데이터 ==> callback 이용
        })
        .then(res => res.json())
        .then(result => {
            setTodos(result.todos);
        });
    };

    // 렌더링 되자마자 할 일 => todos api GET 목록 호출
    useEffect(() => {
        fetch(API_BASE_URL)
            .then(res => res.json())
            .then(result => {
                setTodos(result.todos);
            });
    }, []);

    return (
        <div className='todo-template'>
            <TodoHeader todoList={todos} />     {/* '할 일 x개 남음' 을 위해 TodoHeader에서도 todos 데이터 필요 */}
            <TodoMain todoList={todos} />
            <TodoInput add={addTodo}/>      {/* 자식에서 부모에게 입력값을 콜백함수로 넘기기 위해 자식에게 addTodo 함수 보냄 */}
        </div>
    )
}

export default TodoTemplate