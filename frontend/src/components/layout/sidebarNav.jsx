export const sidebarLinkClass = ({ isActive }) =>
  `flex items-center rounded-lg px-3 py-2 transition-colors duration-200 ${
    isActive
      ? 'bg-white/10 text-white font-semibold'
      : 'text-slate-200 hover:bg-white/10 hover:text-white'
  }`;

export const SidebarSection = ({ title, children }) => (
  <div className="space-y-3">
    <p className="px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
      {title}
    </p>
    {children} 
  </div>
);

