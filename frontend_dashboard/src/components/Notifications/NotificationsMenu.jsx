import React, { useEffect, useRef, useState } from 'react';
import { getNotifications, markNotificationRead } from '../../api/client';

// PUBLIC_INTERFACE
export default function NotificationsMenu() {
  /** Simple notifications bell with dropdown fetching notifications on demand. */
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  async function load() {
    try {
      setLoading(true);
      const data = await getNotifications();
      setItems(data?.items || data || []);
    } catch (e) {
      // ignore errors in UI
    } finally {
      setLoading(false);
    }
  }

  async function markRead(id) {
    try {
      await markNotificationRead(id);
      setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    } catch (e) {
      // ignore for UI
    }
  }

  function onToggle() {
    const willOpen = !open;
    setOpen(willOpen);
    if (willOpen) load();
  }

  return (
    <div className="notifications" ref={ref}>
      <button type="button" className="btn-secondary" onClick={onToggle} aria-haspopup="menu" aria-expanded={open}>
        🔔
      </button>
      {open && (
        <div className="dropdown" role="menu" aria-label="Notifications">
          {loading && <div className="dropdown-item">Loading...</div>}
          {!loading && items.length === 0 && <div className="dropdown-item">No notifications</div>}
          {!loading &&
            items.map((n) => (
              <div key={n.id || n._id || Math.random()} className={`dropdown-item ${n.read ? 'read' : ''}`}>
                <div className="notif-title">{n.title || 'Notification'}</div>
                <div className="notif-body">{n.message || n.body || ''}</div>
                {!n.read && (
                  <button type="button" className="btn-link small" onClick={() => markRead(n.id || n._id)}>
                    Mark as read
                  </button>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
