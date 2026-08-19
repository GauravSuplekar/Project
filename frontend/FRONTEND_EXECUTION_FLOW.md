# Frontend Execution Flow

This document explains how the frontend of `Recruitment-System-master` is executed, starting from `index.html` and moving through the React routing configuration in `src/main.jsx` and the app layout in `src/App.jsx`.

---

## 1. Browser Entry Point: `frontend/index.html`

Lines:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Recruitment System</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

Execution flow:
- The browser downloads and parses this HTML.
- The `div` with `id="root"` is the React mount target.
- The module script `/src/main.jsx` is loaded by Vite and executed.

---

## 2. React Root Initialization: `frontend/src/main.jsx`

Lines 1-6 import React, ReactDOM, React Router helpers, styles, and the route components.

Important imports:
- `React` and `ReactDOM` from React.
- `createBrowserRouter`, `createRoutesFromElements`, `Route`, and `RouterProvider` from `react-router-dom`.
- `App` as the top-level parent route layout.
- `Home`, `Login`, `Register`, plus all candidate/client/admin pages.

Lines 44-85 define the router with `createBrowserRouter(createRoutesFromElements(...))`.
This creates a route tree where every route is nested under `path='/'` and uses `App` as the layout.

The route configuration is:
- `/` → `Home`
- `/register/candidate` → `RegisterCandidate`
- `/login/candidate` → `LoginCandidate`
- `/login/client` → `LoginClient`
- `/register/client` → `RegisterClient`
- `/about` → `About`
- `/contact` → `Contact`
- `/login` → `Login`
- `/register` → `Register`
- `/client/add/requirement` → `AddRequirement`
- `/client/requirement` → `AllRequirement`
- `/client/applicants` → `AllApplicants`
- `/client/applicants/requirements/:requirementId` → `ApplicantsByRequirement`
- `/client/applicants/detail/:applicationId` → `ApplicantDetail`
- `/client/interview/schedule/:applicationId` → `AddInterview`
- `/client/interview/upcomming` → `UpcommingInterview`
- `/client/profile` → `ClientProfile`
- `/candidate/requirement` → `AvailableRequirement`
- `/candidate/requirement/detail/:requirementId` → `RequirementDetail`
- `/candidate/profile` → `CandidateProfile`
- `/candidate/profile/edit` → `EditCandidateProfile`
- `/candidate/application` → `AllApplication`
- `/candidate/application/detail/:applicationId` → `ApplicationDetail`
- `/candidate/interview/upcoming` → `JoinInterview`
- `/interview/start/:interviewId` → `InterviewClient`
- `/interview/join` → `InterviewCandidate`
- `/client/pay/:applicationId` → `Payment`
- `/login/admin` → `LoginAdmin`
- `/admin/client` → `ClientsForAdmin`
- `/admin/client/detail/:clientId` → `ClientDetails`
- `/admin/candidate` → `CandidatesForAdmin`
- `/admin/candidate/detail/:candidateId` → `CandidateDetails`
- `/admin/requirement` → `RequirementsForAdmin`
- `/admin/requirement/detail/:requirementId` → `RequirementDetailForAdmin`
- `/admin/profile` → `AdminProfile`
- `/forgot-password` → `ForgotPassword`
- `/reset-password` → `ResetPassword`

Lines 91-96 mount React:
```js
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
```

Execution flow:
1. `document.getElementById('root')` selects the root `div` from `index.html`.
2. `ReactDOM.createRoot(...).render(...)` creates the React app.
3. `RouterProvider` receives the router object and starts route matching.
4. The current browser URL is matched against the configured route tree.
5. The matching route renders the route's element.
6. The parent route element is `App`, so `App` always renders first for every path.

---

## 3. Top-level Layout and Route Rendering: `frontend/src/App.jsx`

Lines 1-5 import React Router helper hooks and layout components:
- `Outlet` renders the matched child route.
- `useLocation` reads the current URL path.
- `Header`, `Footer`, `ClientSideBar`, `CandidateSideBar`, `AdminSideBar`, `DashboardLayout` are layout pieces.

Line 7: `function App() {` defines the top-level application layout.

Line 8: `const location = useLocation();`
- This hook returns the current location object.
- `location.pathname` is used to decide which visual layout to render.

Lines 10-17 compute boolean flags from the current path:
- `isLogin`: true when path starts with `/login`
- `isRegister`: true when path starts with `/register`
- `isForgotPassword`: true when path starts with `/forgot-password`
- `isResetPassword`: true when path starts with `/reset-password`
- `isInterview`: true when path starts with `/interview`
- `isClient`: true when path starts with `/client`
- `isCandidate`: true when path starts with `/candidate`
- `isAdmin`: true when path starts with `/admin`

Lines 19-21:
```js
  if (isLogin || isRegister || isInterview || isForgotPassword || isResetPassword) {
    return <Outlet />;
  }
```
- For login/register/interview/password pages, `App` returns only the `Outlet`.
- That means the currently matched child route is rendered alone, with no header/footer/sidebar.

Lines 23-25:
```js
  if (isClient) {
    return <DashboardLayout sidebar={ClientSideBar} title="Client Portal" />;
  }
```
- For `/client/*` URLs, `App` returns `DashboardLayout` with the client sidebar.
- `DashboardLayout` internally renders the `Outlet` plus the sidebar and topbar.

