import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from '../ui/Logo';
import { SidebarSection, sidebarLinkClass } from './sidebarNav';

const ClientSideBar = ({ onNavigate }) => {
  const navigate = useNavigate();
  const linkProps = onNavigate ? { onClick: onNavigate } : {};

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <aside className="flex h-full w-64 flex-col overflow-y-auto border-r border-brand-dark/20 bg-brand-dark px-5 py-8 font-LakesNeueRegular text-slate-900">
      <Link to="/client/requirement" onClick={onNavigate} className="w-fit">
        <Logo fill="#EFEDE7" size={60} />
      </Link>

      <nav className="-mx-3 mt-6 flex flex-1 flex-col space-y-6">
        <SidebarSection title="Requirement">
          <NavLink to="/client/requirement" className={sidebarLinkClass} {...linkProps}>
            <span className="mx-2 text-sm font-medium">Existing Requirements</span>
          </NavLink>
          <NavLink to="/client/add/requirement" className={sidebarLinkClass} {...linkProps}>
            <span className="mx-2 text-sm font-medium">Add Requirement</span>
          </NavLink>
        </SidebarSection>

        <SidebarSection title="Applicant">
          <NavLink to="/client/applicants" className={sidebarLinkClass} {...linkProps}>
            <span className="mx-2 text-sm font-medium">All Applicants</span>
          </NavLink>
        </SidebarSection>

        <SidebarSection title="Interview">
          <NavLink to="/client/interview/upcomming" className={sidebarLinkClass} {...linkProps}>
            <span className="mx-2 text-sm font-medium">Upcoming Interview</span>
          </NavLink>
        </SidebarSection>

        <SidebarSection title="Profile">
          <NavLink to="/client/profile" className={sidebarLinkClass} {...linkProps}>
            <span className="mx-2 text-sm font-medium">Profile</span>
          </NavLink>
        </SidebarSection>
      </nav>
      <div className="mt-auto px-3 pt-6">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default ClientSideBar;
