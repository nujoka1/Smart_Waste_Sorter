import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function WeeklyTrendChart({ data }) {
  return (
    <div className="card">
      <div className="cardHeader">
        <h3>Weekly trend</h3>
        <span>Items sorted</span>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="day" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip />
          <Bar dataKey="items" radius={[6, 6, 0, 0]} fill="#d71920" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
