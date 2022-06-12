import React from "react";
import { useForm } from "react-hook-form";

export default function Planner() {
  const { register, handleSubmit } = useForm({
    shouldUseNativeValidation: true,
  });
  const onSubmit = async (data) => {
    console.log(data);
  };
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
  // title: "",
  //         image: "",
  //         description: "",
  //         ingredients: [],
  //         instructions: [],
  //         servings: 0,
  //         cookTime: "",
  //         category: ""
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Title</label>
      <input type="text" {...register("title")} />
      <label>Title</label>
      <input type="file" {...register("title")} />
      <label>Description</label>
      <input type="text" {...register("description")} />
      <label>Cook Time</label>
      <input type="number" {...register("cookTime")} />
      <label>Servings</label>
      <input type="number" {...register("servings")} />
      <select {...register("category")}>
        {categories.map((value, i) => (
          <option key={i} value={value}>
            {value}
          </option>
        ))}
      </select>
      <input type="submit" />
    </form>
  );
}

// export default function App() {
//   const onSubmit = data => console.log(data);

//   return (
//     <Form onSubmit={onSubmit}>
//       <Input name="firstName" />
//       <Input name="lastName" />

//       <Input type="submit" value="Submit" />
//     </Form>
//   );
// }
