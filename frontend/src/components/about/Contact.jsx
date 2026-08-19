import React from 'react';

const Contact = () => {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Contact Us</h1>
      <p className="mt-4 text-slate-600">
        Have questions? Reach out and we'll get back to you within one business day.
      </p>

      <div className="mx-auto mt-8 max-w-xl text-left">
        <p className="text-sm text-slate-700"><strong>Email:</strong> support@d3recruitmentsystem.com</p>
        <p className="mt-2 text-sm text-slate-700"><strong>Phone:</strong> +91-9876543210</p>

        <form className="mt-6 grid gap-4">
          <input className="w-full rounded-lg border border-slate-200 px-4 py-2" placeholder="Your name" />
          <input className="w-full rounded-lg border border-slate-200 px-4 py-2" placeholder="Your email" />
          <textarea className="w-full rounded-lg border border-slate-200 px-4 py-2" rows="4" placeholder="Message" />
          <button className="inline-flex items-center justify-center rounded-2xl bg-brand px-5 py-2 text-sm text-white">Send message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
