import React from "react";
import { Routes, Route } from "react-router-dom";
import DashLayout from "./components/DashLayout";
import Layout from "./components/Layout";
import Login from "./components/Login";
import CreateNote from "./components/notes/CreateNote";
import EditNotes from "./components/notes/EditNote";
import NotesList from "./components/notes/NotesList";
import PersistsLogin from "./components/PersistsLogin";
import Public from "./components/Public";
import RequireAuth from "./components/RequireAuth";
import CreateUser from "./components/users/CreateUser";
import EditUser from "./components/users/EditUser";
import UsersList from "./components/users/UsersList";
import Welcome from "./components/Welcome";
import { ROLES } from "./config/roles";
import useTitle from "./hooks/useTitle";

const App = () => {
  useTitle("Dan D.repairs");

  return (
    <Layout>
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Public />} />

        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<PersistsLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<DashLayout />}>
              <Route path="/dash" element={<Welcome />} />

              <Route path="/dash/notes" element={<NotesList />} />

              <Route path="/dash/notes/:id" element={<EditNotes />} />

              <Route path="/dash/notes/new" element={<CreateNote />} />

              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />
                }
              >
                <Route path="/dash/users" element={<UsersList />} />

                <Route path="/dash/users/:id" element={<EditUser />} />

                <Route path="/dash/users/new" element={<CreateUser />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </Layout>
  );
};

export default App;
