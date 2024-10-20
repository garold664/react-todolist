import { CheckIcon, XIcon } from 'lucide-react';
import SelectCategory from '../../shared/ui/SelectCategory/SelectCategory';
import { changeTodo } from '../../store/store';

export default function EditTodoForm() {
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
  );
}
