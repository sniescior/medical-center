import React, { useEffect, useState } from "react";
import NavBar from "../components/utility/NavBar";
import DashboardView from './DashboardView';
import TestsView from "../components/tests/TestsView";
import PatientsView from './PatientsView';
import MiniNavBar from "../components/utility/MiniNavBar";
import '../styles/index/index.css'
import ProjectController from "../controllers/ProjectController";

import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import ProjectDetail from "../components/projects/ProjectDetail";

export default function AppView() {
  const routes = [
    {
      view: <DashboardView />,
      href: '/',
      name: 'dashboard'
    },
    {
      view: <ProjectController />,
      href: '/projects',
      name: 'projects'
    },
    {
      view: <PatientsView />,
      href: '/patients',
      name: 'patients'
    },
    {
      view: <ProjectDetail />,
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
    </div>
  );
}
