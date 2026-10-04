// function App() { // app naam ka react component create kiya
//   return (
//     <div>
//       <h1>PlacementPro</h1>
//       <p>Job & Placement Management Dashboard</p>
//     </div>
//   );
// }

// export default App;

//STEP 2
// import "./App.css";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./pages/Dashboard";

// function App() {
//   return (
//     <div className="app">
//       <Navbar />

//       <div className="main-layout">
//         <Sidebar />
//         <Dashboard />
//       </div>
//     </div>
//   );
// }

// export default App;

//STEP 3 TEMPORARY DIYA HAI {Applications.jsx check krne ke liyea}
// import "./App.css";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import Applications from "./pages/Applications";
// import Dashboard from "./pages/Dashboard";

// function App() {
//   return (
//     <div className="app">
//       <Navbar />

//       <div className="main-layout">
//         <Sidebar />
//         <Applications />

//       </div>
//     </div>
//   );
// }

// export default App;

import { useState, useEffect } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Applications from "./pages/Applications";
import Dashboard from "./pages/Dashboard";
import Interviews from "./pages/Interviews";
import Preparation from "./pages/Preparation.jsx";

function App() {
  const [applications, setApplications] = useState(() => {
    const savedApplications = localStorage.getItem("applications");

    if (savedApplications) {
      return JSON.parse(savedApplications);
    }

    return [
      {
        id: 1,
        company: "TCS",
        role: "Software Engineer",
        status: "Applied",
        package: "7 LPA",
      },
      {
        id: 2,
        company: "Infosys",
        role: "System Engineer",
        status: "Interview",
        package: "6.5 LPA",
      },
      {
        id: 3,
        company: "Wipro",
        role: "Developer",
        status: "Rejected",
        package: "5 LPA",
      },
    ];
  });

  const [activePage, setActivePage] = useState("dashboard");
  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);
  return (
    <div className="app">
      <Navbar />

      <div className="main-layout">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        {activePage === "dashboard" && (
          <Dashboard applications={applications} />
        )}

        {activePage === "applications" && (
          <Applications
            applications={applications}
            setApplications={setApplications}
          />
        )}
        {activePage === "interviews" && <Interviews />}
        {activePage === "preparation" && <Preparation />}
      </div>
    </div>
  );
}

export default App;
