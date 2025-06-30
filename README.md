# Dev-Blog

A modern, full-stack blog platform for developers to share knowledge and experiences. Built with **Next.js (App Router)** for the frontend and **NestJS** for the backend, it features robust authentication, dynamic content, and a clean, responsive UI.

---

## 🚀 Project Setup

### Initialization

- **Frontend:** Bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app) using the App Router.
- **Backend:** (Not included in this repo) — it is a separate [NestJS](https://nestjs.com/) project.

### UI Library & Styling

- **UI Framework:** [Material UI (MUI)](https://mui.com/) via `@mui/material` and `@emotion/react`.
- **Custom Styles:** Modular SCSS with a clear structure:
  - Global styles: `src/app/styles/global.scss`
  - Variables: `src/app/styles/scss/_variables.scss`
  - Component/page partials: `src/app/styles/scss/components/`, `src/app/styles/scss/pages/`
- **Fonts:** Google Fonts (Montserrat, Inter).

### Scripts

| Script  | Description              |
| ------- | ------------------------ |
| `dev`   | Start development server |
| `build` | Build for production     |
| `start` | Start production server  |
| `lint`  | Run ESLint               |

```bash
# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_API_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_REVALIDATE_SECRET=your-secret
```

---

## 🧭 Routing Overview

| Route                  | Description                  | Protection |
| ---------------------- | ---------------------------- | ---------- |
| `/`                    | Homepage, lists all posts    | Public     |
| `/posts/[postId]`      | View a single post (dynamic) | Public     |
| `/login`               | Login page                   | Public     |
| `/register`            | Registration page            | Public     |
| `/create-post`         | Create a new post            | Protected  |
| `/posts/edit/[postId]` | Edit your own post           | Protected  |

- **Dynamic Routing:** Uses Next.js App Router conventions for `[postId]`.
- **Middleware:** `src/middleware.ts` protects `/create-post` and `/posts/edit/[postId]` routes by checking for a valid JWT and user info in cookies. Unauthenticated users are redirected to `/login`.

---

## 🧩 UI Components

### Structure

- All components are in `src/components/`, grouped by domain:
  - `general/` — BlogCard, BlogNav, BlogInput, BlogFooter, BlogToast, BlogLoader, BlogSkeleton, BlogTagpicker, BlogTextarea, BlogBtn, BlogLogo, BlogPagination, BlogScroll, BlogFilter, BlogViewpage, BlogSpinner
  - `forms/` — FormBtn, FormHeader
  - `modal/` — ModalDelete, ModalLoading, ModalLogout, ModalPortal
  - `homepage/` — HomeStat
  - `static/` — StaticHomepage

### Design Patterns

- **Reusable, semantic components** (e.g., `BlogCard`, `BlogInput`).
- **BEM-inspired class naming** in SCSS for scalability.
- **Props-driven** and composable for flexibility.
- **Feedback components**: Toasts, skeleton loaders, modals.

---

## 🔄 Data Fetching Strategy

- **Homepage & Post Pages:** Use `fetch` in server components with `export const revalidate = 60;` for [Incremental Static Regeneration (ISR)](https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration).
- **Mutations & Queries:** [React Query](https://tanstack.com/query/latest) (`@tanstack/react-query`) for client-side data fetching, caching, and mutations (create, edit, delete posts).
- **API Layer:** All API calls are centralized in `src/services/api.ts` (Axios instance with JWT injection).
- **Revalidation:** After mutations, triggers `/api/revalidate` to update static content.

---

## 🔐 Authentication Flow

- **Login/Registration:** Forms use React Hook Form + Yup validation. On success, JWT and user info are stored in:
  - `localStorage` (for API requests)
  - Cookies (for middleware route protection)
- **JWT Handling:** Decoded and expiry-checked via Zustand store (`src/lib/store/auth-store.ts`).
- **Protected Routes:** Middleware checks for valid JWT and user info in cookies.
- **Logout:** Clears localStorage and cookies, updates global state, and redirects to `/`.
- **Auth Persistence:** Zustand with `persist` middleware ensures auth state survives reloads.

---

## 🌐 State Management

- **Global State:** [Zustand](https://zustand-demo.pmnd.rs/) for:
  - Auth state (`auth-store.ts`)
  - UI state (toasts, modals) (`general-store.ts`, `modal-store.ts`)
- **Provider Tree:** All providers are composed in `src/providers/provider-tree.ts` and injected at the root layout.

---

## 🧠 User Experience

- **Loading States:** Skeletons, spinners, and modal overlays for async actions.
- **Error Handling:** Toast notifications for errors and validation feedback.
- **Responsiveness:** Fluid layouts, mobile-first SCSS, and MUI breakpoints.
- **Accessibility:** Semantic HTML, focus management, and ARIA where appropriate.

---

## 📁 Folder Structure

```
src/
  app/
    (forms)/           # Auth and post forms (login, register, create-post)
    posts/             # Dynamic and edit post routes
    styles/            # SCSS (global, variables, components, pages)
    api/               # API route for revalidation
    providers/         # React context providers
    middleware.ts      # Route protection logic
    layout.tsx         # Root layout
    app.tsx            # App shell (nav, footer, toasts)
    page.tsx           # Homepage
  components/
    general/           # BlogCard, BlogNav, BlogInput, etc.
    forms/             # FormBtn, FormHeader
    modal/             # Modal components
    homepage/          # Homepage-specific components
    static/            # Static homepage content
  hooks/               # Custom React hooks (auth, post)
  lib/
    actions/           # Validation schemas, date formatting, etc.
    store/             # Zustand stores (auth, general, modal)
  services/            # API (Axios) config
  types/               # TypeScript types
```

- **Naming:** Semantic, domain-driven, and BEM for styles.
- **Modularity:** Clear separation of concerns (UI, state, logic, types).

---

## 🎨 Styles

- **SCSS:** Modular, with variables for colors, fonts, and spacing.
- **Component/Page Partials:** Grouped for maintainability.
- **Responsive Mixins:** Used for breakpoints and fluid layouts.
- **No Tailwind/Chakra:** Pure SCSS + MUI for design system.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React 19, TypeScript
- **UI:** Material UI (MUI), SCSS Modules, Google Fonts
- **State:** Zustand, React Query
- **Forms:** React Hook Form, Yup
- **API:** Axios
- **Backend:** NestJS (assumed, not included)
- **Auth:** JWT (localStorage + cookies)
- **Linting:** ESLint, TypeScript

---