Lines 27-29:
```js
  if (isCandidate) {
    return <DashboardLayout sidebar={CandidateSideBar} title="Candidate Portal" />;
  }
```
- For `/candidate/*` URLs, it renders the candidate dashboard layout.

Lines 31-33:
```js
  if (isAdmin) {
    return <DashboardLayout sidebar={AdminSideBar} title="Admin Portal" />;
  }
```
- For `/admin/*` URLs, it renders the admin dashboard layout.

Lines 35-41:
```js
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
```
- For all other paths, `App` renders the public website layout.
- `Header` appears at the top, `Footer` at the bottom, and the route-specific component appears in between via `<Outlet />`.

Execution flow inside `App`:
- `App` is always the parent route entry.
- It checks the current route type based on the URL.
- It uses conditional rendering to select one of:
  - login/register/interview/password pages without layout
  - client dashboard layout
  - candidate dashboard layout
  - admin dashboard layout
  - public site layout with header/footer
- The matched route component is inserted at the `Outlet` position.

---

## 4. Route Layout Behavior

### Public pages
Routes such as `/`, `/about`, `/contact`, `/login`, `/register` and `/register/client` are rendered inside the public site layout.
- `Header` renders first.
- `Outlet` renders the page component.
- `Footer` renders last.

### Authentication and interview pages
Routes such as `/login`, `/register`, `/login/admin`, `/forgot-password`, `/reset-password`, `/interview/start/:interviewId`, and `/interview/join` render only the child route component.
- `App` returns `<Outlet />` directly.
- No header/footer/sidebar is added.

### Client dashboard pages
Routes under `/client/*` render with `DashboardLayout` and `ClientSideBar`.
- Example: `/client/profile` renders `ClientProfile` as the outlet inside the client dashboard.
- Example: `/client/add/requirement` renders `AddRequirement`.

### Candidate dashboard pages
Routes under `/candidate/*` render with `DashboardLayout` and `CandidateSideBar`.
- Example: `/candidate/requirement` renders `AvailableRequirement`.
- Example: `/candidate/application` renders `AllApplication`.

### Admin dashboard pages
Routes under `/admin/*` render with `DashboardLayout` and `AdminSideBar`.
- Example: `/admin/client` renders `ClientsForAdmin`.
- Example: `/admin/profile` renders `AdminProfile`.

---

## 5. Build and dependency flow

### `frontend/package.json`
- `dev`: starts Vite development server.
- `build`: builds production assets with Vite.
- `preview`: serves the built output with the Vite preview server.

Dependencies relevant to runtime:
- `react` and `react-dom`: the React framework.
- `react-router-dom`: client-side routing and navigation.
- `axios`: HTTP requests to the backend.
- `jwt-decode`: decoding JSON Web Tokens.
- `moment`: date/time formatting.
- `@zegocloud/zego-uikit-prebuilt`: interview/video UI components.

Dev dependencies:
- Vite, Tailwind CSS, ESLint, React plugin.

---

## 6. Exact execution order when the app starts

1. Browser opens `frontend/index.html`.
2. Vite loads `/src/main.jsx` as a module.
3. `main.jsx` imports CSS and all route components.
4. `createBrowserRouter(...)` builds the route map.
5. `ReactDOM.createRoot(...).render(...)` mounts React into `#root`.
6. `RouterProvider` begins routing.
7. Router matches the current browser URL.
8. `App` renders as the parent route component.
9. `App` computes flags from `location.pathname`.
10. `App` selects the proper layout.
11. The child route component is rendered at `<Outlet />`.
12. The final page is displayed.

---

## 7. Route table summary

| URL path | Component rendered | Layout type |
|---|---|---|
| `/` | `Home` | Public Header/Footer |
| `/about` | `About` | Public |
| `/contact` | `Contact` | Public |
| `/login` | `Login` | Plain outlet |
| `/register` | `Register` | Plain outlet |
| `/login/candidate` | `LoginCandidate` | Plain outlet |
| `/register/candidate` | `RegisterCandidate` | Plain outlet |
| `/login/client` | `LoginClient` | Plain outlet |
| `/register/client` | `RegisterClient` | Plain outlet |
| `/login/admin` | `LoginAdmin` | Plain outlet |
| `/forgot-password` | `ForgotPassword` | Plain outlet |
| `/reset-password` | `ResetPassword` | Plain outlet |
| `/client/*` | Client pages | `DashboardLayout` + `ClientSideBar` |
| `/candidate/*` | Candidate pages | `DashboardLayout` + `CandidateSideBar` |
| `/admin/*` | Admin pages | `DashboardLayout` + `AdminSideBar` |
| `/interview/*` | Interview pages | Plain outlet |

---

## 8. Notes

- The actual page components live under `frontend/src/components/*`.
- They are only imported into `main.jsx` and rendered by route matching.
- The `App` component is the central switch that chooses the layout based on URL prefix.
- `Outlet` is the mechanism through which matched route components are inserted.

If you want, I can also produce a second document that expands this flow into the major component trees for public, client, candidate, and admin pages.