# Claude Development Guide

This document contains important context for Claude AI when working on this project.

## Project Overview

This is a personal portfolio website for nullcoder (Thanan Traiongthawon). The site emphasizes minimal design with subtle interactions and hidden features.

## Design Principles

1. **Minimalism First**: Keep the design clean and focused
2. **Subtle Interactions**: Small delights without overwhelming
3. **Accessibility**: Ensure WCAG compliance and keyboard navigation
4. **Progressive Enhancement**: Site must work without JavaScript
5. **Performance**: No unnecessary dependencies or build tools

## Key Features

### Ghost Easter Egg

- **Desktop**: Type "ghost" to reveal the ghost mascot
- **Mobile**: Long press (1 second) on the logo
- **Revert**: Type "null" to switch back (desktop only)
- The ghost can be clicked/tapped to make it blink

### Logo Specifications

- Main logo: 100px × 100px on desktop, 80px × 80px on mobile
- Null symbol design with diagonal slash
- Transforms on interaction (rotate on click)

### Color Scheme

- Light mode: Black (#000) on white (#fff)
- Dark mode: White (#fff) on black (#000)
- Secondary text: #666 (light) / #999 (dark)
- Ensure contrast ratio ≥ 7:1 for WCAG AAA

## Code Style

- Use vanilla HTML, CSS, and JavaScript only
- No frameworks or build tools
- CSS variables for theming
- Semantic HTML elements
- Clear, descriptive class names

## Testing Checklist

When making changes, verify:

- [ ] Works without JavaScript
- [ ] Keyboard navigation functions properly
- [ ] Screen reader compatible
- [ ] Mobile touch interactions work
- [ ] Dark mode displays correctly
- [ ] Ghost easter egg triggers properly
- [ ] No console errors
- [ ] Passes WAVE accessibility check

## Deployment

The site is hosted on GitHub Pages at nullcoder.github.io with a custom domain nullcoder.net.

## AI Collaboration Note

This project is pair programmed with Claude AI. The footer reveals "Pair programmed with AI" on hover (desktop only), celebrating human-AI collaboration.
