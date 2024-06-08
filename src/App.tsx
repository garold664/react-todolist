import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pencil } from 'lucide-react';
import { ACTIONS } from './store/store';

export default function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  const categories = useSelector((state) => state.categories);

  const [text, setText] = useState('');
  const [category, setCategory] = useState(categories[0].category);
  const [categoryColor, setCategoryColor] = useState('#1af901');
  const [editStatus, setEditStatus] = useState('Send');
  const [currentItemId, setCurrentItemId] = useState(null);
  const [newCategory, setNewCategory] = useState('');

  const nameInputRef = useRef();

  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

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
          <option value={category.category} style={{ color: category.color }}>
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
          if (editStatus === 'Send') {
            dispatch({
              type: ACTIONS.ADD_MESSAGE,
              payload: { todo: text, id: 5, category: name },
            });
          }

          if (editStatus === 'Edit') {
            dispatch({
              type: ACTIONS.CHANGE_MESSAGE,
              payload: { todo: text, id: currentItemId, category: name },
            });
          }

          setCategory('');
          setText('');
          setEditStatus('Send');
          setCurrentItemId(null);
          // nameInputRef.current.focus();
          console.log(todos);
        }}
      >
        {editStatus}
      </button>
      <ul>
        {todos.map((item) => {
          const categoryColor = categories.find(
            (el) => el.category === item.category
          ).color;
          return (
            <li key={item.id}>
              <b style={{ color: categoryColor }}>{item.category}</b>:{' '}
              <span>{item.todo}</span>
              <button
                onClick={() => {
                  setEditStatus('Edit');
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
            type: 'ADD-NAME',
            payload: {
              category: newCategory,
              color: categoryColor,
            },
          })
        }
      >
        Add new name
      </button>
      {categoryColor}
    </div>
  );
}
