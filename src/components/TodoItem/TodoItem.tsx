import { CheckIcon, GripIcon, PencilIcon, XIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectCategory from '../../shared/ui/SelectCategory/SelectCategory';
import selectCategories from '../../store/selectors/selectCategories';
import selectItem from '../../store/selectors/selectItem';
import { changeTodo } from '../../store/store';
import classes from './TodoItem.module.css';
type TodoItemProps = {
  itemId: number;
  isEdited: boolean;
  setEditedId: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function TodoItem({
  itemId,
  isEdited,
  setEditedId,
}: TodoItemProps) {
  const dispatch = useDispatch();
  const item = useSelector(selectItem(itemId)) as TodoItem;
  const categories = useSelector(selectCategories);

  const [todoText, setTodoText] = useState(item.todo);
  const [category, setCategory] = useState(() => item.category);

  const categoryColor = getCategoryColor(category);
  const todoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdited) {
      todoRef.current?.focus();
    } else {
      setTodoText(item.todo);
    }
  }, [isEdited, item.todo]);

  const handleTodoEdit = () => {
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
    setTodoText(todoText);
    dispatch(
      changeTodo({
        todo: todoText,
        category,
        id: item.id,
      })
    );
  };

  function getCategoryColor(category: string) {
    return categories.find((el) => el.category === category)?.color;
  }

  const handleDiscardTodoChange = () => {
    setEditedId(null);
    setTodoText(item.todo);
    setCategory(item.category);
  };

  const handleCategoryChange = (ev: React.ChangeEvent<HTMLSelectElement>) =>
    setCategory(ev.target.value);

  if (!item) {
    return <div>Not found</div>;
  }

  return (
    <li
      draggable
      key={item.id}
      className={classes.todo}
      id={item.id.toString()}
    >
      <span data-grip className={classes.grip} style={{ color: categoryColor }}>
        <GripIcon />
      </span>
      <b>{item.category}:</b>
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
          <SelectCategory
            onChange={handleCategoryChange}
            categories={categories}
            categoryName={category}
            // categoryColor={categoryColor}
          />
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
