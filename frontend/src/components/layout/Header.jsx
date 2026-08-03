import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Logo from '../ui/Logo';

const Header = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isHome = location.pathname === '/';

  const navLinkClass = ({ isActive }) =>
    `block rounded-full px-3 py-2 text-sm transition-colors duration-200 ${
      isActive
        ? 'bg-brand/10 text-brand-dark font-semibold'
        : 'text-slate-600 hover:text-brand-dark'
    }`;

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="relative z-50 font-LakesNeueDemiBold">
      <nav
        className={`px-4 lg:px-6 ${
          isHome
            ? 'absolute inset-x-0 top-0 bg-white/90 text-slate-900 backdrop-blur-xl'
            : 'border-b border-slate-200 bg-white text-slate-900 shadow-sm'
        }`}
      >
        <div className="mx-auto flex max-w-screen-xl items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-slate-900 shadow-sm lg:hidden hover:bg-white/15"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isOpen ? (
                  <path d="M6 6L18 18M6 18L18 6" strokeLinecap="round" />
                ) : (
                  <path d="M4 6H20M4 12H20M4 18H20" strokeLinecap="round" />
                )}
              </svg>
            </button>
            <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
              <Logo fill="#0A66C2" size={44} />
              <span className="hidden text-sm font-semibold sm:inline text-slate-900">
                Recruitment System
              </span>
            </Link>
          </div>

          <ul className="hidden items-center gap-2 lg:flex">
            <li>
              <NavLink to="/" className={navLinkClass}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClass}>About</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            </li>
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/login"
              className="inline-flex h-10 items-center rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-700 transition-all duration-200 hover:bg-slate-100"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="inline-flex h-10 items-center rounded-2xl bg-brand px-5 text-sm text-white transition-all duration-200 hover:bg-brand-dark"
            >
              Sign up
            </Link>
          </div>
        </div>

        {isOpen && (
          <div className="border-t border-white/15 pb-4 lg:hidden">
            <ul className="space-y-2 pt-3">
              <li><NavLink to="/" className={navLinkClass} onClick={closeMenu}>Home</NavLink></li>
              <li><NavLink to="/about" className={navLinkClass} onClick={closeMenu}>About</NavLink></li>
              <li><NavLink to="/contact" className={navLinkClass} onClick={closeMenu}>Contact</NavLink></li>
            </ul>
            <div className="mt-4 flex flex-col gap-3 px-3">
              <Link
                to="/login"
                onClick={closeMenu}
                className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-slate-900 hover:bg-white/20"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-brand text-slate-900 hover:bg-brand-dark"
              >
                Sign up
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
