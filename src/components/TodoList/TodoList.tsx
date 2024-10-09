import { useSelector } from 'react-redux';
import TodoItem from '../TodoItem/TodoItem';
import { RootState } from '../../store/store';
import { memo, useRef } from 'react';

type TodoListProps = {
  filteredTodos: TodoItem[];
  setFilteredTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  handleEdit: (item: TodoItem) => () => void;
};

export default memo(function TodoList({
  filteredTodos,
  setFilteredTodos,
  handleEdit,
}: TodoListProps) {
  const categories = useSelector((state: RootState) => state.categories);
  const draggedElement = useRef<EventTarget | null>(null);
  const draggedOverElement = useRef<EventTarget | null>(null);
  const clickedElement = useRef<EventTarget | null>(null);

  function handleMouseDown(event: React.MouseEvent<HTMLUListElement>) {
    clickedElement.current = event.target;
  }

  function isNotGripElement() {
    return (
      clickedElement.current instanceof Element &&
      !clickedElement.current?.closest('span')?.dataset.grip
    );
  }

  function handleDragStart(event: React.DragEvent<HTMLUListElement>) {
    if (isNotGripElement()) {
      event.preventDefault();
      return;
    }

    draggedElement.current = event.target;
    if (!(draggedElement.current instanceof HTMLElement)) return;
    draggedElement.current.dataset.dragged = 'true';
  }

  function handleDragEnd(event: React.DragEvent<HTMLUListElement>) {
    if (isNotGripElement()) {
      event.preventDefault();
      return;
    }
    if (!(draggedElement.current instanceof HTMLElement)) return;
    delete draggedElement.current.dataset.dragged;
    draggedElement.current = null;
    if (!(draggedOverElement.current instanceof HTMLElement)) return;
    delete draggedOverElement.current.dataset.draggedOver;
    draggedOverElement.current = null;
  }

  function handleDragOver(event: React.DragEvent<HTMLUListElement>) {
    event.preventDefault();

    draggedOverElement.current = event.target;
    if (
      !(draggedOverElement.current instanceof HTMLElement) ||
      !(draggedElement.current instanceof HTMLElement)
    )
      return;
    if (draggedOverElement.current.id === draggedElement.current.id) return;
    if (draggedOverElement.current.dataset.draggedOver) return;
    if (draggedOverElement.current.nodeName !== 'LI') return;
    draggedOverElement.current.dataset.draggedOver = 'true';
    const currentId = Number(draggedOverElement.current.id);
    setFilteredTodos((prevTodos) => {
      const activeTodo = prevTodos.find((todo) => {
        if (!(draggedElement.current instanceof HTMLElement)) return undefined;
        return todo.id === Number(draggedElement.current?.id);
      });
      const currentTodoIndex = prevTodos.findIndex(
        (todo) => todo.id === Number(currentId)
      );

      if (!activeTodo) return prevTodos;

      const newTodos = prevTodos.filter((todo) => todo.id !== activeTodo.id);
      newTodos.splice(currentTodoIndex, 0, activeTodo);
      return newTodos;
    });
  }

  function handleDragLeave(event: React.DragEvent<HTMLUListElement>) {
    event.preventDefault();
    if (!draggedOverElement.current) return;
    if (!(draggedOverElement.current instanceof HTMLElement)) return;
    delete draggedOverElement.current.dataset.draggedOver;
    draggedOverElement.current = null;
  }

  return (
    <ul
      className="todos"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onMouseDown={handleMouseDown}
    >
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
