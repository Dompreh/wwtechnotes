import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";
import NewUserForm from "./features/users/NewUserForm";
import EditUser from "./features/users/EditUser";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import useTitle from "./hooks/UseTitle";

function App() {
  useTitle('Walter W. Repairs')
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        {/* {protected routes} */}
        <Route path="login" element={<Login />} />
        <Route element={<PersistLogin />}>
        <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]}/>}>
          <Route element={<Prefetch />}>
            <Route path="dash" element={<DashLayout />}>
              <Route index element={<Welcome />} />

              <Route path="notes">
                <Route index element={<NotesList />} />
                <Route path=":id" element={<EditNote />} />
                <Route path="new" element={<NewNote />} />
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Manager]}/>}>
              <Route path="users">
                <Route index element={<UsersList />} />
                <Route path=":id" element={<EditUser />} />
                <Route path="new" element={<NewUserForm />} />
              </Route>
              </Route>
            </Route>{" "}
            {/* End dash */}
          </Route>
          </Route>
          {/* End  of Protected routes */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
