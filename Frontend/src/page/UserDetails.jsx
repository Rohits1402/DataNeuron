import { useAuth } from "../AuthContext";

export const Userdetails = () => {
  const { logout, userdetails, apiCount } = useAuth();
  return (
    <div className="user-details-container">
      <h2 className="api-count">API Count:</h2>
      {apiCount}
      <div className="user-info">
        <h3 className="user-info-item">Name: </h3>
        {userdetails.name}
        <h3 className="user-info-item">Email: </h3>
        {userdetails.email}
        <h3 className="user-info-item">Username:</h3> {userdetails.username}
      </div>
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};
