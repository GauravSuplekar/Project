import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import BackImg from '../../assets/images/bg1.jpg';
import handShake from '../../assets/images/handShake.jpg';
import Card from '../ui/Card';

const services = [
  {
    title: 'Apply for Jobs',
    description: 'Browse open requirements, submit applications, and track your status in one place.',
    link: '/register/candidate',
    cta: 'Join as Candidate →',
  },
  {
    title: 'Hire Talent',
    description: 'Post requirements, review applicants, schedule interviews, and manage hiring.',
    link: '/register/client',
    cta: 'Join as Client →',
  },
  {
    title: 'Live Interviews',
    description: 'Join scheduled video interviews directly from your dashboard — no extra setup.',
    link: '/login',
    cta: 'Sign In →',
  },
];

const stats = [
  { label: 'Roles Posted', value: '500+' },
  { label: 'Candidates', value: '2K+' },
  { label: 'Interviews', value: '1K+' },
  { label: 'Clients', value: '150+' },
];

const quickHighlights = [
  'Smart candidate matching',
  'Instant interview scheduling',
  'Secure dashboard insights',
];

const futureFeatures = [
  {
    title: 'Holographic dashboard',
    description: 'Visualize hiring metrics with interactive cards, glowing indicators, and instant actions.',
  },
  {
    title: 'Speedy candidate flow',
    description: 'From posting to onboarding, move talent through each stage with precision and velocity.',
  },
  {
    title: 'Live interview rooms',
    description: 'Join, review, and give feedback in the same interface without extra tools.',
  },
  {
    title: 'Data-driven insights',
    description: 'Make every decision with metrics, trends, and candidate signals at your fingertips.',
  },
];

