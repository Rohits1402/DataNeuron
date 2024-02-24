import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userdetails, setUserDetails] = useState({});
  const [teamMembers, setTeamMembers] = useState([]);
  const [updateTeamMember, setUpdateTeamMemberdata ] = useState(null);
  const [apiCount, setApiCount ] = useState(0);


  const login = (userToken) => {
    setToken(userToken);
  };
  const setUpdateTeamMember = (data) =>{
    setUpdateTeamMemberdata(data)
  }
  const setApiCountData = (num)=>{
    setApiCount(num);
  }
  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, userdetails, setUserDetails,teamMembers,setTeamMembers, updateTeamMember, setUpdateTeamMember, setApiCountData, apiCount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
