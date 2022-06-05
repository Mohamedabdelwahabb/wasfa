import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import React, { useReducer } from "react";
import { useCollection } from "../hooks/useCollection";
import { db } from "../util/firebase";

const ShoppingCart = () => {
  const initialState = {
    items: [],
  };

  const reducer = (state, action) => {
    let updatedState;
    switch (action.type) {
      // Let users add items to cart
      case "add":
        updatedState = {
          ...state,
          items: [...state.items, action.payload],
        };
        state.input = "";

        return updatedState;

      // Let users delete items they don't need
      case "delete":
        let filteredState = {
          ...state,
          items: [...state.items].filter((x, ind) => {
            console.log(x);

            return ind !== action.payload;
          }),
        };

        return filteredState;
      // Let users create input
      case "input":
        return {
          ...state,
          input: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [cart, loading] = useCollection("ShoppingCart");

  const { items, input } = state;
  console.log(items);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "add",
      payload: {
        title: state.input,
        complete: false,
      },
    });
  };
  console.log(state);
  const handleChange = (e) => {
    dispatch({
      type: "input",
      payload: e.target.value,
    });
  };

  return (
    <div className="container">
      <h1>Shopping Cart</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} />
      </form>
      <div>
        {state &&
          items?.map((item, index) => (
            <div key={index} className="flex">
              <div>
                {index + 1}. {item.title}
              </div>
              <div>
                <button
                  onClick={() => dispatch({ type: "delete", payload: index })}
                >
                  x
                </button>
              </div>
              <button
                onClick={
                  (() => addDoc(db, "ShoppingCart"),
                  {
                    dta: "data",
                  })
                }
              >
                save to data
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShoppingCart;
