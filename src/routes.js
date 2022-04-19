import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Vehicle from './pages/Vehicls';
import Pollutions from './pages/Pollution';
import Insurance from './pages/Insurance';
import Fitness from './pages/Fitness';
import NotFound from './pages/Page404';
import AddService from './pages/AddService';
import Tasks from "./pages/Tasks";
import AdmissionForm from './pages/AdmissionForm';
import RenderPdf from './pages/DownloadPdf';
import User from './pages/ListStudents'

// ----------------------------------------------------------------------

const token = localStorage.getItem('token');

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: token ? <DashboardLayout token={token} /> : <Navigate to="/login" />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'list', element: <Vehicle /> },
        { path: 'pucc', element: <Pollutions /> },
        { path: 'insurance', element: <Insurance /> },
        { path: 'fitness', element: <Fitness /> },
        { path: 'task', element: <Tasks /> },
        { path: 'add', element: <AddService /> },
        { path: 'admission', element: <AdmissionForm /> },
        { path: 'admission/download', element: <RenderPdf /> },
        { path: 'admission/list', element: <User /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
