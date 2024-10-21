import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useSelector } from 'react-redux';
import SelectCategory from '../../shared/ui/SelectCategory/SelectCategory';
import { RootState } from '../../store/store';

type AddTodoProps = {
  addTodo: (event: React.FormEvent<HTMLFormElement>) => void;
  category: string;
  setCategory: (category: string) => void;
  text: string;
  setText: (text: string) => void;
};

export type TodoInputRef = { focus: () => void };

export default forwardRef<TodoInputRef, AddTodoProps>(function AddTodo(
  { addTodo, category, setCategory, text, setText },
  ref
) {
  const categories = useSelector((state: RootState) => state.categories);
  const todoInputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(
    ref,
    () => {
      return {
        focus: () => todoInputRef.current?.focus(),
      };
    },
    []
  );

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
  };
  return (
    <form action="" onSubmit={addTodo} data-testid="add-todo-form">
      <SelectCategory
        categoryName={category}
        onChange={handleCategoryChange}
        categories={categories}
      />
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="text"
        data-testid="text-input"
        ref={todoInputRef}
      />
      <br />
      <button>Add Todo</button>
    </form>
  );
});
