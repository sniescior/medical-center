import React, { useEffect, useState } from "react";
import NavBar from "../components/utility/NavBar";
import DashboardView from './DashboardView';
import TestsView from "../components/tests/TestsView";
import PatientsView from './PatientsView';
import MiniNavBar from "../components/utility/MiniNavBar";
import '../styles/index/index.css'

import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import ProjectDetail from "../components/projects/ProjectDetail";
import ProjectsView from "./ProjectsView";
import Toast from "../components/utility/Toast";

export default function AppView() {

  const [toastMessage, setToastMessage] = useState(null);

  const routes = [
    {
      view: <DashboardView />,
      href: '/',
      name: 'dashboard'
    },
    {
      view: <PatientsView setToastMessage={setToastMessage} />,
      href: '/patients',
      name: 'patients'
    },
    {
      view: <ProjectsView setToastMessage={setToastMessage} />,
      href: '/projects/',
      name: 'patients'
    },
    {
      view: <ProjectDetail setToastMessage={setToastMessage} />,
      href: '/projects/:projectID',
      name: 'patients'
    },
    {
      view: <TestsView />,
      href: '/tests',
      name: 'tests'
    },
  ]

  const [navOpen, setNavOpen] = useState(true);

  return (
    <div className={!navOpen ? "container" : "container offset"}>
      <BrowserRouter>
      <Routes>
        {routes.map((route, key) => {
          return ( <Route key={key} path={route.href} element={route.view} /> );
        })}
      </Routes>
        <NavBar setNavOpen={setNavOpen} navOpen={navOpen} />
        <MiniNavBar navOpen={navOpen} setNavOpen={setNavOpen} />
        </BrowserRouter>
        <Toast message={toastMessage} />
    </div>
  );
}
