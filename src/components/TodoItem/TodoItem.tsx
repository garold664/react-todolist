import { GripIcon, PencilIcon } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import selectCategories from '../../store/selectors/selectCategories';
import selectItem from '../../store/selectors/selectItem';
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
  const item = useSelector(selectItem(itemId)) as TodoItem;
  console.log(' item: ', item);
  const [category, setCategory] = useState(() => item.category);
  const categories = useSelector(selectCategories);
  const categoryColor = getCategoryColor(category);

  function getCategoryColor(category: string) {
    return categories.find((el) => el.category === category)?.color;
  }

  const handleTodoEdit = () => {
    setEditedId(item.id);
  };

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
