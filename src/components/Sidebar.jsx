function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">
      <h3>Menu</h3>

      <ul>
        <li
          className={activePage === "dashboard" ? "active-menu" : ""}
          onClick={() => setActivePage("dashboard")}
        >
          🏠 Dashboard
        </li>

        <li
          className={activePage === "applications" ? "active-menu" : ""}
          onClick={() => setActivePage("applications")}
        >
          💼 Applications
        </li>

        <li
          className={activePage === "interviews" ? "active-menu" : ""}
          onClick={() => setActivePage("interviews")}
        >
          📅 Interviews
        </li>

        <li
          className={activePage === "preparation" ? "active-menu" : ""}
          onClick={() => setActivePage("preparation")}
        >
          📚 Preparation
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
