import { RootState } from '../store';

const selectCategories = (state: RootState) => state.categories;
export default selectCategories;