const Home = () => {
  const heroLeftRef = useRef(null);
  const heroRightRef = useRef(null);
  const heroGlowRef = useRef(null);
  const scrollItemsRef = useRef([]);
  const progressRef = useRef(null);

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    scrollItemsRef.current = Array.from(document.querySelectorAll('[data-scroll-speed]'));

    let ticking = false;
    const handleScroll = () => {
      const scroll = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight - viewportHeight;

      if (progressRef.current) {
        progressRef.current.style.width = `${Math.min(100, (scroll / documentHeight) * 100)}%`;
      }

      scrollItemsRef.current.forEach((element) => {
        const speed = parseFloat(element.dataset.scrollSpeed) || 0;
        const axis = element.dataset.scrollAxis || 'y';
        const rotate = element.dataset.scrollRotate === 'true';
        const rect = element.getBoundingClientRect();
        const visible = Math.min(Math.max((viewportHeight - rect.top) / viewportHeight, 0), 1);

        let transform = '';
        if (axis === 'x') {
          transform = `translate3d(${scroll * speed}px, 0, 0)`;
        } else {
          transform = `translate3d(0, ${scroll * speed}px, 0)`;
        }

        if (rotate) {
          const rotation = Math.sin(scroll * 0.001) * 4;
          transform += ` rotate(${rotation}deg)`;
        }

        element.style.transform = transform;
        if (element.dataset.scrollFade === 'true') {
          element.style.opacity = `${0.25 + visible * 0.75}`;
        }
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-[#030914] text-white">
        <div className="absolute inset-0">
          <img
            src={BackImg}
            className="h-full w-full object-cover opacity-20 saturate-150"
            alt="Futuristic background"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#020611]/95 via-[#03192a]/85 to-[#020914]/95" />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 overflow-hidden bg-white/10">
          <div
            ref={progressRef}
            className="h-full w-0 bg-gradient-to-r from-[#67e8f9] via-[#0A66C2] to-[#0A66C2] transition-all duration-200"
          />
        </div>
        <div
          ref={heroLeftRef}
          data-scroll-speed="0.18"
          data-scroll-axis="y"
          data-scroll-rotate="true"
          className="absolute left-[-16%] top-14 h-72 w-72 rounded-full bg-[#0A66C2]/20 blur-3xl animate-drift"
        />
        <div
          ref={heroRightRef}
          data-scroll-speed="0.12"
          data-scroll-axis="y"
          data-scroll-rotate="true"
          className="absolute right-8 top-32 h-64 w-64 rounded-full bg-[#67e8f9]/25 blur-3xl animate-drift animate-delay-200"
        />
        <div
          ref={heroGlowRef}
          data-scroll-speed="0.06"
          data-scroll-axis="y"
          data-scroll-fade="true"
          className="absolute left-1/2 top-36 h-[450px] w-[450px] -translate-x-1/2 rounded-full border border-[#0A66C2]/15"
        />
        <div data-scroll-speed="0.08" data-scroll-axis="x" className="absolute right-16 bottom-20 h-40 w-40 rounded-full border border-[#67e8f9]/20 blur-2xl" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24">
          <span className="inline-flex rounded-full border border-[#67e8f9]/30 bg-[#67e8f9]/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-[#8dd7ff] backdrop-blur-xl shadow-[0_20px_60px_rgba(20,76,142,0.12)] reveal-on-scroll animate-delay-100">
            Futuristic recruitment engine
          </span>

          <h1 className="mt-8 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl reveal-on-scroll reveal-up animate-delay-200">
            Build hiring experiences that feel like tomorrow.
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg reveal-on-scroll reveal-up animate-delay-300">
            Connect with elite talent, run immersive live interviews, and manage every recruitment step through one luminous, motion-driven workspace.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row reveal-on-scroll reveal-up animate-delay-400">
            <Link
              to="/register"
              className="inline-flex h-14 items-center justify-center rounded-full bg-gradient-to-r from-[#0A66C2] to-[#67e8f9] px-8 text-base font-semibold text-slate-900 shadow-[0_20px_70px_rgba(10,102,194,0.3)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_80px_rgba(10,102,194,0.38)]"
            >
              Start hiring
            </Link>
            <Link
              to="/login"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/15 bg-white/10 px-8 text-base font-semibold text-white transition duration-200 hover:border-[#67e8f9]/40 hover:bg-white/15"
            >
              Explore demo
            </Link>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {quickHighlights.map((item, index) => (
              <div
                key={item}
                className="rounded-[2rem] border border-white/10 bg-white/5 px-6 py-5 text-sm font-semibold text-slate-100 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl reveal-on-scroll reveal-up"
                style={{ animationDelay: `${220 + index * 120}ms` }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#06172b] py-20 reveal-on-scroll reveal-up">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8 text-center shadow-[0_22px_70px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:bg-white/10"
                style={{ animationDelay: `${120 + index * 100}ms` }}
              >
                <p className="text-4xl font-semibold text-white md:text-5xl">{stat.value}</p>
                <p className="mt-3 text-sm uppercase tracking-[0.18em] text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#020914] py-24 reveal-on-scroll reveal-up">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <span className="text-sm uppercase tracking-[0.35em] text-[#67e8f9]">Why we feel futuristic</span>
              <h2 className="mt-6 text-4xl font-bold text-white sm:text-5xl">
                Interactive systems, full transparency, real hiring velocity.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Use predictive shortlisting, instant interview rooms, and dashboard insights that look as dynamic as your next hire.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {futureFeatures.map((item, index) => (
                  <div
                    key={item.title}
                    className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-slate-100 shadow-[0_22px_70px_rgba(0,0,0,0.18)] reveal-on-scroll reveal-left"
                    style={{ animationDelay: `${120 + index * 80}ms` }}
                  >
                    <p className="text-base font-semibold text-white">{item.title}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 reveal-on-scroll reveal-right">
              <div className="relative overflow-hidden rounded-[2.5rem] border border-[#67e8f9]/10 bg-[#071729]/90 p-8 shadow-[0_30px_90px_rgba(10,102,194,0.24)]">
                <div className="absolute -right-10 top-10 h-36 w-36 rounded-full bg-[#67e8f9]/20 blur-3xl" />
                <div className="grid gap-5 rounded-[2rem] bg-[#041427]/80 p-6">
                  <div className="flex items-center justify-between rounded-[1.75rem] border border-white/10 bg-white/5 p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-[#67e8f9]">Live room</p>
                      <p className="mt-2 text-xl font-semibold">Interview Hub</p>
                    </div>
                    <div className="rounded-3xl bg-[#0a66c2]/15 px-4 py-3 text-sm text-[#8dd7ff]">Active</div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 text-slate-100">
                      <p className="text-sm uppercase tracking-[0.28em] text-[#81d8f7]">Pipeline</p>
                      <p className="mt-3 text-3xl font-semibold text-white">42</p>
                      <p className="mt-2 text-sm text-slate-400">Active candidates</p>
                    </div>
                    <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 text-slate-100">
                      <p className="text-sm uppercase tracking-[0.28em] text-[#81d8f7]">Speed</p>
                      <p className="mt-3 text-3xl font-semibold text-white">2.1x</p>
                      <p className="mt-2 text-sm text-slate-400">Faster shortlists</p>
                    </div>
                  </div>

                  <div className="mt-2 rounded-[2rem] border border-white/10 bg-[#0a1a33]/90 p-6 text-slate-200">
                    <p className="text-sm uppercase tracking-[0.28em] text-[#67e8f9]">Workflow preview</p>
                    <div className="mt-4 grid gap-3">
                      <div className="flex items-center justify-between rounded-3xl bg-[#0f2a4d]/80 px-4 py-3 text-sm">
                        <span>Candidate review</span>
                        <span className="font-semibold text-[#8dd7ff]">On track</span>
                      </div>
                      <div className="flex items-center justify-between rounded-3xl bg-[#0f2a4d]/80 px-4 py-3 text-sm">
                        <span>Interview scheduling</span>
                        <span className="font-semibold text-[#b5d5ff]">Instant</span>
                      </div>
                      <div className="flex items-center justify-between rounded-3xl bg-[#0f2a4d]/80 px-4 py-3 text-sm">
                        <span>Offer approvals</span>
                        <span className="font-semibold text-[#a5f0d7]">Secure</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#06172b] py-24 reveal-on-scroll reveal-up">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white md:text-4xl">More than a dashboard</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-300">Motion-driven UI, gesture-inspired patterns, and clear actions for every hiring persona.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((service, index) => (
              <Card
                key={service.title}
                hover
                className={`flex min-h-[320px] flex-col justify-between rounded-[2rem] border border-[#2d557d] bg-gradient-to-br from-[#061427] via-[#0f2140] to-[#07172f] p-8 text-white shadow-[0_36px_120px_rgba(2,15,31,0.4)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[#67e8f9]/40 hover:bg-[#0f2140]/95 reveal-on-scroll`}
                style={{ animationDelay: `${140 + index * 120}ms` }}
              >
                <span className="inline-flex rounded-full bg-[#0c3256]/95 px-3 py-2 text-xs uppercase tracking-[0.28em] text-[#7de0ff]">
                  {service.title}
                </span>
                <h3 className="mt-6 text-2xl font-semibold text-white">{service.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-slate-200">{service.description}</p>
                <Link
                  to={service.link}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#7de0ff] transition hover:text-white"
                >
                  {service.cta} →
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
