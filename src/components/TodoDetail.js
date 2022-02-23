import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { colorDoneState, todoIdState, todoListState } from '../recoilState';
import { deleteTodoAtIndex, updateTodoAtIndex } from './TodoItem';
import moment from 'moment';

function TodoDetail() {
    //console.log("render TodoDetail");

    const todoId = useRecoilValue(todoIdState);
    const [todoList, setTodoList] = useRecoilState(todoListState);
    const index = todoList.findIndex((todoItem) => todoItem.id === todoId);
    const [name, setName] = useState(todoList[index].name);
    const [editable, setEditable] = useState(false);
    const [done, setDone] = useState(todoList[index].done);
    const [color, setColor] = useRecoilState(colorDoneState(todoList[index].id));
    const DoneButton = () => {
        const isDone = () => {
            const newTodoList = updateTodoAtIndex(todoList, index, {
                ...todoList[index],
                done: !done
            });
            setTodoList(newTodoList);

            if (done) {
                setColor(color);
                setDone(!done)
            } else {
                setColor("green")
                setDone(!done)
            }
        };
        return <button className="btn btn-success m-2" onClick={isDone}>Done</button>
    }

    const deleteTodo = () => {
        const newTodoList = deleteTodoAtIndex(todoList, index);
        setTodoList(newTodoList);
    };

    const updateTodo = (name) => {
        const newTodoList = updateTodoAtIndex(todoList, index, {
            ...todoList[index],
            name: name,
            time: moment().format('hh:mm:ss - DD/MM/YYYY'),
        });

        setTodoList(newTodoList);
    };

    return (
        <div className='d-flex align-items-center my-3' style={done ? { background: "green" } : {}}>
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
                        <h5 className='mx-4'>{todoList[index].name}</h5>
                        <span>{todoList[index].time}</span>
                    </div>
                }

            </div>
            <DoneButton />
            <button className="btn btn-primary" onClick={() => {
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