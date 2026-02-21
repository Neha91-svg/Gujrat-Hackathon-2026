import { useContext, useState } from "react";
import { FleetContext } from "../context/FleetContext";

const Expenses = () => {
  const fleet = useContext(FleetContext);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Fuel");

  if (!fleet) return <div>Loading...</div>;

  const { expenses, addExpense, deleteExpense } = fleet;

  const addNewExpense = () => {
    if (!title || !amount) return;

    addExpense({
      id: Date.now().toString(),
      title,
      amount: Number(amount),
      category: category as any,
      date: new Date().toLocaleDateString(),
    });

    setTitle("");
    setAmount("");
  };

  const totalExpense = expenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  return (
    <div>

      <h3 className="mb-4">Expense Management</h3>

      {/* ADD EXPENSE */}
      <div className="dashboard-card mb-4">
        <h5 className="mb-3">Add Expense</h5>

        <div className="row g-3">
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Expense Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="col-md-3">
            <select
              className="form-select"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              <option>Fuel</option>
              <option>Maintenance</option>
              <option>Salary</option>
              <option>Other</option>
            </select>
          </div>

          <div className="col-md-2">
            <button
              className="btn btn-info w-100"
              onClick={addNewExpense}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* TOTAL CARD */}
      <div className="dashboard-card mb-4">
        <h5>Total Expenses</h5>
        <div className="stat-number text-danger">
          ₹ {totalExpense.toLocaleString()}
        </div>
      </div>

      {/* EXPENSE TABLE */}
      <div className="dashboard-card">

        {expenses.length === 0 ? (
          <div className="text-muted">
            No expenses recorded
          </div>
        ) : (
          <table className="table table-dark table-hover align-middle">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((e) => (
                <tr key={e.id}>
                  <td>{e.title}</td>
                  <td>
                    <span className="badge bg-info">
                      {e.category}
                    </span>
                  </td>
                  <td className="text-danger">
                    ₹ {e.amount}
                  </td>
                  <td>{e.date}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() =>
                        deleteExpense(e.id)
                      }
                    >
                      Delete
                    </button>
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