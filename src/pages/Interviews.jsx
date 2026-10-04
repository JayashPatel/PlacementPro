import { useState, useEffect } from "react";

function Interviews() {
  const [showForm, setShowForm] = useState(false);

  const [interviews, setInterviews] = useState(() => {
    const savedInterviews = localStorage.getItem("interviews");

    if (savedInterviews) {
      return JSON.parse(savedInterviews);
    }

    return [
      {
        id: 1,
        company: "Infosys",
        date: "2026-10-10",
        round: "Technical",
        notes: "Prepare Java and DSA",
      },
      {
        id: 2,
        company: "TCS",
        date: "2026-10-15",
        round: "HR",
        notes: "Prepare introduction",
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("interviews", JSON.stringify(interviews));
  }, [interviews]);

  const [formData, setFormData] = useState({
    company: "",
    date: "",
    round: "Technical",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newInterview = {
      id: Date.now(),
      company: formData.company,
      date: formData.date,
      round: formData.round,
      notes: formData.notes,
    };

    setInterviews([...interviews, newInterview]);

    setFormData({
      company: "",
      date: "",
      round: "Technical",
      notes: "",
    });

    setShowForm(false);
  };

  return (
    <main className="dashboard">
      <div className="page-header">
        <div>
          <h1>Interviews</h1>

          <p className="dashboard-subtitle">Manage your upcoming interviews.</p>
        </div>

        <button className="add-button" onClick={() => setShowForm(true)}>
          + Add Interview
        </button>
      </div>

      {showForm && (
        <form className="application-form" onSubmit={handleSubmit}>
          <h2>Add Interview</h2>

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <select name="round" value={formData.round} onChange={handleChange}>
            <option>Technical</option>
            <option>HR</option>
            <option>Aptitude</option>
            <option>Managerial</option>
          </select>

          <input
            type="text"
            name="notes"
            placeholder="Interview Notes"
            value={formData.notes}
            onChange={handleChange}
          />

          <div className="form-buttons">
            <button
              type="button"
              className="cancel-button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>

            <button type="submit" className="save-button">
              Save Interview
            </button>
          </div>
        </form>
      )}

      <div className="application-table">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Date</th>
              <th>Round</th>
              <th>Notes</th>
            </tr>
          </thead>

          <tbody>
            {interviews.map((interview) => (
              <tr key={interview.id}>
                <td>{interview.company}</td>

                <td>{interview.date}</td>

                <td>{interview.round}</td>

                <td>{interview.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Interviews;
