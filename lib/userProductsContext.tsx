"use client";
import React, { createContext, useReducer } from "react";
import { ProductItem } from "./items/types";

type State = {
  products: ProductItem[];
};

type Action =
  | { type: "ADD_PRODUCT"; product: ProductItem }
  | { type: "REMOVE_PRODUCT"; index: number }
  | { type: "UPDATE_PRODUCT"; index: number; product: ProductItem };

const initialState: State = Object.freeze({
  products: [],
});

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.product] };
    case "REMOVE_PRODUCT":
      return { ...state, products: state.products.splice(action.index, 1) };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.splice(action.index, 1, action.product),
      };
    default:
      console.warn(`Unexpected action: ${action}`);
      return state;
  }
}

const DEFAULT_CONTEXT_VALUE = {
  state: {
    products: [],
  },
  dispatch() {
    throw new Error(
      "Dispatch not implemented. useProducts must be used within UserProductsContext",
    );
  },
};

export const UserProductsContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>(DEFAULT_CONTEXT_VALUE);

export function UserProductsContextProvider(props: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserProductsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserProductsContext.Provider>
  );
}
