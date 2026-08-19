import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <section className="relative min-h-screen overflow-hidden page-background px-4 py-12 text-slate-900">
      <div className="pointer-events-none absolute left-0 top-20 h-64 w-64 rounded-full bg-brand/20/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-32 h-72 w-72 rounded-full bg-brand/20 blur-3xl" />
      <div className="relative mx-auto w-full max-w-5xl rounded-3xl border border-white/10 bg-white/90 p-8 shadow-2xl shadow-black/25 backdrop-blur-xl animate-fade-in-up">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Create your account</p>
          <h1 className="mt-4 text-4xl font-bold text-slate-900">Join as Candidate or Client</h1>
          <p className="mt-3 max-w-2xl text-center text-base text-slate-600">
            Pick the role that fits your journey and get access to an interactive hiring experience.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Link
            to="/register/candidate"
            className="group rounded-3xl border border-white/10 bg-white/10 p-8 text-center transition-transform duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-2xl"
          >
            <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-brand/20/10 text-brand">
              <svg width="60" height="60" viewBox="0 0 1024 1024" fill="#0A66C2">
                <path d="M471.2 566.4c-9.6 0-17.6-8-17.6-17.6s8-17.6 17.6-17.6h81.6c9.6 0 17.6 8 17.6 17.6s-8 17.6-17.6 17.6H471.2zM186.4 361.6c-14.4 0-27.2-12.8-27.2-27.2 0-14.4 12.8-27.2 27.2-27.2h24.8c8.8 0 16-6.4 16-15.2 7.2-99.2 67.2-189.6 156.8-234.4 4-2.4 8.8-3.2 12-3.2 14.4 0 27.2 12.8 27.2 27.2v56c0 8.8 7.2 16 16 16s16-7.2 16-16V55.2c0-13.6 10.4-25.6 23.2-27.2 10.4-1.6 21.6-1.6 32-1.6 12 0 24.8 0.8 35.2 1.6 13.6 1.6 23.2 12.8 23.2 27.2v81.6c0 8.8 7.2 16 16 16s16-7.2 16-16v-55.2c0-14.4 12.8-27.2 27.2-27.2 3.2 0 8 0.8 12.8 3.2C732 104.8 790.4 192 797.6 292c0.8 8.8 7.2 15.2 16 15.2h24.8c14.4 0 27.2 12.8 27.2 27.2 0 14.4-12.8 27.2-27.2 27.2H186.4z" />
                <path d="M83.2 1022.4c-20.8 0-40-8.8-52.8-24-11.2-13.6-16-31.2-12-48 32-164 181.6-298.4 376-336.8-74.4-48-120-136-120-234.4v-5.6h476.8v5.6c0 97.6-45.6 186.4-120.8 234.4 194.4 39.2 344 173.6 376 336.8 3.2 16.8-0.8 34.4-12 48-12.8 15.2-32 24-52.8 24H83.2zM512 649.6c-109.6 0-215.2 32-297.6 91.2-79.2 56.8-132 134.4-148.8 218.4-0.8 4 0.8 7.2 2.4 8 4 4.8 8.8 7.2 15.2 7.2h859.2c6.4 0 12-2.4 15.2-6.4 0.8-0.8 3.2-4 1.6-8-16-84.8-68.8-162.4-148.8-219.2C727.2 681.6 621.6 649.6 512 649.6zM324.8 421.6c17.6 104 95.2 179.2 186.4 179.2S680 525.6 697.6 421.6H324.8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-950">Candidate</h2>
            <p className="mt-3 text-sm text-slate-600">Apply for jobs, manage interviews, and track your progress in one polished experience.</p>
          </Link>

          <Link
            to="/register/client"
            className="group rounded-3xl border border-white/10 bg-white/10 p-8 text-center transition-transform duration-300 hover:-translate-y-1 hover:bg-white/15 hover:shadow-2xl"
          >
            <div className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-brand/20/10 text-brand">
              <svg fill="#0A66C2" width="60" height="60" viewBox="0 0 64 64">
                <path d="M48,33H16C8.83,33,3,38.45,3,45.14V61H61V45.14C61,38.45,55.17,33,48,33ZM35.91,35l-.54,6H28.63l-.54-6ZM36,51.44l-4,3.27-4-3.27L28.64,43h6.72ZM5,59V45.14C5,39.55,9.93,35,16,35H26.09l.62,7L26,52.33l6,5,6-5L37.29,42l.62-7H48c6.07,0,11,4.55,11,10.14V59Z" />
                <path d="M32,31A14,14,0,1,0,18,17,14,14,0,0,0,32,31Zm-7.31-4.5a11.94,11.94,0,0,1,14.62,0,11.94,11.94,0,0,1-14.62,0ZM32,5a12,12,0,0,1,8.8,20.13,13.94,13.94,0,0,0-17.6,0A12,12,0,0,1,32,5Z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-950">Client</h2>
            <p className="mt-3 text-sm text-slate-600">Post jobs, screen applicants, and run interviews with a modern employer portal.</p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
