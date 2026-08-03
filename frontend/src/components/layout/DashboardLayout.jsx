import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardTopBar from './DashboardTopBar';

const DashboardLayout = ({ sidebar: Sidebar, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative min-h-screen bg-slate-100 text-slate-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_rgba(10,102,194,0.12),transparent_35%)]" />
      <div className="pointer-events-none absolute left-0 top-28 h-72 w-72 rounded-full bg-white/70 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-72 w-72 rounded-full bg-brand/20/10 blur-3xl" />

      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={closeMenu}
          aria-label="Close navigation menu"
        />
      )}

      <div className="relative md:flex min-h-screen">
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar onNavigate={closeMenu} />
        </div>

        <div className="flex min-h-screen flex-1 flex-col md:min-w-0">
          <DashboardTopBar title={title} onMenuClick={() => setIsOpen(true)} />
          <main className="relative flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
            <div className="mx-auto w-full max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
