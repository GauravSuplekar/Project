import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-100 text-slate-700">
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-14 md:px-6 md:py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* Office Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-LakesNeueRegular uppercase tracking-[0.18em] text-brand-dark">Office</h2>
            <p className="text-sm leading-6 text-slate-600">
              Global Recruitment Services<br />Pune, Maharashtra 411057
            </p>
            <p className="text-sm leading-6 text-slate-600">
              +91-9876543210<br />contact@globalrecruitment.com
            </p>
          </div>

          {/* Office Hours Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-LakesNeueRegular uppercase tracking-[0.18em] text-brand-dark">Office Hours</h3>
            <p className="text-sm leading-6 text-slate-600">
              Monday to Friday<br />9:00 am to 6:00 pm
            </p>
            <p className="text-sm leading-6 text-slate-600">
              Saturday<br />9:00 am to 12:00 noon
            </p>
          </div>

          {/* Connect Section */}
          <div className="space-y-5">
            <h3 className="text-xl font-LakesNeueRegular uppercase tracking-[0.18em] text-brand-dark">Connect</h3>
            <div className="flex items-center gap-4">
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/gourav-sakharkar-027145255" target="_blank" rel="noreferrer noopener" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm text-slate-700 transition hover:bg-slate-100">
                <svg fill="currentColor" height="20" width="20" viewBox="0 0 24 24">
                  <path d="M22.2,0H1.8C0.8,0,0,0.8,0,1.8v20.5c0,1,0.8,1.8,1.8,1.8h20.5c1,0,1.8-0.8,1.8-1.8V1.8C24,0.8,23.2,0,22.2,0z M7.2,20.4H3.5V9h3.6V20.4z M5.3,7.4c-1.1,0-2.1-0.9-2.1-2.1s0.9-2.1,2.1-2.1s2.1,0.9,2.1,2.1S6.5,7.4,5.3,7.4z M20.5,20.5h-3.6v-6.3c0-1.8-0.8-2.4-1.8-2.4c-1.1,0-2.1,0.8-2.1,2.5v6.2H9.3V9h3.5v1.6h0c0.3-0.7,1.6-1.9,3.4-1.9c2,0,4.2,1.2,4.2,4.7V20.5z" />
                </svg>
              </a>
              
              {/* GitHub */}
              <a href="https://github.com/gouravs007" target="_blank" rel="noreferrer noopener" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm text-slate-700 transition hover:bg-slate-100">
                <svg fill="currentColor" height="20" width="20" viewBox="0 0 24 24">
                  <path d="M22.4,6c-1.1-1.8-2.5-3.3-4.4-4.4C16.2,0.5,14.2,0,12,0C9.8,0,7.8,0.5,6,1.6C4.1,2.7,2.7,4.1,1.6,6C0.5,7.8,0,9.8,0,12c0,2.6,0.8,5,2.3,7.1c1.5,2.1,3.5,3.5,5.9,4.3c0.3,0.1,0.5,0,0.6-0.1C9,23.2,9,23,9,22.8c0,0,0-0.3,0-0.8c0-0.5,0-1,0-1.4l-0.4,0.1c-0.2,0-0.5,0.1-0.9,0.1c-0.3,0-0.7,0-1.1-0.1c-0.4-0.1-0.7-0.2-1-0.5c-0.3-0.2-0.6-0.6-0.7-1l-0.2-0.4c-0.1-0.2-0.3-0.5-0.5-0.8c-0.2-0.3-0.5-0.5-0.7-0.6l-0.1-0.1c-0.1-0.1-0.1-0.1-0.2-0.2c-0.1-0.1-0.1-0.1-0.1-0.2c0-0.1,0-0.1,0.1-0.2c0.1,0,0.2-0.1,0.5-0.1l0.3,0c0.2,0,0.5,0.2,0.8,0.4c0.3,0.2,0.6,0.5,0.8,0.8c0.2,0.4,0.5,0.8,0.9,1c0.3,0.2,0.7,0.3,1,0.3c0.3,0,0.6,0,0.9-0.1C8.6,19.1,8.8,19,9,18.9c0.1-0.7,0.3-1.2,0.8-1.6c-0.6-0.1-1.1-0.2-1.6-0.3c-0.5-0.1-1-0.3-1.5-0.6c-0.5-0.3-0.9-0.6-1.3-1c-0.3-0.4-0.6-1-0.8-1.6c-0.2-0.7-0.3-1.5-0.3-2.3c0-1.3,0.4-2.3,1.2-3.2C5.2,7.2,5.2,6.1,5.7,5C6,4.9,6.4,4.9,7,5.2c0.6,0.2,1,0.4,1.3,0.6C8.6,5.9,8.8,6.1,9,6.2c1-0.3,2-0.4,3-0.4s2,0.1,3,0.4l0.6-0.4C16,5.6,16.5,5.3,17,5.1c0.6-0.2,1-0.3,1.3-0.2c0.5,1.2,0.5,2.2,0.1,3.2c0.8,0.9,1.2,2,1.2,3.2c0,0.9-0.1,1.7-0.3,2.4c-0.2,0.7-0.5,1.2-0.8,1.6c-0.3,0.4-0.8,0.8-1.3,1c-0.5,0.3-1,0.5-1.5,0.6c-0.5,0.1-1,0.2-1.6,0.3c0.5,0.5,0.8,1.2,0.8,2.2v3.3c0,0.2,0.1,0.3,0.2,0.5c0.1,0.1,0.3,0.2,0.6,0.1c2.4-0.8,4.4-2.2,5.9-4.3C23.2,17,24,14.6,24,12C24,9.8,23.5,7.8,22.4,6z" />
                </svg>
              </a>

              {/* Instagram */}
              <a href="#" target="_blank" rel="noreferrer noopener" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-sm text-slate-700 transition hover:bg-slate-100">
                <svg fill="currentColor" height="20" width="20" viewBox="0 0 24 24">
                  <path d="M23.9,7.1c-0.1-1.3-0.3-2.1-0.6-2.9C23.1,3.4,22.7,2.7,22,2s-1.3-1.1-2.1-1.4c-0.8-0.3-1.6-0.5-2.9-0.6C15.7,0,15.3,0,12,0 S8.3,0,7.1,0.1C5.8,0.1,4.9,0.3,4.1,0.6C3.4,0.9,2.7,1.3,2,2S0.9,3.4,0.6,4.1C0.3,4.9,0.1,5.8,0.1,7.1C0,8.3,0,8.7,0,12 s0,3.7,0.1,4.9c0.1,1.3,0.3,2.1,0.6,2.9C0.9,20.6,1.3,21.3,2,22s1.3,1.1,2.1,1.4c0.8,0.3,1.6,0.5,2.9,0.6C8.3,24,8.7,24,12,24 s3.7,0,4.9-0.1c1.3-0.1,2.1-0.3,2.9-0.6c0.8-0.3,1.5-0.7,2.1-1.4s1.1-1.3,1.4-2.1c0.3-0.8,0.5-1.6,0.6-2.9C24,15.7,24,15.3,24,12 S24,8.3,23.9,7.1z M21.8,16.8c-0.1,1.2-0.2,1.8-0.4,2.2c-0.2,0.6-0.5,1-0.9,1.4s-0.8,0.7-1.4,0.9c-0.4,0.2-1.1,0.4-2.2,0.4 c-1.3,0.1-1.6,0.1-4.8,0.1s-3.6,0-4.8-0.1c-1.2-0.1-1.8-0.2-2.2-0.4c-0.6-0.2-1-0.5-1.4-0.9s-0.7-0.8-0.9-1.4 c-0.2-0.4-0.4-1.1-0.4-2.2c-0.1-1.3-0.1-1.6-0.1-4.8s0-3.6,0.1-4.8C2.3,6,2.5,5.3,2.6,4.9c0.2-0.6,0.5-1,0.9-1.4s0.8-0.7,1.4-0.9 C5.3,2.5,6,2.3,7.2,2.2C8.4,2.2,8.8,2.2,12,2.2s3.6,0,4.8,0.1c1.2,0.1,1.8,0.2,2.2,0.4c0.6,0.2,1,0.5,1.4,0.9s0.7,0.8,0.9,1.4 c0.2,0.4,0.4,1.1,0.4,2.2c0.1,1.3,0.1,1.6,0.1,4.8S21.8,15.6,21.8,16.8z"/>
                  <path d="M12,6c-3.3,0-6,2.7-6,6s2.7,6,6,6s6-2.7,6-6S15.3,6,12,6z M12,15.9c-2.2,0-3.9-1.7-3.9-3.9S9.8,8.1,12,8.1s3.9,1.7,3.9,3.9 S14.2,15.9,12,15.9z"/>
                  <circle cx="18.5" cy="6" r="1.5"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Highlight Banner */}
        <div className="container mx-auto pt-10 text-center">
           <h1 className="text-2xl md:text-xl lg:text-2xl font-bold text-[#8AB4F8] font-CinzelRegular">
              Designed and developed with precision for the CDAC PG-DAC 2026 Final Submission.
           </h1>
        </div>

        {/* Bottom Credits */}
        <div className="border-t border-slate-200 pt-6 text-center text-sm text-slate-500 md:flex md:items-center md:justify-between md:text-left mt-8">
          <p>Designed and developed with precision for the CDAC PG-DAC 2026 Final Submission.</p>
          <p className="mt-3 md:mt-0">© 2026 Sunbeam InfoTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;