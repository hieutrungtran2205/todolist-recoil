import { useRecoilState } from 'recoil';
import { deleteTodoAtIndex } from '../components/TodoItem';
import { todoListState } from '../recoilState';

function useDeleteTodo(todo) {
    const [todoList, setTodoList] = useRecoilState(todoListState);
    const index = todoList.findIndex((todoItem) => todoItem.id === todo.id);
    return () => {
        const newTodoList = deleteTodoAtIndex(todoList, index);
        setTodoList(newTodoList);
    };
}

export default useDeleteTodo;