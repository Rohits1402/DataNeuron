import React, { useRef, useState } from "react";
import "./ResizableElement.css"; // Import your CSS file
import { Login } from "../page/Login";
import { makeResizable } from "../makeResizable";
import { Signup } from "../page/Signup";
import TeamMemberForm from "../page/TeamMemberForm";
import TeamMemberTable from "../page/TeamMemberTable";
import { useAuth } from "../AuthContext";
import { Userdetails } from "../page/UserDetails";

/**
 * Component for resizable elements with login/logout functionality.
 * Renders a container with three resizable elements.
 * Element 1: User details or authentication forms based on authentication status.
 * Element 2: Team member form or login prompt if not authenticated.
 * Element 3: Team member table or login prompt if not authenticated.
 */
export const ResizableElement = () => {
  const { token, login, logout } = useAuth();
  const element1Ref = useRef(null);
  const element2Ref = useRef(null);
  const element3Ref = useRef(null);

  const [registered, setRegistered] = useState(false);

  // UseEffect hook to make elements resizable upon component mounting
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
      {/* Element 1: Display user details or authentication forms */}
      <div ref={element1Ref} className="element1">
        {token ? (
          <Userdetails />
        ) : registered ? (
          <Signup setRegistered={setRegistered} />
        ) : (
          <Login setRegistered={setRegistered} />
        )}
      </div>
      {/* Element 2: Display team member form or login prompt if not authenticated */}
      <div ref={element2Ref} className="element2">
        {token ? (
          <TeamMemberForm />
        ) : (
          <h3 className="idle-text">Please login.</h3>
        )}
      </div>
      {/* Element 3: Display team member table or login prompt if not authenticated */}
      <div ref={element3Ref} className="element3">
        {token ? (
          <TeamMemberTable />
        ) : (
          <h3 className="idle-text">Please login</h3>
        )}
      </div>
    </div>
  );
};
