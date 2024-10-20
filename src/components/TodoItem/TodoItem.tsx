import { CheckIcon, GripIcon, PencilIcon, XIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store, { changeTodo, RootState } from '../../store/store';
import classes from './TodoItem.module.css';
type TodoItemProps = {
  item: TodoItem;
  categoryColor: string;
  isEdited: boolean;
  setEditedId: React.Dispatch<React.SetStateAction<number | null>>;
};

// console.log(classes.grip);

export default function TodoItem({
  item,
  categoryColor,
  isEdited,
  setEditedId,
}: TodoItemProps) {
  const dispatch = useDispatch();
  // const [isEditing, setIsEditing] = useState(false);

  const [todoText, setTodoText] = useState(item.todo);
  const [category, setCategory] = useState(() => item.category);
  const todoRef = useRef<HTMLInputElement>(null);

  const categories = useSelector((state: RootState) => state.categories);

  useEffect(() => {
    if (isEdited) {
      todoRef.current?.focus();
    } else {
      setTodoText(item.todo);
      console.log(store.getState().todos[0]);
    }
  }, [isEdited, item.todo]);

  const handleTodoEdit = () => {
    // setIsEditing(true);
    setEditedId(item.id);
  };

  const handleTodoOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTodoText(e.target.value);

  const handleSubmitTodoChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEditedId(null);
    if (
      todoText.trim() === '' ||
      (todoText === item.todo && category === item.category)
    ) {
      return;
    }
    // setIsEditing(false);
    setTodoText(todoText);
    console.log('submit: ', category);
    dispatch(
      changeTodo({
        todo: todoText,
        category,
        id: item.id,
      })
    );
  };

  const handleDiscardTodoChange = () => {
    setEditedId(null);
    setTodoText(item.todo);
  };

  return (
    <li
      draggable
      key={item.id}
      className={classes.todo}
      id={item.id.toString()}
      // style={{ color: categoryColor }}
    >
      <span data-grip className={classes.grip} style={{ color: categoryColor }}>
        <GripIcon />
      </span>
      <b>{item.category}:</b>{' '}
      {!isEdited && <span data-testid="todo-text">{item.todo}</span>}
      {isEdited && (
        <form className={classes.editForm} onSubmit={handleSubmitTodoChange}>
          <input
            ref={todoRef}
            type="text"
            value={todoText}
            data-testid="todo-input"
            onChange={handleTodoOnChange}
          />
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
          <button className={classes.edit}>
            <CheckIcon aria-label="Save the todo" />
          </button>
          <button
            className={classes.edit}
            type="button"
            onClick={handleDiscardTodoChange}
          >
            <XIcon aria-label="Discard the change" />
          </button>
        </form>
      )}
      {!isEdited && (
        <button className={classes.edit} onClick={handleTodoEdit} type="button">
          <PencilIcon aria-label="Edit the todo" />
        </button>
      )}
    </li>
  );
}
