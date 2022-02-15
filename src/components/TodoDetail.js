import moment from 'moment';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { todoListState, TODO_STORAGE } from '../recoilState';
import { updateTodoAtIndex } from './TodoItem';

function TodoDetail({ todo }) {
    console.log("render TodoDetail");

    const [todoList, setTodoList] = useRecoilState(todoListState);
    const [name, setName] = useState(todo.name);
    const [editable, setEditable] = useState(false);
    const index = todoList.findIndex((todoItem) => todoItem === todo);
    localStorage.setItem(TODO_STORAGE, JSON.stringify(todoList));
    const deleteTodoAtIndex = (todoList, index) => {
        return [...todoList.slice(0, index), ...todoList.slice(index + 1)];
    };
    const deleteTodo = () => {
        const newList = deleteTodoAtIndex(todoList, index);
        localStorage.setItem(TODO_STORAGE, JSON.stringify(newList));
        setTodoList(newList);
    };

    const updateTodo = (name) => {
        const newTodoList = updateTodoAtIndex(todoList, index, {
            ...todo,
            name: name,
            time: moment().format('hh:mm:ss - DD/MM/YYYY')
        });
        localStorage.setItem(TODO_STORAGE, JSON.stringify(newTodoList));
        setTodoList(newTodoList);
    };

    return (
        <div className='d-flex align-items-center my-3'>
            <div className='col'>
                {editable ?
                    <input type="text" className="form-control"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    :
                    <div className='d-flex justify-content-between align-items-center'>
                        <h5 className='mx-4'>{todo.name}</h5>
                        <span>{todo.time}</span>
                    </div>
                }

            </div>
            <button className="btn btn-primary m-2" onClick={() => {
                updateTodo(name)
                if (editable) {
                    setName(name);
                }
                setEditable(!editable);
            }}>{editable ? "Update" : "Edit"}</button>
            <button className="btn btn-danger m-2" onClick={deleteTodo}>Delete</button>
        </div>
    )
}

export default TodoDetail;