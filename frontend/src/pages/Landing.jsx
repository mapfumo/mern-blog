import { CreateUser } from "../components/CreateUser";
import { Login } from "../components/Login";
import { useState } from "react";

export function Landing() {
  // view == 0 => Login
  // otherwise => Create
  const [view, setView] = useState(0);
  return (
    <div>
      {!view ? (
        <>
          <Login />
          <button onClick={() => setView(!view)}>Create new Account</button>
        </>
      ) : (
        <>
          <CreateUser />
          <button onClick={() => setView(!view)}>Login existing account</button>
        </>
      )}
    </div>
  );
}
