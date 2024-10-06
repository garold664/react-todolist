import React, { memo, useState } from 'react';
import { useMessage } from '../../context/MessageContext';
import { addCategory, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';

import classes from './AddCategory.module.css';
import { TodoInputRef } from '../AddTodo/AddTodo';
type AddCategoryProps = {
  todoInputRef: React.RefObject<TodoInputRef>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

export default memo(function AddCategory({
  todoInputRef,
  setCategory,
}: AddCategoryProps) {
  const dispatch = useDispatch();
  const [categoryColor, setCategoryColor] = useState('#1af901');
  const [newCategory, setNewCategory] = useState('');
  const { setMessage, setType } = useMessage();

  const categories = useSelector((state: RootState) => state.categories);

  function handleAddCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const existingCategory = categories.find(
      (el) => el.category === newCategory
    );
    if (existingCategory) {
      setMessage('Category already exists');
      setType('error');
      return;
    }
    dispatch(addCategory({ category: newCategory, color: categoryColor }));
    setCategory(newCategory);
    todoInputRef.current?.focus();
    setNewCategory('');
  }
  return (
    <form onSubmit={handleAddCategory} className={classes.form}>
      <input
        type="text"
        placeholder="new name"
        value={newCategory}
        onChange={(ev) => setNewCategory(ev.target.value)}
      />
      <input
        type="color"
        value={categoryColor}
        onChange={(ev) => setCategoryColor(ev.target.value)}
      />
      <button>Add new todos Category</button>
    </form>
  );
});
