import 'bootstrap/dist/css/bootstrap.css';
import { Route, Routes } from 'react-router';
import { useRecoilValue } from 'recoil';
import TodoDetail from './components/TodoDetail';
import TodoList from './components/TodoList';
import { todoListState } from './recoilState';

function App() {
  const todoList = useRecoilValue(todoListState);
  localStorage.setItem("todoRecoil", JSON.stringify(todoList));
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
