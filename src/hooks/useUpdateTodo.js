import { useRecoilState } from 'recoil';
import { updateTodoAtIndex } from '../components/TodoItem';
import { todoListState } from '../recoilState';
import moment from 'moment';

function useUpdateTodo(todo) {
    const [todoList, setTodoList] = useRecoilState(todoListState);
    const index = todoList.findIndex((todoItem) => todoItem.id === todo.id);
    return (name) => {
        const newTodoList = updateTodoAtIndex(todoList, index, {
            ...todo,
            name: name,
            time: moment().format('hh:mm:ss - DD/MM/YYYY')
        });
        setTodoList(newTodoList);
    };
}

export default useUpdateTodo;