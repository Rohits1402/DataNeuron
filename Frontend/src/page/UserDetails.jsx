import { useAuth } from "../AuthContext";

export const Userdetails = () => {
  const { logout, userdetails, apiCount } = useAuth();
  return (
    <div className="user-details-container">
      <h2 className="api-count">Api Count: {apiCount}</h2>
      <div className="user-info">
        <h3 className="user-info-item">Name: {userdetails.name}</h3>
        <h3 className="user-info-item">Email: {userdetails.email}</h3>
        <h3 className="user-info-item">Username: {userdetails.username}</h3>
      </div>
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};
