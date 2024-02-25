import React, { useRef, useState } from "react";
import "./ResizableElement.css"; // Import your CSS file
import { Login } from "../page/Login";
import { makeResizable } from "../makeResizable";
import { Signup } from "../page/Signup";
import TeamMemberForm from "../page/TeamMemberForm";
import TeamMemberTable from "../page/TeamMemberTable";
import { useAuth } from "../AuthContext";
import { Userdetails } from "../page/UserDetails";
export const ResizableElement = () => {
  const { token, login, logout } = useAuth();
  const element1Ref = useRef(null);
  const element2Ref = useRef(null);
  const element3Ref = useRef(null);

  const [registered, setRegistered] = useState(false);

  React.useEffect(() => {
    if (element1Ref.current) {
      makeResizable(element1Ref.current);
    }
    if (element2Ref.current) {
      makeResizable(element2Ref.current);
    }
    if (element3Ref.current) {
      makeResizable(element3Ref.current);
    }
  }, []);

  return (
    <div className="resizable-container">
      <div ref={element1Ref} className="element1">
        {token ? (
          <Userdetails />
        ) : registered ? (
          <Signup setRegistered={setRegistered} />
        ) : (
          <Login setRegistered={setRegistered} />
        )}
      </div>
      <div ref={element2Ref} className="element2">
        {token ? <TeamMemberForm /> : <h3>Please login.</h3>}
      </div>
      <div ref={element3Ref} className="element3">
        {token ? <TeamMemberTable /> : <h3>Please login</h3>}
      </div>
    </div>
  );
};
