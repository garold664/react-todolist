import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pencil } from 'lucide-react';
import { ACTIONS } from './store/store';

import './App.css';

export default function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const categories = useSelector((state) => state.categories);

  const [text, setText] = useState('');
  const [category, setCategory] = useState(categories[0].category);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [categoryColor, setCategoryColor] = useState('#1af901');
  const [editStatus, setEditStatus] = useState('Add new Todo');
  const [currentItemId, setCurrentItemId] = useState(null);
  const [newCategory, setNewCategory] = useState('');
  const [filteredTodos, setFilteredTodos] = useState(todos);

  const nameInputRef = useRef();

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (currentCategory !== 'all') {
      setFilteredTodos(todos.filter((el) => el.category === currentCategory));
    } else {
      setFilteredTodos(todos);
    }
  }, [currentCategory]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <select
        name=""
        value={category}
        onChange={(ev) => setCategory(ev.target.value)}
        ref={nameInputRef}
        style={{
          color: categories.find((el) => el.category === category).color,
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
      />
      <br />
      <button
        onClick={() => {
          if (editStatus === 'Add new Todo') {
            dispatch({
              type: ACTIONS.ADD_TODO,
              payload: { todo: text, id: 5, category },
            });
          }

          if (editStatus === 'Edit the todo') {
            dispatch({
              type: ACTIONS.CHANGE_TODO,
              payload: { todo: text, id: currentItemId, category },
            });
          }

          setCategory(categories[0].category);
          setText('');
          setEditStatus('Add new Todo');
          setCurrentItemId(null);
          // nameInputRef.current.focus();
          // console.log(todos);
        }}
      >
        {editStatus}
      </button>
      <br />
      <br />
      <br />
      <br />
      <p>Show: </p>
      <select
        name=""
        value={currentCategory}
        onChange={(ev) => setCurrentCategory(ev.target.value)}
        ref={nameInputRef}
        style={{
          color: categories.find((el) => el.category === category).color,
        }}
      >
        <option value="all">All categories</option>
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
      <ul className="todos">
        {filteredTodos.map((item) => {
          const categoryColor = categories.find(
            (el) => el.category === item.category
          ).color;
          return (
            <li key={item.id} style={{ color: categoryColor }}>
              <b>{item.category}:</b> <span>{item.todo}</span>
              <button
                className="edit"
                onClick={() => {
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
      <button
        onClick={() =>
          dispatch({
            type: ACTIONS.ADD_CATEGORY,
            payload: {
              category: newCategory,
              color: categoryColor,
            },
          })
        }
      >
        Add new todos Category
      </button>
    </div>
  );
}
