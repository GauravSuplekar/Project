import Logo from '../ui/Logo';

const DashboardTopBar = ({ title, onMenuClick }) => (
  <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 shadow-sm md:hidden">
    <button
      type="button"
      onClick={onMenuClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-brand-dark transition hover:bg-brand/10"
      aria-label="Open navigation menu"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 6H20M4 12H20M4 18H20" />
      </svg>
    </button>
    <div className="flex items-center gap-3">
      <Logo fill="#8AB4F8" size={32} />
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-slate-600">Portal</p>
        <p className="text-sm font-LakesNeueDemiBold text-slate-900">{title}</p>
      </div>
    </div>
  </header>
);

export default DashboardTopBar;
