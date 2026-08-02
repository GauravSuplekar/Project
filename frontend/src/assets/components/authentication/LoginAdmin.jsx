import React, { useState } from 'react'
import logoImage from "../../assets/images/GlobalSmallLogo.png"
import { Link, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { loginAdmin } from '../utils/apiFunctions'

const  LoginAdmin = () => {

    const [user,setUser] = useState({
        username : "",
        password : ""
    })
    
    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate();

  const handleInputChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value })
	}

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const response = await loginAdmin(user);
            const token = response.token;
            const decodedUser = jwtDecode(token);
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("username");
            localStorage.removeItem("role");
            localStorage.setItem("username", decodedUser.sub);
            localStorage.setItem("jwtToken", token);
            localStorage.setItem("role", "admin");
            navigate("/admin/client");
            window.location.reload();
        } catch (error) {
            setErrorMessage(error.message || "Invalid username or password. Please try again.");
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
            Sign in to your account
          </h2>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="space-y-5">
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
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-slate-700">
                    Password
                  </label>
                </div>
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
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-brand px-3.5 py-2.5 text-sm font-semibold text-slate-900 shadow-lg shadow-brand/20 transition duration-200 hover:bg-brand-dark active:scale-95 button-interactive"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginAdmin;