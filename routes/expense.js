const express = require("express");
const router = express.Router();

const userAuthentication = require("../middlewares/auth");
const expenseController = require("../controllers/expense");

router.post(
  "/expenses",
  userAuthentication.authenticate,
  expenseController.postAddExpense
);

router.get(
  "/expenses",
  userAuthentication.authenticate,
  expenseController.getExpenses
);

router.delete(
  "/expenses/:id",
  userAuthentication.authenticate,
  expenseController.deleteExpense
);
module.exports = router;
