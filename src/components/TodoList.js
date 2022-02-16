import React from 'react';
import { useRecoilValue } from 'recoil';
import { todoListState } from '../recoilState';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

function TodoList() {
    //console.log("render TodoList");

    const todoList = useRecoilValue(todoListState);

    return (
        <div>
            <h3 className='my-3'>TodoList Recoil</h3>
            <TodoInput />
            {todoList.map((todo) => (
                <TodoItem todo={todo} key={todo.id} />
            ))}

        </div>
    );
}

export default TodoList;