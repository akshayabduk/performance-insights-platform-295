import React from 'react';
import PropTypes from 'prop-types';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

// PUBLIC_INTERFACE
export default function TrendChart({ data }) {
  /** Line chart displaying performance scores over time. */
  const chartData = data && data.length > 0 ? data : [
    { date: 'Jan', score: 72 },
    { date: 'Feb', score: 75 },
    { date: 'Mar', score: 78 },
    { date: 'Apr', score: 74 },
    { date: 'May', score: 80 }
  ];
  return (
    <div className="card">
      <div className="card-title">Performance Trend</div>
      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#00BFAE" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

TrendChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ date: PropTypes.any, score: PropTypes.number }))
};

TrendChart.defaultProps = {
  data: []
};
