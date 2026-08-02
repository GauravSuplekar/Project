import { Link, NavLink } from 'react-router-dom';
import Logo from '../ui/Logo';
import { SidebarSection, sidebarLinkClass } from './sidebarNav';

const AdminSideBar = ({ onNavigate }) => {
  const linkProps = onNavigate ? { onClick: onNavigate } : {};

  return (
    <aside className="flex h-full w-64 flex-col overflow-y-auto border-r border-brand-dark/20 bg-brand-dark px-5 py-8 font-LakesNeueRegular text-slate-900">
      <Link to="/admin/client" onClick={onNavigate} className="w-fit">
        <Logo fill="#EFEDE7" size={60} />
      </Link>

      <nav className="-mx-3 mt-6 flex flex-1 flex-col space-y-6">
        <SidebarSection title="Client">
          <NavLink to="/admin/client" className={sidebarLinkClass} {...linkProps}>
            <span className="mx-2 text-sm font-medium">Clients</span>
          </NavLink>
        </SidebarSection>

        <SidebarSection title="Candidate">
          <NavLink to="/admin/candidate" className={sidebarLinkClass} {...linkProps}>
            <span className="mx-2 text-sm font-medium">Candidates</span>
          </NavLink>
        </SidebarSection>

        <SidebarSection title="Requirement">
          <NavLink to="/admin/requirement" className={sidebarLinkClass} {...linkProps}>
            <span className="mx-2 text-sm font-medium">Requirements</span>
          </NavLink>
        </SidebarSection>

        <SidebarSection title="Profile">
          <NavLink to="/admin/profile" className={sidebarLinkClass} {...linkProps}>
            <span className="mx-2 text-sm font-medium">Profile</span>
          </NavLink>
        </SidebarSection>
      </nav>
    </aside>
  );
};

export default AdminSideBar;
