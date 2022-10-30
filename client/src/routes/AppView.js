import React, { useEffect, useState } from "react";
import {
    createBrowserRouter,
    RouterProvider
  } from "react-router-dom";
import NavBar from "../components/utility/NavBar";
import DashboardView from '../views/DashboardView';
import TestsView from "../components/tests/TestsView";
import PatientsView from '../views/PatientsView';
import ProjectsView from '../views/ProjectsView';
import MiniNavBar from "../components/utility/MiniNavBar";

export default function AppView() {

  const [currentPage, setCurrentPage] = useState('dashboard');

  const views = [
    {
      view: <DashboardView />,
      name: 'dashboard'
    },
    {
      view: <ProjectsView />,
      name: 'projects'
    },
    {
      view: <PatientsView />,
      name: 'patients'
    },
    {
      view: <TestsView />,
      name: 'tests'
    },
  ]

  const [view, setView] = useState(views[0]);
  const [navOpen, setNavOpen] = useState(true);

  useEffect(() => {
    for(var i = 0; i < views.length; i++) {
      if(views[i].name == currentPage) {
        setView(views[i]);
        console.log(view);
      }
    }
  }, [currentPage]);

  return (
    <div className={!navOpen ? "container" : "container offset"}>
      <NavBar setCurrentPage={setCurrentPage} currentPage={currentPage} setNavOpen={setNavOpen} navOpen={navOpen} />
      <MiniNavBar navOpen={navOpen} setNavOpen={setNavOpen} />
      {view.view}
    </div>
  );
}
