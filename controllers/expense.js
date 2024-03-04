const Expense = require("../models/expense");
exports.postAddExpense = async (req, res) => {
  try {
    let category = req.body.category;
    let description = req.body.description;
    let amount = req.body.amount;
    let date = req.body.date;

    let expense = new Expense({
      category: category,
      description: description,
      amount: amount,
      date: date,
      userId: req.user._id,
    });

    let result = await expense.save();

    res.status(200).json({
      expense: result,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getExpenses = async (req, res) => {
  try {
    let expenses = await Expense.find({ userId: req.user._id });
    res.status(202).json({
      expenses: expenses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong!",
    });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      message: "Expense successfully deleted.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Something went wrong!",
    });
  }
};
