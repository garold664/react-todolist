import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, RootState } from './store/store';

import './App.css';
import AddCategory from './components/AddCategory/AddCategory';
import AddTodo, { TodoInputRef } from './components/AddTodo/AddTodo';
import TodoList from './components/TodoList/TodoList';
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
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <AddTodo
        addTodo={handleAddTodo}
        text={text}
        category={category}
        setCategory={setCategory}
        setText={setText}
        ref={todoInputRef}
      />
      <p>Show: </p>
      <select
        name=""
        value={currentCategory}
        onChange={(ev) => setCurrentCategory(ev.target.value)}
        style={{
          color: categories.find((el) => el.category === currentCategory)
            ?.color,
        }}
      >
        <option value="all">All categories</option>
        {categories.map((category) => (
          <option
            value={category.category}
            style={{ color: category.color }}
            key={category.category}
          >
            {category.category} Category
          </option>
        ))}
      </select>
      <TodoList
        filteredTodos={filteredTodos}
        setFilteredTodos={setFilteredTodos}
      />
      <AddCategory todoInputRef={todoInputRef} setCategory={setCategory} />
    </div>
  );
}
