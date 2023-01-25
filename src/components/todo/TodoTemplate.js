// 2023-01-25
import React from 'react'

import TodoHeader from './TodoHeader'
import TodoInput from './TodoInput'
import TodoMain from './TodoMain'

// css 로딩
import './css/TodoTemplate.css'


const TodoTemplate = () => {
  return (
    <div className='todo-template'>
        <TodoHeader />
        <TodoMain />
        <TodoInput />
    </div>
  )
}

export default TodoTemplate