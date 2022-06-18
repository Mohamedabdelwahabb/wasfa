const categories = [
  "breakfast",
  "lunch",
  "dinner",
  "snacks",
  "appetizers",
  "sweets",
  "holiday",
  "soups",
];
export const categoryOptions = categories.map((category) => {
  return (
    <option key={category} value={category}>
      {category}
    </option>
  );
});
