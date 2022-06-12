import { useState } from "react";
import { useForm } from "react-hook-form";

const AddHero = (setHeroes, heroes) => {
  const { register, handleSubmit, errors } = useForm();
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    ingredients: [],
    instructions: [],
    servings: 0,
    cookTime: "",
    category: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (data) => {
    setHeroes((heroes) => [...heroes, data]);
    console.log(data);
  };
  return (
    <form onSubmit={() => handleSubmit(onSubmit)}>
      <label>Hero Name:</label>
      <input
        type="text"
        name="title"
        placeholder="Hero-Name"
        ref={register}
        onChange={(e) => handleChange(e)}
      />
      <label>Hero Powers:</label>
      <input
        type="text"
        name="description"
        placeholder="Hero-Power"
        onChange={(e) => handleChange(e)}
        ref={register}
      />
      <label>Hero Bio:</label>
      <textarea type="text" />
      <input type="submit" />
    </form>
  );
};

export default AddHero;
