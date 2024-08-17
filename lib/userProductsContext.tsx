'use client'
import React, { createContext, useContext, useReducer } from "react";
import { ProductItem } from "./items";


type State = {
  products: ProductItem[]
}

type Action = { type: 'ADD_PRODUCT', product: ProductItem } | { type: 'REMOVE_PRODUCT', index: number }

const initialState: State = {
  products: []
}


function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.product] }
    case 'REMOVE_PRODUCT':
      return { ...state, products: state.products.splice(action.index, 1) }
    default:
      return state
  }
}

const DEFAULT_CONTEXT_VALUE = {
  state: {
    products: []
  },
  dispatch() {
    throw new Error('Dispatch not implemented. useProducts must be used within UserProductsContext')
  }
}

export const UserProductsContext = createContext<{ state: State; dispatch: React.Dispatch<Action> }>(DEFAULT_CONTEXT_VALUE)

export function UserProductsContextProvider(props: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UserProductsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserProductsContext.Provider>
  )
}