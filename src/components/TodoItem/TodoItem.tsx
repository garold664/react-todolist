import { GripIcon, PencilIcon } from 'lucide-react';
import classes from './TodoItem.module.css';
type TodoItemProps = {
  item: TodoItem;
  handleEdit: (item: TodoItem) => () => void;
  categoryColor: string;
};

console.log(classes.grip);

export default function TodoItem({
  item,
  handleEdit,
  categoryColor,
}: TodoItemProps) {
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
      <b>{item.category}:</b> <span>{item.todo}</span>
      <button className={classes.edit} onClick={handleEdit(item)}>
        <PencilIcon />
      </button>
    </li>
  );
}
