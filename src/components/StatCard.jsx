// Matlab hum same component ko different data ke saath reuse kar sakte hain.
function StatCard({ title, value }) { //title and value props hai.-> above line
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}

export default StatCard;