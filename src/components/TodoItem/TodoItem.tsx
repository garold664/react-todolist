import { GripIcon, PencilIcon } from 'lucide-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import selectCategories from '../../store/selectors/selectCategories';
import selectItem from '../../store/selectors/selectItem';
import { toggleCompleted } from '../../store/store';
import EditTodoForm from '../EditTodoForm/EditTodoForm';
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
  console.log(' item: ', item);
  const [category, setCategory] = useState(() => item.category);
  const [completed, setCompleted] = useState(() => item.completed);
  const categories = useSelector(selectCategories);
  const categoryColor = getCategoryColor(category);

  function getCategoryColor(category: string) {
    return categories.find((el) => el.category === category)?.color;
  }

  const handleTodoEdit = () => {
    setEditedId(item.id);
  };

  const handleToggleCompleted = () => {
    // setCompleted(!completed);
    dispatch(toggleCompleted({ id: item.id }));
  };

  return (
    <li
      draggable
      key={item.id}
      className={`${classes.todo} ${item.completed ? classes.completed : ''}`}
      id={item.id.toString()}
    >
      <input
        type="checkbox"
        checked={item.completed}
        onChange={handleToggleCompleted}
      />
      <span data-grip className={classes.grip} style={{ color: categoryColor }}>
        <GripIcon />
      </span>
      <b>{category}:</b>
      {!isEdited && <span data-testid="todo-text">{item.todo}</span>}
      {isEdited && (
        <EditTodoForm
          setEditedId={setEditedId}
          item={item}
          category={category}
          setCategory={setCategory}
        />
      )}
      {!isEdited && (
        <button className={classes.edit} onClick={handleTodoEdit} type="button">
          <PencilIcon aria-label="Edit the todo" />
        </button>
      )}
    </li>
  );
}
