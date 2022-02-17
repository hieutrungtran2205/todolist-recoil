import { Route, Routes } from 'react-router';
import { useRecoilValue } from 'recoil';
import TodoDetail from './components/TodoDetail';
import TodoList from './components/TodoList';
import { todoListState, TODO_STORAGE } from './recoilState';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const todoList = useRecoilValue(todoListState);
  localStorage.setItem(TODO_STORAGE, JSON.stringify(todoList));

  return (
    <div className="App m-5">
      <Routes>
        <Route path='/' element={<TodoList />} />
        {todoList.map((todo) => { return <Route path={todo.id} element={<TodoDetail todo={todo} />} key={todo.id} /> })}
      </Routes>

    </div>
  );
}

export default App;
