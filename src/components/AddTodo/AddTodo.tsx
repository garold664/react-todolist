import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { forwardRef, useImperativeHandle, useRef } from 'react';

type AddTodoProps = {
  addTodo: (event: React.FormEvent<HTMLFormElement>) => void;
  category: string;
  setCategory: (category: string) => void;
  text: string;
  setText: (text: string) => void;
  editStatus: string;
};

export type TodoInputRef = { focus: () => void };

export default forwardRef<TodoInputRef, AddTodoProps>(function AddTodo(
  { addTodo, category, setCategory, text, setText, editStatus },
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
  return (
    <form action="" onSubmit={addTodo}>
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
      <input
        type="text"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="text"
        ref={todoInputRef}
      />
      <br />
      <button>{editStatus}</button>
    </form>
  );
});
