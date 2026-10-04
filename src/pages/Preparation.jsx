import { useState, useEffect } from "react";

function Preparation() {
  const [topics, setTopics] = useState(() => {
    const savedTopics = localStorage.getItem("preparationTopics");

    if (savedTopics) {
      return JSON.parse(savedTopics);
    }

    return [
      {
        id: 1,
        subject: "DSA",
        progress: 70,
      },
      {
        id: 2,
        subject: "DBMS",
        progress: 60,
      },
      {
        id: 3,
        subject: "Operating Systems",
        progress: 50,
      },
      {
        id: 4,
        subject: "Computer Networks",
        progress: 40,
      },
      {
        id: 5,
        subject: "Aptitude",
        progress: 65,
      },
      {
        id: 6,
        subject: "React",
        progress: 55,
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("preparationTopics", JSON.stringify(topics));
  }, [topics]);

  const increaseProgress = (id) => {
    setTopics(
      topics.map((topic) =>
        topic.id === id
          ? {
              ...topic,
              progress: Math.min(topic.progress + 10, 100),
            }
          : topic,
      ),
    );
  };

  return (
    <main className="dashboard">
      <div className="page-header">
        <div>
          <h1>Preparation</h1>

          <p className="dashboard-subtitle">
            Track your placement preparation progress.
          </p>
        </div>
      </div>

      <div className="preparation-grid">
        {topics.map((topic) => (
          <div className="preparation-card" key={topic.id}>
            <h2>{topic.subject}</h2>

            <p>Progress: {topic.progress}%</p>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${topic.progress}%`,
                }}
              ></div>
            </div>

            <button
              className="progress-button"
              onClick={() => increaseProgress(topic.id)}
            >
              +10% Progress
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Preparation;
