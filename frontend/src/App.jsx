import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ClientSideBar from './components/layout/ClientSideBar';
import CandidateSideBar from './components/layout/CandidateSideBar';
import AdminSideBar from './components/layout/AdminSideBar';
import DashboardLayout from './components/layout/DashboardLayout';

function App() {
  const location = useLocation();

  const isLogin = location.pathname.startsWith('/login');
  const isRegister = location.pathname.startsWith('/register');
  const isForgotPassword = location.pathname.startsWith('/forgot-password');
  const isResetPassword = location.pathname.startsWith('/reset-password');
  const isInterview = location.pathname.startsWith('/interview');
  const isClient = location.pathname.startsWith('/client');
  const isCandidate = location.pathname.startsWith('/candidate');
  const isAdmin = location.pathname.startsWith('/admin');

  if (isLogin || isRegister || isInterview || isForgotPassword || isResetPassword) {
    return <Outlet />;
  }

  if (isClient) {
    return <DashboardLayout sidebar={ClientSideBar} title="Client Portal" />;
  }

  if (isCandidate) {
    return <DashboardLayout sidebar={CandidateSideBar} title="Candidate Portal" />;
  }

  if (isAdmin) {
    return <DashboardLayout sidebar={AdminSideBar} title="Admin Portal" />;
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
