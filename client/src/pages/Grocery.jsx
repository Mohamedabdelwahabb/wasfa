import "../styles/grocery.css";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { useFirestore } from "../hooks/useFirestore";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Speech from "../components/speech/Speech";

const ShoppingCart = (props) => {
  const { addDocument } = useFirestore("ShoppingCart");
  const [name, setName] = useState("");

  const [items, setItems] = useState([]);
  const add = (e) => {
    e.preventDefault();
    if (!name) {
      return;
    }
    setItems((items) => [
      ...items,
      {
        complete: false,
        name,
      },
    ]);
    setName("");
  };

  const remove = (index) => {
    setItems((items) => items.filter((_, i) => i !== index));
  };
  const handleChange = (e) => {
    setItems({ ...items, [e.target.name]: e.target.value });
  };

  const handleAddButtonClick = () => {
    const newItem = {
      name: name,
      complete: false,
    };

    const newItems = [...items, newItem];

    setItems(newItems);
    setName("");
  };

  const toggleComplete = (index) => {
    const newItems = [...items];

    newItems[index].complete = !newItems[index].complete;

    setItems(newItems);
  };

  return (
    <div className="app-background">
      <div className="main-container">
        <Form onSubmit={add}>
          <Form.Group>
            <br />
            <Form.Label className="form-label">Grocery List</Form.Label>

            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <div id="ingredients-buttons">
              <button className="ingredient-btn" id="add" type="submit">
                Add
              </button>
            </div>
            <br />
          </Form.Group>
        </Form>
        <div className="item-list">
          {items.reverse().map((item, index) => (
            <div className="item-container" key={index}>
              <div className="item-name">
                <span>{item.name}</span>
                <button
                  style={{ color: "white" }}
                  onClick={() => remove(index)}
                >
                  remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        style={{ color: "red" }}
        onClick={() => addDocument({ ...items, Timestamp })}
      >
        save to data base
      </button>
      <Speech />
    </div>
  );
};
export default ShoppingCart;
