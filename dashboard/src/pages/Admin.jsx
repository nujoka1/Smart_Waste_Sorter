import { useAdminData } from '../hooks/useAdminData.js';

export default function Admin() {
  const { users, auditLogs, actions } = useAdminData();

  return (
    <>
      <div className="pageHeader">
        <div>
          <h1>Admin</h1>
          <p>Operator roles, system actions, bin control, and audit logs.</p>
        </div>
      </div>

      <section className="settingsGrid">
        <div className="card">
          <div className="cardHeader">
            <h3>User roles</h3>
            <span>Access control</span>
          </div>

          <div className="tableWrap">
            <table className="dataTable">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.name}>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>{user.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="cardHeader">
            <h3>System actions</h3>
            <span>Mock controls</span>
          </div>

          <div className="actionGrid">
            {actions.map((action) => (
              <button key={action} className="secondaryButton">
                {action}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="card auditCard">
        <div className="cardHeader">
          <h3>Audit logs</h3>
          <span>Recent administrative/system actions</span>
        </div>

        <div className="eventList">
          {auditLogs.map((log, index) => (
            <div className="eventItem" key={`${log.time}-${index}`}>
              <div className="eventIcon">{index + 1}</div>
              <div>
                <h4>{log.action}</h4>
                <p>{log.time} · {log.actor}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
