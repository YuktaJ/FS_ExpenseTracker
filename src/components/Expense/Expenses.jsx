import { useContext } from "react";
import ExpenseItem from "./ExpenseItem";
import ExpenseContext from "../../store/expense-context";
const Expenses = () => {
  const { items } = useContext(ExpenseContext);
  return (
    <>
      <table class="table">
        <thead>
          <tr class="table-dark">
            <th scope="col">Category</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <ExpenseItem
              category={item.category}
              description={item.description}
              amount={item.amount}
              date={item.date}
              expense = {item}
            ></ExpenseItem>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Expenses;
