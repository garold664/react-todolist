import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pencil } from 'lucide-react';
import { addCategory, addTodo, changeTodo, RootState } from './store/store';

import './App.css';
import { useMessage } from './context/MessageContext';

export default function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const categories = useSelector((state: RootState) => state.categories);

  const [text, setText] = useState('');
  const [category, setCategory] = useState(categories[0].category);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [categoryColor, setCategoryColor] = useState('#1af901');
  const [editStatus, setEditStatus] = useState('Add new Todo');
  const [currentItemId, setCurrentItemId] = useState<number | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const [filteredTodos, setFilteredTodos] = useState(todos);
  const { setMessage, setType } = useMessage();
  const todoInputRef = useRef<HTMLInputElement>(null);

  function handleAddCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const existingCategory = categories.find(
      (el) => el.category === newCategory
    );
    if (existingCategory) {
      setMessage('Category already exists');
      setType('error');
      return;
    }
    dispatch(addCategory({ category: newCategory, color: categoryColor }));
    setCategory(newCategory);
    todoInputRef.current?.focus();
    setNewCategory('');
  }

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
      <form
        action=""
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          console.log('submit');
          if (editStatus === 'Add new Todo') {
            dispatch(addTodo({ todo: text, category, id: Date.now() }));
          }
          if (editStatus === 'Edit the todo') {
            dispatch(changeTodo({ todo: text, category, id: currentItemId }));
          }
          setCategory(categories[0].category);
          setText('');
          setEditStatus('Add new Todo');
          setCurrentItemId(null);
        }}
      >
        <select
          name=""
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
          style={{
            color: categories.find((el) => el.category === category)?.color,
          }}
        >
          {categories.map((category) => (
            <option
              value={category.category}
              style={{ color: category.color }}
              key={category.category}
            >
              {category.category}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="text"
          ref={todoInputRef}
        />
        <br />
        <button>{editStatus}</button>
      </form>
      <br />
      <br />
      <br />
      <br />
      <p>Show: </p>
      <select
        name=""
        value={currentCategory}
        onChange={(ev) => setCurrentCategory(ev.target.value)}
        style={{
          color: categories.find((el) => el.category === category)?.color,
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
      <ul className="todos">
        {filteredTodos.map((item) => {
          const categoryColor = categories.find(
            (el) => el.category === item.category
          )?.color;
          return (
            <li key={item.id} style={{ color: categoryColor }}>
              <b>{item.category}:</b> <span>{item.todo}</span>
              <button
                className="edit"
                onClick={() => {
                  todoInputRef.current?.focus();
                  setEditStatus('Edit the todo');
                  setCategory(item.category);
                  setText(item.todo);
                  setCurrentItemId(item.id);
                }}
              >
                <Pencil />
              </button>
            </li>
          );
        })}
      </ul>

      <form onSubmit={handleAddCategory}>
        <input
          type="text"
          placeholder="new name"
          value={newCategory}
          onChange={(ev) => setNewCategory(ev.target.value)}
        />
        <input
          type="color"
          value={categoryColor}
          onChange={(ev) => setCategoryColor(ev.target.value)}
        />
        <button>Add new todos Category</button>
      </form>
    </div>
  );
}
