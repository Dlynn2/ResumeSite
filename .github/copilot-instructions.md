# GitHub Copilot Custom Instructions for Resume Site

## Project Overview

This is a personal resume/portfolio website built with React, TypeScript, and Vite. The site showcases professional experience, skills, projects, and includes interactive features like GitHub activity, Spotify integration, and analytics. The site uses a modern single-page scrolling experience with GSAP-powered animations.

## React & TypeScript Patterns

- Use functional components with TypeScript interfaces for props
- Leverage React hooks: `useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`
- Define proper TypeScript types for all props, state, and function parameters
- Use type-safe component patterns with explicit return types when beneficial
- Export components as default when they're the primary export of a file
- Always write code as a senior React developer would, following modern best practices

## Animation & Scroll Effects

- Use **GSAP** with **ScrollTrigger** for scroll-based animations
- Register ScrollTrigger plugin: `gsap.registerPlugin(ScrollTrigger)`
- Clean up ScrollTrigger instances in useEffect cleanup functions
- Use `gsap.from()` for scroll-triggered entrance animations
- Use `gsap.to()` for continuous animations and parallax effects
- Set ScrollTrigger with common options:
  - `trigger`: element to watch
  - `start: 'top 80%'` for when animation should start
  - `toggleActions: 'play none none reverse'` for animation behavior
  - `scrub: 1` for parallax effects that sync with scroll
- Use Framer Motion for simple component-level animations
- Keep animations smooth: 0.8-1.2s duration for entrance animations
- Use easing functions: `power3.out`, `power2.inOut`, `back.out(1.4)` for engaging effects

## Visual Design System

- Use gradient backgrounds for sections with alternating color schemes
- Create depth with layered backgrounds and blur effects
- Implement text gradients for headings using `WebkitBackgroundClip` and `WebkitTextFillColor`
- Use theme-aware gradients that adapt to light/dark mode
- Create floating animation effects for decorative elements
- Add parallax scrolling for background elements
- Use MUI's enhanced shadow system for depth
- Border radius default: 12px (defined in theme.shape.borderRadius)

## Single-Page Scroll Architecture

- Structure site as one page with multiple full-height sections
- Each section should have unique `id` for smooth scroll navigation
- Use `minHeight: '100vh'` for sections to ensure full-screen layout
- Navigation uses smooth scrolling to section IDs, not routing
- Calculate scroll position accounting for fixed navbar height (80px offset)
- Include scroll indicators and bounce animations for UX guidance

## Project Structure

- Components go in `src/components/` with related components in subdirectories
- Models/interfaces defined in `src/Models/` directory
- Use `.tsx` extension for React components, `.ts` for utilities and types
- Group related files (component + styles + types) in feature directories when appropriate
- Modal components should be in their own subdirectories (e.g., `EmailModal/`)

## Styling & Theming

- Use MUI's theme system for all colors and spacing
- Access theme via `useTheme()` hook
- Create theme-aware styles with conditional logic: `theme.palette.mode === 'dark' ? darkValue : lightValue`
- Use CSS Modules (`.module.scss`) for component-scoped styles when needed
- Maintain consistent styling patterns across components
- Ensure responsive design works on mobile, tablet, and desktop
- Use modern CSS features: flexbox, grid, CSS variables
- Typography system uses Inter font family with weight hierarchy

## Navigation

- Use anchor links with smooth scrolling instead of client-side routing
- Navigation should scroll to section IDs (`#home`, `#skills`, etc.)
- Implement smooth scroll with offset for fixed navbar
- Navigation should work on both mobile menu and desktop nav

## API Integration & Data Fetching

- Use `fetch` API or axios for HTTP requests
- Handle loading states and errors gracefully
- Implement proper error boundaries where appropriate
- Cache data when appropriate to reduce API calls
- Use environment variables for API keys and sensitive data

## Component Best Practices

- Keep components focused and single-responsibility
- Extract reusable logic into custom hooks
- Use props destructuring for cleaner component signatures
- Implement proper loading and error states for async operations
- Use React.memo() for components that render frequently with same props
- Clean up effects and event listeners in useEffect cleanup functions
- Always cleanup GSAP ScrollTrigger instances to prevent memory leaks

## Code Safety & TypeScript

- Always handle null/undefined checks for optional properties
- Use optional chaining `?.` and nullish coalescing `??` operators
- Define strict TypeScript interfaces for all data models
- Avoid using `any` type - use `unknown` or proper types
- Use type guards for runtime type checking when needed

## Accessibility & UX

- Add proper ARIA labels and semantic HTML
- Ensure keyboard navigation works correctly
- Provide meaningful alt text for images
- Use appropriate heading hierarchy (h1, h2, h3, etc.)
- Ensure sufficient color contrast for readability
- Make interactive elements clearly identifiable
- Add scroll indicators for single-page navigation

## Performance

- Lazy load heavy components when appropriate
- Optimize images and assets
- Minimize bundle size by avoiding unnecessary dependencies
- Use `useMemo` and `useCallback` to prevent unnecessary re-renders
- Implement efficient GSAP animations (use `will-change` CSS property for animated elements)
- Kill ScrollTrigger instances on unmount to prevent memory leaks

## Analytics & Integrations

- Analytics components should handle data visualization clearly
- GitHub integration should gracefully handle API rate limits
- Spotify integration should handle authentication and token refresh
- All third-party integrations should have proper error handling
