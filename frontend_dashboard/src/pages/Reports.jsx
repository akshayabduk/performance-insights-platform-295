import React, { useState } from 'react';
import { getPerformanceHistory } from '../api/client';
import { exportCSV, exportPDF } from '../utils/export';

// PUBLIC_INTERFACE
export default function Reports() {
  /** Generate and export reports to CSV or PDF for a selected date range. */
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    const params = {};
    if (from) params.from = from;
    if (to) params.to = to;
    const data = await getPerformanceHistory(params);
    return data?.items || data || [];
  }

  async function onExportCSV() {
    setLoading(true);
    try {
      const rows = await fetchData();
      exportCSV(rows, 'report.csv');
    } finally {
      setLoading(false);
    }
  }

  async function onExportPDF() {
    setLoading(true);
    try {
      const rows = await fetchData();
      exportPDF('Report', rows, 'report.pdf');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="stack">
      <div className="card">
        <div className="card-title">Export Reports</div>
        <div className="filters">
          <label className="field">
            <span>From</span>
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          </label>
          <label className="field">
            <span>To</span>
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </label>
          <button type="button" className="btn-primary" onClick={onExportCSV} disabled={loading}>
            {loading ? 'Please wait...' : 'Export CSV'}
          </button>
          <button type="button" className="btn-secondary" onClick={onExportPDF} disabled={loading}>
            {loading ? 'Please wait...' : 'Export PDF'}
          </button>
        </div>
        <div className="muted">Select a date range to export performance data.</div>
      </div>
    </div>
  );
}
