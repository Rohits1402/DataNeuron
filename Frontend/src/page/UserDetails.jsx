import { useAuth } from "../AuthContext";



export const Userdetails = ()=>{
    const { logout, userdetails, apiCount } = useAuth();
    return (
        <div>
         <h2>Api Count: {apiCount}</h2>
         <h3>Name: {userdetails.name}</h3>
         <h3>Email: {userdetails.email}</h3>
         <h3>Username: {userdetails.username}</h3>
         <button onClick={logout}>Logout</button>
        </div>
    )
}