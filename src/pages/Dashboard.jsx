import StatCard from "../components/StatCard";

function Dashboard({ applications }) {
  const totalApplications = applications.length;

  const interviews = applications.filter(
    (application) => application.status === "Interview",
  ).length;

  const selected = applications.filter(
    (application) => application.status === "Selected",
  ).length;

  const rejected = applications.filter(
    (application) => application.status === "Rejected",
  ).length;
  return (
    <main className="dashboard">
      <h1>Welcome to PlacementPro 👋</h1>

      <p className="dashboard-subtitle">
        Track your placement journey in one place.
      </p>

      <div className="stats-container">
        <StatCard
  title="Total Applications"
  value={totalApplications}
/>

<StatCard
  title="Interviews"
  value={interviews}
/>

<StatCard
  title="Selected"
  value={selected}
/>

<StatCard
  title="Rejected"
  value={rejected}
/>
      </div>
    </main>
  );
}

export default Dashboard;
