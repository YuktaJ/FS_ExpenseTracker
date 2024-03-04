import { useEffect, useState } from "react";
import ExpenseContext from "./expense-context";
import axios from "axios";

const ExpenseContextProvider = (props) => {
  const [items, setItems] = useState([]);

  const addExpenseHandler = (expense) => {
    setItems([...items, expense]);
  };

  const deleteExpenseHandler = (expense) => {
    let filterArr = items.filter((item) => {
      return item._id.toString() != expense._id.toString();
    });
    deleteExpense(expense._id);
    setItems(filterArr);
  };

  const deleteExpense = async (id) => {
    try {
      let token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/expenses/${id}`, {
        headers: { Authorization: token },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getExpenses();
    }
  }, []);
  
  const getExpenses = async () => {
    try {
      let token = localStorage.getItem("token");
      let result = await axios.get("http://localhost:3000/expenses", {
        headers: { Authorization: token },
      });
      setItems(result.data.expenses);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ExpenseContext.Provider
      value={{
        items: items,
        addExpense: addExpenseHandler,
        deleteExpense: deleteExpenseHandler,
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContextProvider;
