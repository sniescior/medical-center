import React from "react";
import {
    createBrowserRouter,
    RouterProvider
  } from "react-router-dom";
import DashboardView from '../views/DashboardView';
import ErrorView from '../views/ErrorView';
import PatientsView from '../views/PatientsView';
import ProjectsView from '../views/ProjectsView';

const router = createBrowserRouter([
    {
      path: '/',
      element: <DashboardView />,
      errorElement: <ErrorView />
    },
    {
      path: '/patients',
      element: <PatientsView />,
      errorElement: <ErrorView />,
    },
    {
      path: '/projects',
      element: <ProjectsView />,
      errorElement: <ErrorView />,
    },
]);

export default function AppRouter() {
    return (
        <RouterProvider router={router} />
    );
}
