import { useState } from "react";

function Applications({ applications, setApplications }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    package: "",
  });

  const handleDelete = (id) => {
    setApplications((currentApplications) =>
      currentApplications.filter((application) => application.id !== id),
    );
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId !== null) {
      // Update existing application
      setApplications(
        applications.map((application) =>
          application.id === editingId
            ? {
                ...application,
                company: formData.company,
                role: formData.role,
                status: formData.status,
                package: formData.package,
              }
            : application,
        ),
      );

      setEditingId(null);
    } else {
      // Add new application
      const newApplication = {
        id: Date.now(),
        company: formData.company,
        role: formData.role,
        status: formData.status,
        package: formData.package,
      };

      setApplications([...applications, newApplication]);
    }

    setFormData({
      company: "",
      role: "",
      status: "Applied",
      package: "",
    });

    setShowForm(false);
  };

  const handleEdit = (application) => {
    setEditingId(application.id);

    setFormData({
      company: application.company,
      role: application.role,
      status: application.status,
      package: application.package,
    });

    setShowForm(true);
  };
  const filteredApplications = applications.filter((application) => {
    const matchesSearch = application.company
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || application.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="dashboard">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Applications</h1>
          <p className="dashboard-subtitle">Track all your job applications.</p>
        </div>

        <button className="add-button" onClick={() => setShowForm(true)}>
          + Add Application
        </button>
      </div>
      {/* Add Application Form */}
      {showForm && (
        <form className="application-form" onSubmit={handleSubmit}>
          <h2>{editingId !== null ? "Edit Application" : "Add Application"}</h2>

          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="role"
            placeholder="Job Role"
            value={formData.role}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="package"
            placeholder="Package (e.g. 7 LPA)"
            value={formData.package}
            onChange={handleChange}
            required
          />

          <select name="status" value={formData.status} onChange={handleChange}>
            <option>Applied</option>
            <option>Interview</option>
            <option>Selected</option>
            <option>Rejected</option>
          </select>

          <div className="form-buttons">
            <button
              type="button"
              className="cancel-button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>

            <button type="submit" className="save-button">
              Save Application
            </button>
          </div>
        </form>
      )}
      {/* Search and Filter */}
      <div className="application-controls">
        <input
          type="text"
          placeholder="Search company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option>All</option>
          <option>Applied</option>
          <option>Interview</option>
          <option>Selected</option>
          <option>Rejected</option>
        </select>
      </div>

      {/* Applications Table */}
      <div className="application-table">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Package</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredApplications.map((application) => (
              <tr key={application.id}>
                <td>{application.company}</td>
                <td>{application.role}</td>
                <td>
                  <span className="status">{application.status}</span>
                </td>

                <td>{application.package}</td>
                <td>
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => handleEdit(application)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleDelete(application.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default Applications;
