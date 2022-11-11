import React, { useState } from "react";
import SideMenu from "../components/utility/SideMenu";
import DashboardView from './DashboardView';
import PatientsView from './PatientsView';
import MiniNavBar from "../components/utility/MiniNavBar";
import '../styles/index/index.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectDetail from "../components/projects/ProjectDetail";
import ProjectsView from "./ProjectsView";
import Toast from "../components/utility/Toast";
import ErrorPage from "../components/utility/ErrorPage";
import ExaminationsView from "./ExaminationsView";
import ParticipantDetail from "../components/participants/ParticipantDetail";

export default function AppView() {

  const [toastMessage, setToastMessage] = useState('');

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
      name: 'projects'
    },
    {
      view: <ProjectDetail setToastMessage={setToastMessage} />,
      href: '/projects/:projectID',
      name: 'projectdetail'
    },
    {
      view: <ParticipantDetail setToastMessage={setToastMessage} />,
      href: '/projects/:projectID/participant/:patientID',
      name: 'participantdetail'
    },
    {
      view: <ExaminationsView setToastMessage={setToastMessage} />,
      href: '/examinations',
      name: 'examinations'
    },
    {
      view: <ErrorPage error={{ statusCode: 404, message: "Page not found"}} />,
      href: '/*',
      name: 'error_page'
    } 
  ];

  const [menuOpen, setMenuOpen] = useState(
    localStorage.getItem('side-menu-open') === 'true'
  );

  const openMenu = () => { 
    localStorage.setItem('side-menu-open', true);
    setMenuOpen(true);
  }
  
  const closeMenu = () => { 
    localStorage.setItem('side-menu-open', false);
    setMenuOpen(false);
  }

  return (
    <div className={!menuOpen ? "container" : "container offset"}>
      <BrowserRouter>
        <Routes>
          {routes.map((route, key) => {
            return ( <Route key={key} path={route.href} element={route.view} /> );
          })}
        </Routes>
        <SideMenu closeMenu={closeMenu} menuOpen={menuOpen} />
        <MiniNavBar menuOpen={menuOpen} openMenu={openMenu} />
      </BrowserRouter>
      <Toast message={toastMessage} setToastMessage={setToastMessage} />
    </div>
  );
}
