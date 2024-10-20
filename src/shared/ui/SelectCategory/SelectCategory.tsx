type SelectCategoryProps = {
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  categories: Category[];
  categoryName: string;
  categoryColor?: string;
};

export default function SelectCategory({
  onChange,
  categories,
  categoryName,
  categoryColor,
}: SelectCategoryProps) {
  return (
    <select
      name=""
      value={categoryName}
      onChange={onChange}
      style={{
        color:
          categoryColor ||
          categories.find((el) => el.category === categoryName)?.color,
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
  );
}
