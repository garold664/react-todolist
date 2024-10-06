import { PencilIcon } from 'lucide-react';
import classes from './TodoItem.module.css';
type TodoItemProps = {
  item: TodoItem;
  handleEdit: (item: TodoItem) => () => void;
  categoryColor: string;
};

export default function TodoItem({
  item,
  handleEdit,
  categoryColor,
}: TodoItemProps) {
  return (
    <li key={item.id} className={classes.todo} style={{ color: categoryColor }}>
      <b>{item.category}:</b> <span>{item.todo}</span>
      <button className={classes.edit} onClick={handleEdit(item)}>
        <PencilIcon />
      </button>
    </li>
  );
}
