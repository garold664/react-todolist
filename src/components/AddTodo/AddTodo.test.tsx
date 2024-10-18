import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { useSelector } from 'react-redux';
import type { Mock } from 'vitest';
import { vi } from 'vitest';
import AddTodo, { TodoInputRef } from './AddTodo'; // Adjust path to your component

// Mock useSelector to simulate redux state
vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
}));

describe('AddTodo Component', () => {
  const mockCategories = [
    { category: 'Work', color: 'blue' },
    { category: 'Personal', color: 'green' },
  ];

  beforeEach(() => {
    (useSelector as unknown as Mock).mockReturnValue(mockCategories);
  });

  test('renders the AddTodo form with initial values', () => {
    const addTodo = vi.fn();
    const setCategory = vi.fn();
    const setText = vi.fn();
    const editStatus = 'Add Todo';

    render(
      <AddTodo
        addTodo={addTodo}
        category="Work"
        setCategory={setCategory}
        text=""
        setText={setText}
        editStatus={editStatus}
      />
    );

    expect(screen.getByTestId('text-input')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: editStatus })
    ).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  test('selects the correct category and changes input text', async () => {
    const addTodo = vi.fn();
    const setCategory = vi.fn();
    const setText = vi.fn();
    const editStatus = 'Edit Todo';

    let category = 'Personal';
    let text = 'Buy groceries';

    const { rerender } = render(
      <AddTodo
        addTodo={addTodo}
        category={category}
        setCategory={setCategory}
        text={text}
        setText={setText}
        editStatus={editStatus}
      />
    );

    expect(screen.getByRole('combobox')).toHaveValue('Personal');

    await userEvent.selectOptions(screen.getByRole('combobox'), 'Work');
    expect(setCategory).toHaveBeenCalledWith('Work');
    category = 'Work';
    rerender(
      <AddTodo
        addTodo={addTodo}
        category={category}
        setCategory={setCategory}
        text={text}
        setText={setText}
        editStatus={editStatus}
      />
    );
    expect(screen.getByRole('combobox')).toHaveValue('Work');

    fireEvent.change(screen.getByTestId('text-input'), {
      target: { value: 'New todo' },
    });
    expect(setText).toHaveBeenCalledWith('New todo');

    text = 'New todo';
    rerender(
      <AddTodo
        addTodo={addTodo}
        category={category}
        setCategory={setCategory}
        text={text}
        setText={setText}
        editStatus={editStatus}
      />
    );
    expect(screen.getByTestId('text-input')).toHaveValue('New todo');
  });

  test('submits the form correctly', () => {
    const addTodo = vi.fn((e) => e.preventDefault());
    const setCategory = vi.fn();
    const setText = vi.fn();
    const editStatus = 'Add Todo';

    render(
      <AddTodo
        addTodo={addTodo}
        category="Work"
        setCategory={setCategory}
        text="Finish project"
        setText={setText}
        editStatus={editStatus}
      />
    );

    fireEvent.submit(screen.getByTestId('add-todo-form'));
    expect(addTodo).toHaveBeenCalledTimes(1);
  });

  test('calls focus method on ref', () => {
    const addTodo = vi.fn();
    const setCategory = vi.fn();
    const setText = vi.fn();
    const editStatus = 'Add Todo';
    const inputRef = React.createRef<TodoInputRef>();

    render(
      <AddTodo
        addTodo={addTodo}
        category="Work"
        setCategory={setCategory}
        text=""
        setText={setText}
        editStatus={editStatus}
        ref={inputRef}
      />
    );

    inputRef.current?.focus();
    expect(screen.getByRole('textbox')).toHaveFocus();
  });
});
