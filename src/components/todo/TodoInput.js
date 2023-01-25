// 2023-01-25
import React, { useState } from 'react';

import { MdAdd } from 'react-icons/md';
import cn from 'classnames';

import './css/TodoInput.css';

const TodoInput = () => {

    // todo-input 박스를 렌더링할지 여부
    const [open, setOpen] = useState(false);

    // todo-input 박스를 열고 닫는 클릭이벤트 핸들러
    const inputToggle = e => {
        setOpen(!open);
    }

    return (
        <>
            { open &&
                <div className='todo-input'>
                    <form className='insert-form'>
                        <input 
                            type='text' 
                            placeholder='할 일을 입력 후, Enter 를 누르세요'
                            autoFocus  
                        />
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