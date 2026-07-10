import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#2f9e44', '#4b5563', '#f59f00', '#1f2933', '#d71920'];

export default function WasteDonutChart({ data }) {
  return (
    <div className="card chartCard">
      <div className="cardHeader">
        <h3>Waste by category</h3>
        <span>Today</span>
      </div>

      <div className="donutWrap">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={68}
              outerRadius={98}
              paddingAngle={4}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="legendGrid">
        {data.map((item, index) => (
          <div key={item.name} className="legendItem">
            <span style={{ background: COLORS[index % COLORS.length] }} />
            <p>{item.name}</p>
            <b>{item.value}</b>
          </div>
        ))}
      </div>
    </div>
  );
}
