const expenseForm = document.getElementById("expense-form");
const expenseNameInput = document.getElementById("expense-name");
const expenseAmountInput = document.getElementById("expense-amount");
const expenseList = document.getElementById("expense-list");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function renderExpenses() {
    expenseList.innerHTML = ""; 
    expenses.forEach((expense, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${expense.name} - $${expense.amount}
        <button onclick="deleteExpense(${index})">Delete</button>
        <button onclick="editExpense(${index})">Edit</button>
      `;
      expenseList.appendChild(li); 
    });
  }

expenseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value);

  if (name && amount) {
    expenses.push({ name, amount });
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
    expenseForm.reset();
  }
});

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

function editExpense(index) {
  const expense = expenses[index];
  expenseNameInput.value = expense.name;
  expenseAmountInput.value = expense.amount;
  deleteExpense(index);
}
renderExpenses();
