import { useContext, useState } from "react";
import { FleetContext } from "../context/FleetContext";

const Expenses = () => {
  const fleet = useContext(FleetContext);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Fuel");

  if (!fleet) return <div>Loading...</div>;

  const { expenses, addExpense, deleteExpense } = fleet;

  const handleAddExpense = async () => {
    if (!title || !amount) return;
    await addExpense({ title, amount: Number(amount), category, date: new Date().toLocaleDateString() });
    setTitle(""); setAmount(""); setCategory("Fuel");
  };

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="container my-4">
      <h3 className="mb-4 text-primary">Expense Management</h3>

      {/* Add Expense */}
      <div className="card p-3 mb-4 shadow-sm d-flex flex-wrap gap-2">
        <input
          className="form-control text-white bg-dark"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          className="form-control text-white bg-dark"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <select className="form-select bg-dark text-white" value={category} onChange={e => setCategory(e.target.value)}>
          <option>Fuel</option>
          <option>Maintenance</option>
          <option>Salary</option>
          <option>Other</option>
        </select>
        <button className="btn btn-primary" onClick={handleAddExpense}>Add Expense</button>
      </div>

      {/* Total Expenses */}
      <div className="card p-3 mb-4 shadow-sm">
        <h5>Total Expenses: <span className="text-danger">₹ {totalExpense.toLocaleString()}</span></h5>
      </div>

      {/* Expenses Table */}
      <div className="card p-3 shadow-sm table-responsive">
        {expenses.length === 0 ? <p>No expenses recorded</p> : (
          <table className="table table-hover table-striped align-middle">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(e => (
                <tr key={e._id}>
                  <td>{e.title}</td>
                  <td>{e.category}</td>
                  <td>₹ {e.amount}</td>
                  <td>{e.date}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteExpense(e._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Expenses;