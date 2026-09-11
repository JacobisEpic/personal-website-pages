# Jacob Chin - Personal Website

This repository contains the source code for my personal website and portfolio at [jacobchin.org](https://jacobchin.org/).
It is the version-controlled home for the site I use to present my engineering experience, selected projects, leadership work, and contact information.

## Overview

The site is a React and Vite single-page application with interactive 3D elements, animated sections, project cards, and static supporting pages for TimeMaxx.
It is designed to be lightweight, maintainable, and easy to deploy through GitHub Pages.

## What This Includes

- Portfolio sections for background, experience, projects, and contact.
- 3D scenes powered by Three.js, React Three Fiber, and Drei.
- Motion and section transitions powered by Framer Motion.
- Styling with Tailwind CSS and project-specific CSS.
- Static TimeMaxx pages under `public/timemaxx`.
- GitHub Pages custom domain support through `public/CNAME`.

## Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- Three.js
- React Three Fiber
- Framer Motion
- EmailJS

## Project Structure

```text
src/
  components/        React UI sections and reusable components
  components/canvas/ Three.js canvas components
  constants/         Portfolio content and project metadata
  assets/            Images, icons, logos, and visual assets
  hoc/               Section wrapper utilities
  utils/             Shared helpers

public/
  desktop_pc/        Public 3D desktop model assets
  planet/            Public 3D planet model assets
  timemaxx/          Static TimeMaxx product pages
  CNAME              Custom domain configuration
```

## Local Development

Install dependencies:

```bash
npm ci --legacy-peer-deps
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

The site is intended to deploy to GitHub Pages at `https://jacobchin.org/`.
The production build is generated with Vite and served from the repository's configured Pages workflow.
Detailed deployment notes live in [DEPLOYMENT.md](DEPLOYMENT.md).

Static assets in `public/` are copied directly into the production build.
The 3D model directories, including `public/desktop_pc` and `public/planet`, must remain publicly accessible because the Three.js loaders fetch those files at runtime.

## Repository Purpose

This repo is kept public as a clean history of the personal website itself.
It is not a scratchpad or private deployment notebook.
Operational notes, one-off debugging logs, and local hosting details should stay out of the README so the repository remains presentable to visitors, collaborators, and recruiters.
