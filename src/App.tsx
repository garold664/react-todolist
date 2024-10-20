import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, RootState } from './store/store';

import './App.css';
import AddCategory from './components/AddCategory/AddCategory';
import AddTodo, { TodoInputRef } from './components/AddTodo/AddTodo';
import TodoList from './components/TodoList/TodoList';
import SelectCategory from './shared/ui/SelectCategory/SelectCategory';
import selectCategories from './store/selectors/selectCategories';

export default function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const categories = useSelector(selectCategories);

  const [text, setText] = useState('');
  const [category, setCategory] = useState(categories[0].category);
  const [currentCategory, setCurrentCategory] = useState('all');

  const [filteredTodos, setFilteredTodos] = useState(todos);
  const todoInputRef = useRef<TodoInputRef>(null);

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (text.trim() === '') {
      return;
    }
    dispatch(addTodo({ todo: text, category, id: Date.now() }));

    setCategory(categories[0].category);
    setText('');
  };

  useEffect(() => {
    if (todoInputRef.current) {
      todoInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (currentCategory !== 'all') {
      setFilteredTodos(todos.filter((el) => el.category === currentCategory));
    } else {
      setFilteredTodos(todos);
    }
  }, [currentCategory, todos]);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <h2>Start adding your tasks</h2>
      <AddTodo
        addTodo={handleAddTodo}
        text={text}
        category={category}
        setCategory={setCategory}
        setText={setText}
        ref={todoInputRef}
      />
      <div className="flex">
        <p>Show category: </p>
        <SelectCategory
          onChange={(ev) => setCurrentCategory(ev.target.value)}
          categories={categories}
          categoryName={currentCategory}
          allCategory
        />
      </div>
      <TodoList
        filteredTodos={filteredTodos}
        setFilteredTodos={setFilteredTodos}
      />
      <AddCategory todoInputRef={todoInputRef} setCategory={setCategory} />
    </div>
  );
}
