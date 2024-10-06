import { useSelector } from 'react-redux';
import TodoItem from '../TodoItem/TodoItem';
import { RootState } from '../../store/store';
import { memo } from 'react';

type TodoListProps = {
  filteredTodos: TodoItem[];
  handleEdit: (item: TodoItem) => () => void;
};

export default memo(function TodoList({
  filteredTodos,
  handleEdit,
}: TodoListProps) {
  const categories = useSelector((state: RootState) => state.categories);

  return (
    <ul className="todos">
      {filteredTodos.map((item: TodoItem) => {
        const categoryColor = categories.find(
          (el) => el.category === item.category
        )?.color;

        return (
          <TodoItem
            key={item.id}
            item={item}
            categoryColor={categoryColor ? categoryColor : '#1af901'}
            handleEdit={handleEdit}
          />
        );
      })}
    </ul>
  );
});
