export default function Login() {
  return (
    <div className="loginPage">
      <div className="loginCard">
        <h1>WasteSort Login</h1>
        <p>Firebase authentication will be connected after Firestore setup.</p>

        <div className="settingsList">
          <div>
            <label>Email</label>
            <input placeholder="operator@example.com" />
          </div>

          <div>
            <label>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>

          <button className="primaryButton">Login disabled in mock mode</button>
        </div>
      </div>
    </div>
  );
}
