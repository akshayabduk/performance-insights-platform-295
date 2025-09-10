import React, { useEffect, useState } from 'react';
import { getAnalyticsOverview } from '../api/client';
import TrendChart from '../components/Charts/TrendChart';
import DepartmentBarChart from '../components/Charts/DepartmentBarChart';

// PUBLIC_INTERFACE
export default function Dashboard() {
  /** Main dashboard with KPIs and analytics charts. */
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getAnalyticsOverview();
        setOverview(data);
      } catch (e) {
        setOverview(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const kpis = [
    { label: 'Avg Score', value: overview?.kpis?.avgScore ?? 78, accent: true },
    { label: 'Top Performers', value: overview?.kpis?.topPerformers ?? 12 },
    { label: 'At Risk', value: overview?.kpis?.atRisk ?? 3 },
    { label: 'Reviews This Month', value: overview?.kpis?.reviewsThisMonth ?? 45 }
  ];

  return (
    <div className="stack">
      <div className="grid grid-4">
        {kpis.map((k) => (
          <div key={k.label} className={`card kpi ${k.accent ? 'accent' : ''}`}>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
          </div>
        ))}
      </div>

      {loading && <div className="card">Loading analytics...</div>}

      {!loading && (
        <div className="grid grid-2">
          <TrendChart data={overview?.trend} />
          <DepartmentBarChart data={overview?.departments} />
        </div>
      )}
    </div>
  );
}
