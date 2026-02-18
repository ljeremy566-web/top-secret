# Agent Guidelines for legacy-window

## Project Overview

This is a React 19 + TypeScript + Vite project with Tailwind CSS 4. It's a business website for a window tinting service featuring 3D car visualization with Three.js.

---

## Build, Lint, and Test Commands

### Development
```bash
npm run dev          # Start Vite dev server with HMR
```

### Building
```bash
npm run build        # Run TypeScript build check, then Vite build
npm run preview      # Preview production build locally
```

### Linting
```bash
npm run lint         # Run ESLint on all files
```

### Testing
**No test framework is currently configured.** If you need to add tests:
- Recommended: `vitest` for unit/component tests
- Run single test file: `npx vitest run src/path/to/test.ts`
- Run tests in watch mode: `npx vitest`

---

## Code Style Guidelines

### General Principles
- **Strict TypeScript**: All code must be type-safe. Use `strict: true` in tsconfig.
- **No unused code**: `noUnusedLocals` and `noUnusedParameters` are enforced.
- **ES2022+**: Target modern JavaScript with ESNext modules.

### File Naming
- **Components**: PascalCase (e.g., `HeroSection.tsx`, `CarWindow.tsx`)
- **Utilities/Hooks**: camelCase (e.g., `useAuth.ts`, `axios.ts`)
- **Directories**: lowercase with hyphens (e.g., `components/common`, `lib/`)
- **React components**: Use `.tsx` extension; pure TypeScript files use `.ts`

### Import Conventions
```typescript
// Group imports in this order:
import React/framework imports     // react-router-dom, framer-motion
import external libraries          // axios, three, animejs
import internal components          // ./components/...
import internal utils/hooks         // ./lib/..., ./hooks/...
import types/interfaces             // ./types/...

// Use type-only imports where appropriate
import type { User } from './types';
import { useState, type FC } from 'react';
```

### TypeScript Configuration
The project uses strict TypeScript with these key settings:
- `strict: true` - enable all strict type checking
- `verbatimModuleSyntax: true` - require `import type` for type-only imports
- `noUnusedLocals: true` - error on unused locals
- `noUnusedParameters: true` - error on unused parameters

### React Patterns
- Use functional components with arrow functions or `function` declarations
- Prefer `type` over `interface` for simple types, `interface` for extendable types
- Use `FC` (FunctionComponent) type for explicitly typed components
- Destructure props in component signatures

```typescript
// Good
interface HeroSectionProps {
  title: string;
  subtitle?: string;
}

const HeroSection: FC<HeroSectionProps> = ({ title, subtitle }) => {
  return <div>{title}</div>;
};

// Good - simple component without FC
function Header() {
  return <header>...</header>;
}
```

### Error Handling
- Use try/catch with async/await for API calls
- Always handle axios errors with proper typing
- Display user-friendly error messages in UI components

```typescript
// API error handling example
try {
  const response = await api.get('/data');
} catch (error) {
  if (axios.isAxiosError(error)) {
    console.error('API error:', error.message);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

### CSS/Tailwind
- Use Tailwind CSS 4 utility classes
- Avoid custom CSS files unless absolutely necessary
- Use arbitrary values sparingly

---

## ESLint Configuration

The project uses ESLint with these plugins:
- `@eslint/js` - Base JavaScript rules
- `typescript-eslint` - TypeScript-specific rules
- `eslint-plugin-react-hooks` - React Hooks rules
- `eslint-plugin-react-refresh` - Vite HMR compatibility

Run `npm run lint` before committing. Fix auto-fixable issues with:
```bash
npm run lint -- --fix
```

---

## Project Structure

```
src/
├── components/
│   ├── common/         # Reusable UI components
│   └── layouts/        # Layout components (MainLayout)
├── lib/                # Utilities (axios, api config)
├── pages/              # Route pages (HomePage, ServicesPage, etc.)
├── App.tsx             # Main app with routes
└── main.tsx            # Entry point
```

---

## Common Tasks

### Adding a new page
1. Create page component in `src/pages/`
2. Add route in `App.tsx`
3. Wrap with `PageTransition` for animations

### Adding a new component
1. Create in appropriate directory under `src/components/`
2. Export with PascalCase name
3. Use TypeScript interfaces for props

### Environment Variables
- Use `.env` files for local development
- Prefix with `VITE_` for client-side access
- Access via `import.meta.env.VITE_VAR_NAME`

---

## Dependencies

### Core
- React 19 + React DOM
- react-router-dom (routing)
- framer-motion (animations)

### UI/3D
- tailwindcss + @tailwindcss/vite
- three + @react-three/fiber + @react-three/drei (3D)
- lucide-react (icons)

### Data
- axios (HTTP client)
- animejs (animations)

### Dev
- vite + @vitejs/plugin-react-swc
- typescript + typescript-eslint
- eslint + react-hooks + react-refresh plugins
