import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import TodoItem from './TodoItem';

const item = {
  id: 1,
  todo: 'testTodo#134',
  category: 'testCategory#09845',
};

let rerender = (ui: ReactNode) => {
  console.log(ui);
};

describe('TodoItem Component', () => {
  beforeEach(() => {
    ({ rerender } = render(
      <Provider store={store}>
        <TodoItem
          item={item}
          categoryColor={'#1af901'}
          setEditedId={() => {}}
          isEdited={false}
        />
      </Provider>
    ));
  });
  test('renders the TodoItem component', async () => {
    // screen.debug();
    const todoSpan = screen.getByTestId('todo-text');
    expect(todoSpan).toHaveTextContent(/testTodo#134/i);

    const categorySpan = screen.getByText(/testCategory#09845/i);
    expect(categorySpan).toHaveTextContent(/testCategory#09845/i);

    const editButton = screen.getByRole('button', { name: 'Edit the todo' });
    expect(editButton).toBeInTheDocument();
  });

  test('calls focus method on input when Editing', async () => {
    const editButton = screen.getByRole('button', { name: 'Edit the todo' });
    fireEvent.click(editButton);
    // screen.debug();
    const todoInput = await screen.findByTestId('todo-input');
    expect(todoInput).toBeInTheDocument();
    expect(todoInput).toHaveFocus();
  });

  test('changes todo text when editing', async () => {
    const editButton = screen.getByRole('button', { name: 'Edit the todo' });
    fireEvent.click(editButton);
    let todoInput = await screen.findByTestId('todo-input');

    fireEvent.change(todoInput, { target: { value: 'newTodo' } });
    expect(todoInput).toHaveValue('newTodo');
    todoInput = await screen.findByTestId('todo-input');
    expect(todoInput).toHaveValue('newTodo');

    userEvent.type(todoInput, '{enter}');

    await screen.findByTestId('todo-text');
    const item = store.getState().todos[0];
    console.log(item);
    rerender(
      <Provider store={store}>
        <TodoItem
          item={item}
          categoryColor={'#1af901'}
          setEditedId={() => {}}
          isEdited={false}
        />
      </Provider>
    );

    const todoSpan = await screen.findByTestId('todo-text');
    expect(todoSpan).toHaveTextContent(/newTodo/i);
  });
});
