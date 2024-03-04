import { useContext, useRef, useState } from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import styles from "./ExpenseForm.module.css";
import axios from "axios";
import ErrorMessage from "../UI/ErrorModel";
import AuthContext from "../../store/auth-context";
import ExpenseContext from "../../store/expense-context";

const ExpenseForm = () => {
  const { addExpense } = useContext(ExpenseContext);
  const [error, setError] = useState();

  const categoryRef = useRef();
  const descriptionRef = useRef();
  const amountRef = useRef();
  const dateRef = useRef();
  const { token } = useContext(AuthContext);
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    let category = categoryRef.current.value;
    let description = descriptionRef.current.value;
    let amount = amountRef.current.value;
    let date = dateRef.current.value;

    categoryRef.current.value = "";
    descriptionRef.current.value = "";
    amountRef.current.value = "";
    dateRef.current.value = "";

    if (!date) {
      date = new Date().toLocaleDateString();
    } else {
      date = new Date(date).toLocaleDateString();
    }
    if (
      category.trim().length == 0 ||
      description.trim().length == 0 ||
      amount.trim().length == 0
    ) {
      setError({
        title: "Invalid inputs.",
        message: "Please check the entries!",
      });
    } else if (amount <= 0) {
      setError({
        title: "Invalid amount.",
        message: "Enter the correct amount.",
      });
    } else {
      let obj = {
        category,
        description,
        amount,
        date,
      };

      console.log(obj);
      try {
        let res = await axios.post("http://localhost:3000/expenses", obj, {
          headers: { Authorization: token },
        });
        addExpense(res.data.expense);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && (
        <ErrorMessage
          onConfirm={errorHandler}
          title={error.title}
          message={error.message}
        ></ErrorMessage>
      )}
      <form onSubmit={formSubmitHandler}>
        <div className="container text-center">
          <div className="row">
            <div className={`col ${styles.user_input}`}>
              <label>Category</label>
            </div>
            <div className={`col ${styles.user_input}`}>
              <label>Description</label>
            </div>
            <div className={`col ${styles.user_input}`}>
              <label>Amount</label>
            </div>
            <div className={`col ${styles.user_input}`}>
              <label>Date</label>
            </div>

            <div className={`col ${styles.user_input}`}>
              <GiTakeMyMoney
                style={{ fontSize: "25px", color: "green" }}
              ></GiTakeMyMoney>
            </div>
          </div>

          <div className="row">
            <div className={`col ${styles.user_input}`}>
              <input type="text" ref={categoryRef} />
            </div>
            <div className={`col ${styles.user_input}`}>
              <input type="text" ref={descriptionRef} />
            </div>
            <div className={`col ${styles.user_input}`}>
              <input type="number" ref={amountRef} />
            </div>
            <div className={`col ${styles.user_input}`}>
              <input type="date" ref={dateRef} />
            </div>

            <div className="col">
              <button className="btn btn-primary" type="submit" style={{}}>
                Add Expense
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default ExpenseForm;
