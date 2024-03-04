import { createContext } from "react";

const defaultContext = {
  items: [],
  addExpense: () => {},
  deleteExpense: () => {},
};

const ExpenseContext = createContext(defaultContext);

export default ExpenseContext;
