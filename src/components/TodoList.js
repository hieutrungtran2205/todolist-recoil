import { useRecoilValue } from 'recoil';
import { countTodoState, todoListState } from '../recoilState';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

function TodoList() {
    //console.log("render TodoList");
    const todoList = useRecoilValue(todoListState);
    const totalTodo = useRecoilValue(countTodoState);

    return (
        <div>
            <h3 className='my-3'>TodoList Recoil</h3>
            <TodoInput />
            <p>Total todo: {totalTodo}</p>
            {todoList.map((todo) => (
                <TodoItem todo={todo} key={todo.id} />
            ))}

        </div>
    );
}

export default TodoList;