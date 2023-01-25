// 2023-01-25
import React, { useState } from 'react';

import { MdAdd } from 'react-icons/md';
import cn from 'classnames';

import './css/TodoInput.css';

const TodoInput = ({ add }) => {        // 부모(TodoTemplate.js)가 보낸 addTodo 함수

    // todo-input 박스를 렌더링할지 여부
    const [open, setOpen] = useState(false);
    
    // 입력폼에 입력한 데이터들을 담을 상태변수
    const [todo, setTodo] = useState({
        title: '',
        /*text: ''*/
    });

    // todo-input 박스를 열고 닫는 클릭이벤트 핸들러
    const inputToggle = e => {
        setOpen(!open);
    };

    // 입력값을 실시간으로 상태변수 todo에 저장하는 change 핸들러
    const titleChangeHandler = e => {

        // typeof e.target.value = string
        setTodo({
            ...todo,        // 기존 todo데이터 복사 후 title 추가
            title: e.target.value
        });
    };
    /*
    const blahblahHandler = e => {
        setTodo({
            ...todo,        // 기존 todo데이터 복사 후 text 추가
            text: e.target.value
        });
    };
    */

    // 할 일 입력 후 엔터 치면 서버로 POST 요청을 보내는 이벤트 핸들러
    const todoAddHandler = e => {
        if (e.key === 'Enter') {

            // 입력데이터들을 읽기
            //console.log(todo);

            // 서버 요청 보내기 --> 부모(TodoTemplate.js)에서 처리하는게 맞음
            //                     자식은 부모에게 입력데이터를 콜백함수로 넘기면 됨
            add(todo);

            // 서버 요청 보낸 후 title 입력값 비우기
            setTodo({
                ...todo,
                title: ''
            });
        };
    };

    // <form> 태그의 submit 을 멈추는 핸들러
    const stopSubmit = e => {
        e.preventDefault();     // 자동 submit 중지
    }

    return (
        <>
            { open &&
                <div className='todo-input'>
                    <form className='insert-form' onSubmit={stopSubmit}>
                        <input 
                            type='text' 
                            placeholder='할 일을 입력 후, Enter 를 누르세요'
                            autoFocus 
                            onKeyUp={todoAddHandler} 
                            onChange={titleChangeHandler}
                            value={todo.title}
                        />
                        {/*
                        <input
                            type='text'
                            placeholder='아무말'
                            onChange={blahblahHandler}
                        />
                        */}
                    </form>
                </div>
            }

            {/*  classNames 미사용 시 ) className={open ? 'begin-btn open' : 'begin-btn'} */}
            <button className={cn('begin-btn', {open})} onClick={() => inputToggle()}>    {/* cn('begin-btn', {open}) : open의 논리값에 따라 true면 기존 클래스에 붙음 */}
                <MdAdd />
            </button>
        </>
    );
};

export default TodoInput;