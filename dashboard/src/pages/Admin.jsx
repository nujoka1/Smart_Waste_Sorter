import { useState } from 'react';
import { useAdminData } from '../hooks/useAdminData.js';
import { useSystemCommands } from '../hooks/useSystemCommands.js';

function formatTimestamp(timestamp) {
  if (!timestamp?.toDate) return 'Pending time';
  return timestamp.toDate().toLocaleString();
}

export default function Admin() {
  const { users, auditLogs, actions } = useAdminData();
  const { commands, sendCommand, updateCommandStatus } = useSystemCommands();

  const [busyAction, setBusyAction] = useState(null);
  const [busyCommandId, setBusyCommandId] = useState(null);
  const [lastCommand, setLastCommand] = useState(null);
  const [error, setError] = useState(null);

  async function handleAction(action) {
    setBusyAction(action);
    setError(null);

    try {
      const commandId = await sendCommand(action);
      setLastCommand({
        action,
        commandId
      });
    } catch (err) {
      console.error('[Admin] Command failed:', err);
      setError(err.message || 'Command failed');
    } finally {
      setBusyAction(null);
    }
  }

  async function handleCommandStatus(commandId, status) {
    setBusyCommandId(commandId);
    setError(null);

    try {
      await updateCommandStatus(
        commandId,
        status,
        status === 'completed' ? 'Marked completed from dashboard' : 'Marked failed from dashboard'
      );
    } catch (err) {
      console.error('[Admin] Command status update failed:', err);
      setError(err.message || 'Status update failed');
    } finally {
      setBusyCommandId(null);
    }
  }

  return (
    <>
      <div className="pageHeader">
        <div>
          <h1>Admin</h1>
          <p>Operator roles, system actions, command queue, and audit logs.</p>
        </div>
      </div>

      {lastCommand && (
        <div className="commandNotice success">
          Command sent: <strong>{lastCommand.action}</strong>
          <span>Command ID: {lastCommand.commandId}</span>
        </div>
      )}

      {error && (
        <div className="commandNotice error">
          Command failed: <strong>{error}</strong>
        </div>
      )}

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
            <span>Firestore command queue</span>
          </div>

          <div className="actionGrid">
            {actions.map((action) => (
              <button
                key={action}
                className="secondaryButton"
                onClick={() => handleAction(action)}
                disabled={busyAction === action}
              >
                {busyAction === action ? 'Sending...' : action}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="card auditCard">
        <div className="cardHeader">
          <h3>Command queue</h3>
          <span>{commands.length} recent commands</span>
        </div>

        <div className="tableWrap">
          <table className="dataTable">
            <thead>
              <tr>
                <th>Command</th>
                <th>Status</th>
                <th>Created</th>
                <th>Result</th>
                <th>Control</th>
              </tr>
            </thead>

            <tbody>
              {commands.length === 0 ? (
                <tr>
                  <td colSpan="5">No commands issued yet.</td>
                </tr>
              ) : (
                commands.map((command) => (
                  <tr key={command.id}>
                    <td>{command.action}</td>
                    <td>
                      <span className={`tableBadge ${command.status}`}>
                        {command.status}
                      </span>
                    </td>
                    <td>{formatTimestamp(command.createdAt)}</td>
                    <td>{command.result || '—'}</td>
                    <td>
                      {command.status === 'pending' ? (
                        <div className="commandButtonGroup">
                          <button
                            className="miniButton"
                            disabled={busyCommandId === command.id}
                            onClick={() => handleCommandStatus(command.id, 'completed')}
                          >
                            Done
                          </button>

                          <button
                            className="miniButton danger"
                            disabled={busyCommandId === command.id}
                            onClick={() => handleCommandStatus(command.id, 'failed')}
                          >
                            Fail
                          </button>
                        </div>
                      ) : (
                        <span className="mutedText">Processed</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card auditCard">
        <div className="cardHeader">
          <h3>Audit logs</h3>
          <span>Recent administrative/system actions</span>
        </div>

        <div className="eventList">
          {auditLogs.map((log, index) => (
            <div className="eventItem" key={`${log.time}-${index}-${log.action}`}>
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
