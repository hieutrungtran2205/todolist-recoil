import 'bootstrap/dist/css/bootstrap.css';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { useRecoilValue } from 'recoil';
import TodoDetail from './components/TodoDetail';
import TodoList from './components/TodoList';
import { todoListState, TODO_STORAGE } from './recoilState';

function App() {
  const todoList = useRecoilValue(todoListState);
  localStorage.setItem(TODO_STORAGE, JSON.stringify(todoList));

  return (
    <div className="App m-5">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<TodoList />} />
          {todoList.map((todo) => { return <Route path={todo.id} element={<TodoDetail todo={todo} />} key={todo.id} /> })}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
