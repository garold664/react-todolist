import { CheckIcon, XIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../shared/ui/Button/Button';
import SelectCategory from '../../shared/ui/SelectCategory/SelectCategory';
import selectCategories from '../../store/selectors/selectCategories';
import { changeTodo } from '../../store/store';

import { useEffect, useRef, useState } from 'react';
import classes from './EditTodoForm.module.css';

type EditTodoFormProps = {
  setEditedId: React.Dispatch<React.SetStateAction<number | null>>;
  item: TodoItem;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};
export default function EditTodoForm({
  setEditedId,
  item,
  category,
  setCategory,
}: EditTodoFormProps) {
  console.log('EDITTODOFORM');
  const [todoText, setTodoText] = useState(item.todo);
  const dispatch = useDispatch();
  const todoRef = useRef<HTMLInputElement>(null);
  const categories = useSelector(selectCategories);
  const handleTodoOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('TODO CHANGE: ', e.target.value);
    setTodoText(e.target.value);
  };

  const handleSubmitTodoChange = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('Todo Change Submit: ', todoText);
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

  const handleDiscardTodoChange = () => {
    setEditedId(null);
    setTodoText(item.todo);
    setCategory(item.category);
  };

  const handleCategoryChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('INPUT CHANGE: ', ev.target.value);
    setCategory(ev.target.value);
  };

  useEffect(() => {
    todoRef.current?.focus();
  }, [todoRef]);

  if (!item) {
    return <div>Not found</div>;
  }
  return (
    <form className={classes.editForm} onSubmit={handleSubmitTodoChange}>
      <input
        ref={todoRef}
        type="text"
        value={todoText}
        data-testid="todo-input"
        onChange={handleTodoOnChange}
        onKeyDown={(e) => {
          console.log('key: ', e.key);
          console.log('shift: ', e.shiftKey);
          console.log('ctrl: ', e.ctrlKey);
        }}
      />
      <SelectCategory
        onChange={handleCategoryChange}
        categories={categories}
        categoryName={category}
      />
      <Button>
        <CheckIcon aria-label="Save the todo" />
      </Button>
      <Button type="button" onClick={handleDiscardTodoChange}>
        <XIcon aria-label="Discard the change" />
      </Button>
    </form>
  );
}
