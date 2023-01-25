// 2023-01-25
import React from 'react';

import TodoItem from './TodoItem';

import './css/TodoMain.css';

const TodoMain = ({ todoList, remove, update }) => {

    return (
        <ul className='todo-list'>
            {
                todoList.map(todo => 
                    <TodoItem 
                        key={todo.id} 
                        todo={todo}
                        remove={remove}     /* 자식에서 부모에게 입력값을 콜백함수로 넘기기 위해 자식에게 remove 함수 보냄 */
                        update={update}
                    />
                )     
            }
        </ul>    
    );
};

export default TodoMain;