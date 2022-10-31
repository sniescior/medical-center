import React, { useEffect, useState } from "react";
import NavBar from "../components/utility/NavBar";
import DashboardView from './DashboardView';
import TestsView from "../components/tests/TestsView";
import PatientsView from './PatientsView';
import ProjectsView from './ProjectsView';
import MiniNavBar from "../components/utility/MiniNavBar";
import '../styles/index/index.css'

export default function AppView() {

  const [currentPage, setCurrentPage] = useState('patients');

  const views = [
    {
      view: <DashboardView setCurrentPage={setCurrentPage} />,
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
