# React Admin POC – Requirements Document (v1.0)

## 1) Purpose

Build a simple, clean React POC that demonstrates a login flow, a top navigation bar, and an Admin area with a **Users** CRUD table. The POC should be easy to understand, follow good practices, and be production‑lean (but not over‑engineered).

---

## 2) Goals & Non‑Goals

**Goals**

* Mock login → protected app routes.
* Global layout with top navbar: menus (Dashboard, Admin → Users/Roles/Settings), profile menu (name, email, today's date, logout).
* Admin → Users: table with **CRUD**, **pagination**, **sorting (select columns)**, **global text search** (across string fields), and **delete confirmation**.
* Clean folder structure, sensible abstractions, and basic accessibility.

**Non‑Goals**

* Real backend/auth (use localStorage/mock service for POC).
* Complex RBAC/permissions beyond basic Admin area.
* Advanced design system or component library; keep it lightweight.

---

## 3) Personas / Roles

* **Authenticated User**: Can access dashboard and profile menu.
* **Admin User**: Can access Admin section (Users, Roles, Settings). For POC, treat any logged‑in user as Admin.

---

## 4) High‑Level Architecture

* **Client**: React 18, React Router (v6+). Optional Tailwind CSS for styling.
* **State**: Component/local state + simple utilities; avoid heavy state libs.
* **Data**: localStorage‑backed repositories for users and session.
* **Routing**: Public (Login) and Private (Dashboard, Admin/\*).

---

## 5) Functional Requirements

### 5.1 Authentication (Mock)

* **Login Page**: email + password inputs; simple client‑side validation (email format, non‑empty password).
* **On success**: Save `{ id, name, email }` to localStorage as session and redirect to `/`.
* **Protected Route**: Blocks access to app routes if not logged in; redirects to `/login`.
* **Logout**: Clears session, navigates to `/login`.

### 5.2 Global Layout / Navbar

* Sticky top navbar with:

  * **Left**: App logo/title → navigating to Dashboard.
  * **Center/Left**: Menus: **Dashboard**, **Admin** (dropdown: Users, Roles, Settings).
  * **Right**: **Profile menu** with: display name, email, today's date, **Logout** button.
* Active route visibly highlighted.

### 5.3 Navigation & Routes

* `/login` (public)
* `/` → Dashboard (protected)
* `/admin/users` (protected)
* `/admin/roles` (protected, placeholder page)
* `/admin/settings` (protected, placeholder page)

### 5.4 Profile Menu

* Shows session user's **name**, **email**, **today's date** (derived at render).
* **Logout** option at bottom.

### 5.5 Admin → Users (CRUD Table)

**Table Columns (baseline)**

* **Name** (string)
* **Email** (string)
* **Role** (string; Admin/Editor/Viewer)
* **Status** (string; Active/Inactive)
* **Created At** (ISO string → friendly date in UI)

> **Note**: You can add/rename columns later. Please confirm any additional columns you want in this POC.

**Actions**

* **Add User** (button above table) → opens modal/drawer with form fields (Name, Email, Role, Status). On save, append to dataset and persist to localStorage.
* **Edit** (per‑row) → opens modal with existing values; save updates row.
* **Delete** (per‑row) → shows confirmation modal (`Are you sure? This can't be undone.`). On confirm: remove row.

  * *(Optional)* Soft‑delete + **Undo** snackbar within 5s.

**Search**

* Single **global search input** above table. Filters rows by substring across **string columns only** (Name, Email, Role, Status).

**Sorting**

* Clickable header sort for selected columns: Name, Email, Role, Status, Created At (toggle asc/desc).

**Pagination**

* Default **10 rows/page**; selector for 10/25/50.
* Controls: first/prev/next/last.

**Validation**

* Name required (min 2 chars), Email required + valid format, Role required, Status required.
* Duplicate email check (warn + block).

**Empty/Loading States**

* If no data, display friendly empty state with CTA to **Add User**.
* Optional 300–500ms fake latency for UX realism.

---

## 6) Non‑Functional Requirements

**UX & Accessibility**

* Keyboard focus states; ESC closes modals; Enter submits forms.
* Labels associated with inputs; proper ARIA attributes on dialogs.

**Performance**

* Keep bundle minimal; avoid unnecessary re‑renders (memoization for table rows if needed).

**Security (POC‑Level)**

* No real auth; don't store sensitive data.
* Avoid dangerous HTML injection; sanitize user inputs displayed in UI.

**Responsiveness / Layout**

* Works on 1280px desktop; degrades reasonably to \~360px (stacked navbar menu).

**Browser Support**

* Latest Chrome/Edge; basic Safari/Firefox.

**Code Quality**

* ESLint + Prettier defaults. Small, focused components. No dead code.

---

## 7) Data Model

**User**

```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "role": "Admin|Editor|Viewer",
  "status": "Active|Inactive",
  "createdAt": "ISO string"
}
```

**Session**

```json
{
  "id": "uuid",
  "name": "string",
  "email": "string"
}
```

---

## 8) Data Layer / APIs (Mocked)

* Local repository module wrapping **localStorage** with keys:

  * `react-poc-auth` for session
  * `react-poc-users` for users
* Provide CRUD methods: `listUsers({ search, sortBy, sortDir, page, pageSize })`, `createUser`, `updateUser`, `deleteUser`.
* Seed with \~5 example users on first load if storage empty.

---

## 9) State Management

* Prefer local/component state with props lifting where needed.
* Memoize derived lists (filtered, sorted, paginated) to keep table snappy.

---

## 10) Project Structure (suggested)

```
src/
  components/
    layout/AdminNavbar.tsx
    ui/Button.jsx
    ui/Modal.jsx
    ui/Input.jsx
    ui/ConfirmDialog.jsx
    users/UserForm.jsx
    users/UsersTable.jsx
  pages/
    Login.jsx
    Dashboard.jsx
    AdminUsers.jsx
    AdminRoles.jsx
    AdminSettings.jsx
  routes/ProtectedRoute.jsx
  data/usersRepo.js
  data/authRepo.js
  App.jsx
  main.jsx
```

---

## 11) Tooling & Conventions

* **Build**: Vite (preferred) or CRA.
* **Routing**: `react-router-dom@6`.
* **Styling**: Tailwind (optional), else minimal CSS modules.
* **Icons**: simple text/emoji to keep dependencies minimal.
* **Formatting/Lint**: Prettier, ESLint (recommended config).

---

## 12) Testing & QA (Lightweight)

* Smoke tests: render login, route protection, users CRUD happy path.
* Table behaviors: search filters, sort toggles, pagination page changes.
* Basic form validation tests.

---

## 13) Acceptance Criteria (✔ means must‑have)

### Auth

* ✔ Login form validates and stores session; redirects to `/`.
* ✔ Protected routes redirect unauthenticated users to `/login`.
* ✔ Logout clears session and returns to `/login`.

### Layout / Navbar

* ✔ Navbar visible on protected pages; Admin menu routes work.
* ✔ Profile menu shows name, email, **today's date**, and Logout.

### Users Table

* ✔ Add/Edit/Delete works with local persistence.
* ✔ Delete shows a **confirmation** dialog.
* ✔ Global search filters by Name/Email/Role/Status.
* ✔ Sort works on Name/Email/Role/Status/CreatedAt (asc/desc).
* ✔ Pagination: default 10/page, switchable to 25/50.
* ✔ Basic form validation and duplicate email prevention.

---

## 14) Open Questions

1. Final list of **Users table columns** (you will provide). Any custom fields?
2. Do you want **soft delete + undo** or hard delete only?
3. Should Roles/Settings pages show any minimal content beyond placeholders?
4. Do you want a **Dark Mode** toggle for the POC?

---

## 15) User Rules & Constraints

* **DO NOT start working on task or implement anything without asking**
* **NEVER change any existing CSS or styles without asking**
* **NEVER remove any code without asking**

---

## 16) Future Enhancements (Optional)

* Real auth (JWT) + Role‑based access control.
* Server‑side pagination/filtering.
* CSV export & column chooser.
* Activity log/notifications.
* Reusable table component abstraction.

---

## 17) Risks & Mitigations

* **Scope creep** → Keep to POC acceptance criteria; log extras under Future Enhancements.
* **Design inconsistency** → Use shared UI primitives (Button, Modal, Input) early.
* **Performance on large lists** → Memoization; consider virtualization later if needed.

---

## 18) Definition of Done (DoD)

* Meets all **Acceptance Criteria**.
* Linted & formatted code; no console errors.
* README with setup/run instructions.
* Short demo walkthrough notes/screens.

---

## 19) Development Guidelines

### Code Organization
- Use functional components with hooks
- Keep components small and focused (single responsibility)
- Extract reusable UI components early
- Use meaningful variable and function names

### State Management
- Prefer local state over global state
- Use useMemo for expensive calculations
- Use useCallback for event handlers passed to child components
- Lift state up only when necessary

### Styling Approach
- Use Tailwind CSS for rapid prototyping
- Create consistent spacing and color schemes
- Ensure responsive design from the start
- Use CSS custom properties for theme values

### Error Handling
- Implement proper error boundaries
- Show user-friendly error messages
- Log errors for debugging
- Handle loading and empty states gracefully

### Performance Considerations
- Implement React.memo for expensive components
- Use virtualization for large lists if needed
- Optimize re-renders with proper dependency arrays
- Lazy load routes when appropriate

---

## 20) Technical Specifications

### Dependencies
```json
{
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "react-router-dom": "^6.0.0",
  "tailwindcss": "^3.0.0",
  "vite": "^4.0.0",
  "@vitejs/plugin-react": "^3.0.0"
}
```

### Environment Setup
- Node.js 16+ required
- Use npm or yarn for package management
- Configure ESLint and Prettier
- Set up Vite for fast development

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 21) Implementation Phases

### Phase 1: Foundation
1. Set up project structure with Vite
2. Configure routing and basic layout
3. Implement authentication flow
4. Create protected routes

### Phase 2: Core Features
1. Build top navigation with profile menu
2. Implement dashboard page
3. Create admin layout structure
4. Add placeholder pages for roles and settings

### Phase 3: Users Management
1. Build users table with basic CRUD
2. Implement search and sorting
3. Add pagination controls
4. Create user form modal

### Phase 4: Polish & Testing
1. Add form validation
2. Implement delete confirmation
3. Add loading and empty states
4. Basic accessibility improvements
5. Code cleanup and documentation

---

## 22) Success Metrics

- All acceptance criteria met
- No console errors or warnings
- Responsive design works on target devices
- Code is maintainable and well-documented
- Performance is acceptable for POC scope
- Accessibility basics implemented

---

*This document serves as the single source of truth for the React Admin POC project. Any changes or clarifications should be updated here and communicated to all stakeholders.*
