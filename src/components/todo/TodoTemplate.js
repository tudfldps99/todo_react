// 2023-01-25
import React, { useEffect, useState } from 'react';

import TodoHeader from './TodoHeader';
import TodoInput from './TodoInput';
import TodoMain from './TodoMain';

import { Spinner } from 'reactstrap';

// css 로딩
import './css/TodoTemplate.css';

const TodoTemplate = () => {

    const API_BASE_URL = 'http://localhost:8080/api/todos';

    // 할일 api 데이터 
    const [todos, setTodos] = useState([]);

    // 로딩 중 상태
    const [loading, setLoading] = useState(true);

    // 할일 등록 서버 요청  (POST에 대한 응답처리)
    const addTodo = ( todo ) => {
        fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(todo)          // todo : <form> 입력 데이터 --> 자식(TodoInput.js)에게 있는 데이터 ==> callback 이용
        })
        .then(res => res.json())
        .then(result => {
            setTodos(result.todos);     // json 갱신
        });
    };

    // 할일 삭제 요청 처리 (DELETE에 대한 응답처리)
    const deleteTodo = ( id ) => {      // 삭제하고 싶은 id값을 자식(TodoItem.js)에게 받아와야 함
        fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(result => {
            setTodos(result.todos);     // json 갱신
        });
    };

    // 할일 수정 요청 처리 (PUT, PATCH)
    const updateTodo = ( todo ) => {
        fetch(`${API_BASE_URL}/${todo.id}`, {
            method: 'PUT' || 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(todo)
        })
        .then(res => res.json())
        .then(result => {
            setTodos(result.todos);
        });
    }

    // 렌더링 되자마자 할 일 => todos api GET 목록 호출
    useEffect(() => {
        fetch(API_BASE_URL)
            .then(res => {
                if (res.status === 403) {
                    alert('로그인이 필요한 서비스입니다');
                    // 리다이렉트 (로그인 페이지로)
                    return;
                } 
                else if (res.status === 500) {
                    alert('서버가 불안정합니다');
                    return;
                }
                return res.json();
            })
            .then(result => {
                setTodos(result.todos);

                // 로딩 완료 처리
                setLoading(false);
            });
    }, []);

    // 로딩 중일 때 보여줄 태그
    const loadingPage = (
        <div className="loading">
            <Spinner color="danger" >
                Loading...
            </Spinner>
        </div>
    );

    // 로딩 완료 시 보여줄 태그
    const viewPage = (
        <div className='todo-template'>
            <TodoHeader todoList={todos} />     {/* '할 일 x개 남음' 을 위해 TodoHeader에서도 todos 데이터 필요 */}
            <TodoMain todoList={todos} remove={deleteTodo} update={updateTodo} />    {/* 자식에서 부모에게 입력값을 콜백함수로 넘기기 위해 자식에게 deleteTodo 함수 보냄 */}
            <TodoInput add={addTodo}/>      {/* 자식에서 부모에게 입력값을 콜백함수로 넘기기 위해 자식에게 addTodo 함수 보냄 */}
        </div>
    );

    return (
        <>
            { loading ? loadingPage : viewPage}
        </>
    )
}

export default TodoTemplate