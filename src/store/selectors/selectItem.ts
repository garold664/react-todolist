import { RootState } from '../store';

const selectItem = (itemId: number) => (state: RootState) =>
  state.todos.find((el) => el.id === itemId);
export default selectItem;
