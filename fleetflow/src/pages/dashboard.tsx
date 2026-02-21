const Dashboard = () => {
  return (
    <div className="row g-4">

      <div className="col-md-3">
        <div className="dashboard-card">
          <h6>Active Fleet</h6>
          <div className="stat-number text-info">142</div>
          <small className="text-success">+12 since yesterday</small>
        </div>
      </div>

      <div className="col-md-3">
        <div className="dashboard-card">
          <h6>Maintenance Alerts</h6>
          <div className="stat-number text-warning">8</div>
          <small>3 critical priorities</small>
        </div>
      </div>

      <div className="col-md-3">
        <div className="dashboard-card">
          <h6>Utilization Rate</h6>
          <div className="stat-number text-success">86.4%</div>
          <small>+2.1% vs last month</small>
        </div>
      </div>

      <div className="col-md-3">
        <div className="dashboard-card">
          <h6>Pending Cargo</h6>
          <div className="stat-number text-primary">24</div>
          <small>Awaiting assignment</small>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;