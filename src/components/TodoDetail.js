import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { todoListState } from '../recoilState';

function TodoDetail({ todo }) {
    const [todoList, setTodoList] = useRecoilState(todoListState);
    const [name, setName] = useState(todo.name);
    const [editable, setEditable] = useState(false);
    const index = todoList.findIndex((todoItem) => todoItem === todo);
    localStorage.setItem("todoRecoil", JSON.stringify(todoList));
    const deleteTodoAtIndex = (todoList, index) => {
        return [...todoList.slice(0, index), ...todoList.slice(index + 1)];
    };
    const deleteTodo = () => {
        const newList = deleteTodoAtIndex(todoList, index);
        localStorage.setItem("todoRecoil", JSON.stringify(newList));
        setTodoList(newList);
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
                if (editable) {
                    setName(todo.name);
                }
                setEditable(!editable);
            }}>{editable ? "Update" : "Edit"}</button>
            <button className="btn btn-danger m-2" onClick={deleteTodo}>Delete</button>
        </div>
    )
}

export default TodoDetail;