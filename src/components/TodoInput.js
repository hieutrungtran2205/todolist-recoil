import React, { memo, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { todoListState } from '../recoilState';
import moment from 'moment';

function TodoInput() {
    console.log("render TodoInput");

    const [input, setInput] = useState();
    const setTodoList = useSetRecoilState(todoListState);
    const addTodo = () => {
        setTodoList((todoList) => [
            ...todoList,

            {
                id: new Date().getTime().toString(),
                name: input,
                time: moment().format('hh:mm:ss - DD/MM/YYYY')
            },

        ]);

        setInput('');
    };

    return (
        <div className='d-flex my-2'>
            <input className="col form-control" type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button className='btn btn-primary mx-2' onClick={addTodo}>Add</button>

        </div>
    );
}

export default memo(TodoInput);