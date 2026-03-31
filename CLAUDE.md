# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static portfolio site for Jean-Baptiste Catois, deployed on GitHub Pages at `cassecatoisco.github.io/portfolio/`. No build step, no package manager — open `index.html` directly in a browser.

## Development

```bash
# Preview locally — just open the file
start index.html          # Windows
# or serve with any static server if needed

# Deploy — push to main branch triggers GitHub Pages automatically
rtk git add <files> && rtk git commit -m "..." && rtk git push
```

## Architecture

**Design system** — all tokens live in `css/variables.css` (`--bg`, `--text`, `--muted`, `--border`, `--accent`, font variables). Edit there first before touching any other CSS file.

**CSS load order matters** — `index.html` loads in this sequence:
1. `reset.css` — normalize only
2. `variables.css` — CSS custom properties
3. `layout.css` — body, container, 12-col grid (`.grid-12`, `.col-content`, `.col-aside`, `.col-date`, `.col-main`), nav, footer, responsive breakpoints
4. `components.css` — reusable atoms: `.btn-editorial`, `.tag`, `.level-tag`, `.reveal` animation, `.status-dot`
5. `sections.css` — section-specific styles (`.hero__*`, `.edu-item`, `.comp-item`, `.exp-item`, `.project-item`, `.skills__*`, `.contact__*`)

**Layout philosophy** — editorial/asymmetric dark theme. No `border-radius` on interactive elements, no `box-shadow` for decoration, no card backgrounds. Sections are separated by `border-top: 1px solid var(--border)` only. The 12-col grid is used asymmetrically: content typically spans `col-content` (cols 1–7) and metadata `col-aside` (cols 9–12).

**JS** — three vanilla IIFE scripts, no dependencies:
- `nav.js` — scroll shadow on `#nav`, burger menu toggle, active link tracking via `IntersectionObserver`
- `animations.js` — adds `.visible` to `.reveal` elements on scroll
- `main.js` — injects current year into `#year`

**Print version** — `print/index.html` is a self-contained document (inline `<style>`) with `@page { size: A4 }`, designed to be printed via Ctrl+P → Save as PDF. It does not share CSS with the main site.

## Assets to add manually

- `assets/docs/CV_JeanBaptiste_Catois.pdf` — linked in hero CTA and print version
- `assets/img/profile.jpg` — not currently referenced in HTML
