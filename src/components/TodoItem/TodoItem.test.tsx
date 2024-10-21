import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../../store/store';
import TodoItem from './TodoItem';

const store = createReduxStore({
  categories: [{ category: 'TestCategory345', color: '#1af901', id: 1 }],
  todos: [
    {
      category: 'TestCategory345',
      todo: 'TestTodo345',
      id: 1,
      completed: false,
    },
  ],
});
const item = store.getState().todos[0];

let rerender = (ui: ReactNode) => {
  console.log(ui);
};

describe('TodoItem Component', () => {
  beforeEach(() => {
    ({ rerender } = render(
      <Provider store={store}>
        <TodoItem itemId={item.id} setEditedId={() => {}} isEdited={false} />
      </Provider>
    ));
  });
  test('renders the TodoItem component', async () => {
    const todoSpan = screen.getByTestId('todo-text');
    expect(todoSpan).toHaveTextContent(item.todo);
    const categorySpan = screen.getByText(/testCategory345/i);
    expect(categorySpan).toHaveTextContent(item.category);

    const editButton = screen.getByRole('button', { name: 'Edit the todo' });
    expect(editButton).toBeInTheDocument();
  });

  test('calls focus method on input when Editing', async () => {
    const editButton = screen.getByRole('button', { name: 'Edit the todo' });
    fireEvent.click(editButton);
    rerender(
      <Provider store={store}>
        <TodoItem itemId={item.id} setEditedId={() => {}} isEdited={true} />
      </Provider>
    );
    // screen.debug();
    const todoInput = await screen.findByTestId('todo-input');
    expect(todoInput).toBeInTheDocument();
    expect(todoInput).toHaveFocus();
  });

  test('changes todo text when editing', async () => {
    const editButton = screen.getByRole('button', { name: 'Edit the todo' });
    const item = store.getState().todos[0];
    fireEvent.click(editButton);
    rerender(
      <Provider store={store}>
        <TodoItem itemId={item.id} setEditedId={() => {}} isEdited={true} />
      </Provider>
    );
    const todoInput = await screen.findByTestId('todo-input');

    await userEvent.clear(todoInput);
    await userEvent.type(todoInput, 'newTodo');

    expect(await screen.findByTestId('todo-input')).toHaveValue('newTodo');
    await userEvent.type(todoInput, '{enter}');

    rerender(
      <Provider store={store}>
        <TodoItem itemId={item.id} setEditedId={() => {}} isEdited={false} />
      </Provider>
    );

    const todoSpan = await screen.findByTestId('todo-text');
    expect(todoSpan).toHaveTextContent(/newTodo/i);
  });
});
