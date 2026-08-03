import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from '../ui/Logo';
import { SidebarSection, sidebarLinkClass } from './sidebarNav';

const CandidateSideBar = ({ onNavigate }) => {
  const navigate = useNavigate();
  const linkProps = onNavigate ? { onClick: onNavigate } : {};

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <aside className="flex h-full w-64 flex-col overflow-y-auto border-r border-brand-dark/20 bg-brand-dark px-5 py-8 font-LakesNeueRegular text-slate-100">
      <Link to="/candidate/requirement" onClick={onNavigate} className="w-fit">
        <Logo fill="#FFFFFF" size={60} />
      </Link>

      <nav className="-mx-3 mt-6 flex flex-1 flex-col space-y-6">
        <SidebarSection title="Requirement">
          <NavLink to="/candidate/requirement" className={sidebarLinkClass} {...linkProps}>
            <span className="mx-2 text-sm font-medium">All Requirements</span>
          </NavLink>
          <NavLink to="/candidate/application" className={sidebarLinkClass} {...linkProps}>
            <span className="mx-2 text-sm font-medium">Applied Requirement</span>
          </NavLink>
        </SidebarSection>

        <SidebarSection title="Interview">
          <NavLink to="/candidate/interview/upcoming" className={sidebarLinkClass} {...linkProps}>
            <span className="mx-2 text-sm font-medium">Upcoming Interview</span>
          </NavLink>
        </SidebarSection>

        <SidebarSection title="Profile">
          <NavLink to="/candidate/profile" className={sidebarLinkClass} {...linkProps}>
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

export default CandidateSideBar;
