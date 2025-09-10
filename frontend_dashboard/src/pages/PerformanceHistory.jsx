import React, { useEffect, useState } from 'react';
import { getPerformanceHistory } from '../api/client';
import { exportCSV, exportPDF } from '../utils/export';

// PUBLIC_INTERFACE
export default function PerformanceHistory() {
  /** Performance history listing with filters and export (CSV/PDF). */
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  async function load() {
    try {
      setLoading(true);
      const params = {};
      if (query) params.q = query;
      if (from) params.from = from;
      if (to) params.to = to;
      const data = await getPerformanceHistory(params);
      setItems(data?.items || data || []);
    } catch (e) {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onExportCSV() {
    if (!items.length) return;
    exportCSV(items, 'performance-history.csv');
  }

  function onExportPDF() {
    if (!items.length) return;
    exportPDF('Performance History', items, 'performance-history.pdf');
  }

  return (
    <div className="stack">
      <div className="card">
        <div className="filters">
          <input placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          <button type="button" className="btn-secondary" onClick={load}>Apply</button>
          <div className="spacer" />
          <button type="button" className="btn-secondary" onClick={onExportCSV}>Export CSV</button>
          <button type="button" className="btn-secondary" onClick={onExportPDF}>Export PDF</button>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  {['Employee', 'Date', 'Score', 'Reviewer', 'Notes'].map((h) => <th key={h}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.id || it._id || Math.random()}>
                    <td>{it.employee || it.employeeName || '-'}</td>
                    <td>{it.date || it.reviewDate || '-'}</td>
                    <td>{it.score ?? '-'}</td>
                    <td>{it.reviewer || '-'}</td>
                    <td>{it.notes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!items.length && <div className="muted">No results</div>}
          </div>
        )}
      </div>
    </div>
  );
}
