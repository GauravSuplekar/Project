import { useState } from 'react';
import logoImage from '../../assets/images/GlobalSmallLogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { loginCandidate } from '../utils/apiFunctions';
import jwtDecode from 'jwt-decode';
import Input from '../ui/Input';
import Button from '../ui/Button';

export function LoginCandidate() {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await loginCandidate(user);
      const token = response.token;
      const decodedUser = jwtDecode(token);
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.setItem('username', decodedUser.sub);
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('role', 'candidate');
      navigate('/candidate/requirement');
    } catch (error) {
      setErrorMessage(error.message || 'Invalid username or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-white px-4 py-10 text-slate-900">
      <div className="pointer-events-none absolute left-0 top-24 h-56 w-56 rounded-full bg-brand/20/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-20 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
      <div className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-200/50 animate-fade-in-up">
        <div className="mb-2 flex justify-center">
          <img src={logoImage} alt="Global Logo" width="100" height="100" />
        </div>
        <h2 className="text-center text-2xl font-LakesNeueDemiBold leading-tight text-brand">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm font-TypewcondRegular text-slate-600">
          Don&apos;t have an account?{' '}
          <Link
            to="/register/candidate"
            className="font-TypewcondRegular font-semibold text-brand transition-all duration-200 hover:underline"
          >
            Create an account
          </Link>
        </p>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Username"
              id="username"
              name="username"
              type="text"
              value={user.username}
              onChange={handleInputChange}
              placeholder="Username"
              required
              className="bg-slate-100 text-slate-900"
            />
            <Input
              label="Password"
              id="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              type="password"
              placeholder="Password"
              required
              className="bg-slate-100 text-slate-900"
            />
            {errorMessage && (
              <p className="text-center text-sm font-TypewcondRegular text-red-500">
                {errorMessage}
              </p>
            )}
            <Button type="submit" className="w-full button-interactive" isLoading={isLoading}>
              Login
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
