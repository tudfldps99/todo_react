// 2023-01-25
import React, { useState } from 'react';

import { MdDone, MdDelete, MdUpdate, MdCheck } from 'react-icons/md';
import cn from 'classnames';

import './css/TodoItem.css';

// ul에 들어갈 li태그
const TodoItem = ({ todo, remove, update }) => {

    const { id, title, done } = todo;

    // 제목 수정 모드로 진입했는지 여부
    const [updateFlag, setUpdateFlag] = useState(false);
    // 할 일 완료 체크박스가 체크되었는지 여부
    const [checkFlag, setCheckFlag] = useState(done);
    // 수정시 제목변경처리를 위해 제목을 상태변수로 관리한다.
    const [titleValue, setTitleValue] = useState(title);

    // 서버에 삭제요청 클릭 이벤트 핸들러   --> 부모(TodoTemplate.js)에게 id값을 보내줘야 함
    const deleteClickHandler = e => {
        remove(id);
    };

    // 서버에 수정요청 클릭 이벤트 핸들러
    const doneCheckHandler = e => {

        if (updateFlag) 
            return;

        // 서버쪽으로 현재 done 값의 반대 논리값을 전달하여 수정
        const modTodo = {
            ...todo,
            done: !done
        }

        // id, title, done 모두 TodoTemplate에게 전달
        update(modTodo);

        setCheckFlag(modTodo.done);
    };

    // 제목수정 입력란이 변경될때 이벤트 처리
    const titleChangeHandler = e => {
        setTitleValue(e.target.value);
    };

    // 할 일 제목 수정 모드 진입 이벤트
    const modifyClickHandler = e => {
        if (checkFlag) {
            alert('완료된 할 일은 수정할 수 없습니다.');
            return;
        }

        if (!updateFlag) {
            setUpdateFlag(true);
        } else {
            const modTodo = {
                ...todo,
                title: titleValue
            };

            // 무의미한 수정요청을 피하기위해 
            // 제목에 변화가 일어났을 때만 서버 통신을 보낸다.
            if (title !== titleValue) 
                update(modTodo);

            setUpdateFlag(false);
        }
  };

    return (
        <li className='todo-item'>
             <div className={cn('check-circle', {active: done})}     /* done 값이 true면 active 클래스가 뒤에 붙음 */
                    onClick={doneCheckHandler}>      
                {done && <MdDone />}
            </div>

            {/* 할일 2. title 수정 가능하도록 해보기 */}
            {updateFlag 
                ? <input 
                    className='text' 
                    maxLength={10}
                    value={titleValue} 
                    onChange={titleChangeHandler} 
                    />
                :   <span className={cn('text', {finish: done})}>
                        {title}
                    </span>
            }
            <div className="modify" onClick={modifyClickHandler}>
                {updateFlag ? <MdCheck /> : <MdUpdate />}
            </div>

            <div className='remove' onClick={deleteClickHandler}>
                <MdDelete />
            </div>
        </li>
    );
};

export default TodoItem;