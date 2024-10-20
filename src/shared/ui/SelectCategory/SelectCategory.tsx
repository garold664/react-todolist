import classes from './SelectCategory.module.css';

type SelectCategoryProps = {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  categories: Category[];
  categoryName: string;
  allCategory?: boolean;
};

export default function SelectCategory({
  onChange,
  categories,
  categoryName,
  allCategory = false,
}: SelectCategoryProps) {
  return (
    <select
      name=""
      value={categoryName}
      onChange={onChange}
      className={classes.select}
      style={{
        color: categories.find((el) => el.category === categoryName)?.color,
      }}
    >
      {allCategory && <option value="all">All</option>}
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
  );
}
