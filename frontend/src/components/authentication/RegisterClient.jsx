import React, { useState } from 'react'
import logoImage from "../../assets/images/GlobalSmallLogo.png"
import { Link, useNavigate } from 'react-router-dom'
import { registerClient } from '../utils/apiFunctions'

export function RegisterClient() {

  const [user,setUser] = useState({
    name : "",
    organizationName : "",
    contactNumber : "",
    email : "",
    username : "",
    password : ""
  })

  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const navigate = useNavigate();

  const handleInputChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}

  const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await registerClient(user)
			setSuccessMessage(response)
			setErrorMessage("")
			setUser({ name : "",organizationName : "", contactNumber : "", email : "", username : "", password : "" })
      setTimeout(() => {
        navigate("/login/client")
        window.location.reload()
      }, 2000)
		} catch (error) {
			setSuccessMessage("")
			setErrorMessage(`Registration error : ${error.message}`)
		}		
	}

  return (
    <section className="relative min-h-screen overflow-hidden page-background px-4 py-10 text-slate-900">
      <div className="pointer-events-none absolute left-0 top-24 h-64 w-64 rounded-full bg-brand/20/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-20 h-56 w-56 rounded-full bg-brand/20 blur-3xl" />
      <div className="flex items-center justify-center my-10">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md rounded-3xl border border-white/10 bg-white/90 p-10 shadow-2xl shadow-black/20 backdrop-blur-xl animate-fade-in-up">
          <div className="mb-2 flex justify-center">
            <img
              src={logoImage}
              alt="Global Logo"
              width="100"
              height="100"
            />
          </div>
          <h2 className="text-center text-2xl font-LakesNeueDemiBold leading-tight text-brand">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-sm font-TypewcondRegular text-slate-600">
            Already have an account?{' '}
            <Link
              to="/login/client"
              className="font-TypewcondRegular font-semibold text-brand transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="text-base font-medium text-slate-700">
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-2xl border border-white/15 bg-white/70 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-brand/40 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    id="name"
                    name="name"
                    type="text"
                    value={user.name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="organizationName" className="text-base font-medium text-slate-700">
                  Organization Name
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-2xl border border-white/15 bg-white/70 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-brand/40 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    id="organizationName"
                    name="organizationName"
                    type="text"
                    value={user.organizationName}
                    onChange={handleInputChange}
                    placeholder="Organization Name"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contactNumber" className="text-base font-medium text-slate-700">
                  Contact Number
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-2xl border border-white/15 bg-white/70 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-brand/40 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    value={user.contactNumber}
                    onChange={handleInputChange}
                    placeholder="Contact Number"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-base font-medium text-slate-700">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-2xl border border-white/15 bg-white/70 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-brand/40 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    id="email"
                    name="email"
                    type="email"
                    value={user.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="username" className="text-base font-medium text-slate-700">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-2xl border border-white/15 bg-white/70 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-brand/40 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    id="username"
                    name="username"
                    type="text"
                    value={user.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="text-base font-medium text-slate-700">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-2xl border border-white/15 bg-white/70 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-brand/40 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handleInputChange}
                    type="password"
                    placeholder="Password"
                    required
                  />
                </div>
              </div>
              {errorMessage && (
                <p className="mt-2 text-center text-sm font-TypewcondRegular text-red-500">
                  {errorMessage}
                </p>
              )}
              {successMessage && (
                <p className="mt-2 text-center text-sm font-TypewcondRegular text-emerald-300">
                  {successMessage}
                </p>
              )}
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-brand px-3.5 py-2.5 text-sm font-semibold text-slate-900 shadow-lg shadow-brand/20 transition duration-200 hover:bg-brand-dark active:scale-95 button-interactive"
                >
                  Create Account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
