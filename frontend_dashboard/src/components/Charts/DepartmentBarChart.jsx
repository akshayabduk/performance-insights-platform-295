import React from 'react';
import PropTypes from 'prop-types';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// PUBLIC_INTERFACE
export default function DepartmentBarChart({ data }) {
  /** Bar chart displaying average performance by department/category. */
  const chartData = data && data.length > 0 ? data : [
    { name: 'Sales', avg: 78 },
    { name: 'Engineering', avg: 84 },
    { name: 'HR', avg: 76 },
    { name: 'Support', avg: 71 }
  ];

  return (
    <div className="card">
      <div className="card-title">Department Averages</div>
      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="avg" fill="#003366" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

DepartmentBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string, avg: PropTypes.number }))
};

DepartmentBarChart.defaultProps = {
  data: []
};
