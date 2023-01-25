// 2023-01-25
import React from 'react';

import { MdDone, MdDelete } from 'react-icons/md';
import cn from 'classnames';

import './css/TodoItem.css';

// ul에 들어갈 li태그
const TodoItem = ({ todo, remove }) => {

    const { id, title, done } = todo;
    
    // 서버에 삭제요청 클릭 이벤트 핸들러   --> 부모(TodoTemplate.js)에게 id값을 보내줘야 함
    const deleteClickHandler = e => {
        remove(id);
    };

    return (
        <li className='todo-item'>
             <div className={cn('check-circle', {active: done})}>       {/* done 값이 true면 active 클래스가 뒤에 붙음 */}
                {done && <MdDone />}
            </div>
            <span className={ cn('text', {finish: done}) }>     {/* done 값이 true면 finish 클래스가 뒤에 붙음 */}
                {title}
            </span>     
            <div className='remove' onClick={deleteClickHandler}>
                <MdDelete />
            </div>
        </li>
    );
};

export default TodoItem;