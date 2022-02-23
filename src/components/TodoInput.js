import moment from 'moment';
import { memo, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { todoListState } from '../recoilState';

function TodoInput() {
    //console.log("render TodoInput");

    const [input, setInput] = useState();
    const setTodoList = useSetRecoilState(todoListState);
    const inputRef = useRef();

    const addTodo = () => {
        setTodoList((todoList) => [
            ...todoList,

            {
                id: new Date().getTime().toString(),
                name: input,
                time: moment().format('hh:mm:ss - DD/MM/YYYY'),
                done: false
            },

        ]);

        setInput('');
        inputRef.current.focus();
    };

    return (
        <div className='d-flex my-2'>
            <input ref={inputRef} className="col form-control" type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button className='btn btn-primary mx-2' onClick={addTodo}>Add</button>

        </div>
    );
}

export default memo(TodoInput);