import moment from 'moment';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { todoIdState, todoListState } from '../recoilState';

export const deleteTodoAtIndex = (todoList, index) => {
    return [...todoList.slice(0, index), ...todoList.slice(index + 1)];
};

export const updateTodoAtIndex = (arr, index, newValue) => {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};

function TodoItem({ todo }) {
    console.log("render TodoItem");

    const [todoList, setTodoList] = useRecoilState(todoListState);
    const [name, setName] = useState(todo.name);
    const [editable, setEditable] = useState(false);
    const index = todoList.findIndex((todoItem) => todoItem === todo);
    const setDetail = useSetRecoilState(todoIdState);
    const deleteTodo = () => {
        const newTodoList = deleteTodoAtIndex(todoList, index);

        setTodoList(newTodoList);
    };

    const updateTodo = (name) => {
        const newTodoList = updateTodoAtIndex(todoList, index, {
            ...todo,
            name: name,
            time: moment().format('hh:mm:ss - DD/MM/YYYY')
        });

        setTodoList(newTodoList);
    };

    return (
        <div className='d-flex align-items-center my-3'>
            <div className='stt'>#</div>
            <div className='col'>
                {editable ?
                    <input type="text" className="form-control"
                        value={name}
                        onChange={
                            (e) => {
                                setName(e.target.value);
                            }
                        }
                    />
                    :
                    <Link to={todo.id} className='d-flex justify-content-between align-items-center text-decoration-none text-dark'
                        onClick={() => setDetail(todo.id)}>
                        <h5 className='mx-4'>{todo.name}</h5>
                        <span>{todo.time}</span>
                    </Link>
                }

            </div>
            <button className="btn btn-primary m-2"
                onClick={() => {
                    updateTodo(name)
                    if (editable) {
                        setName(name)
                    }
                    setEditable(!editable);
                }}
            >{editable ? "Update" : "Edit"}</button>
            <button className="btn btn-danger m-2" onClick={deleteTodo}>Delete</button>
        </div>
    );
}

export default TodoItem;