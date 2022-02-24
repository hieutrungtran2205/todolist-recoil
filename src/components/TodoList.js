import { useRecoilValue } from 'recoil';
import { countTodoState, getTodoAPI, todoListState } from '../recoilState';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

function TodoList() {
    //console.log("render TodoList");
    const todoList = useRecoilValue(todoListState);
    const totalTodo = useRecoilValue(countTodoState);
    const data = useRecoilValue(getTodoAPI);
    console.log("data in todoList:", data);
    return (
        <div>
            <h3 className='my-3'>TodoList Recoil</h3>
            <TodoInput />
            <p>Total todo: {totalTodo}</p>
            {todoList.map((todo) => (
                <TodoItem todo={todo} key={todo.id} />
            ))}
            <h3>TodoList get from API</h3>
            {data.map(item => (
                <div key={item.id} className='d-flex justify-content-between'>
                    <p>ID: {item.id}</p>
                    <p>{item.title}</p>
                    <p>Completed: {item.completed.toString()}</p>
                </div>
            ))}
        </div>
    );
}

export default TodoList;