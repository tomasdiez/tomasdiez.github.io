# tomasdiez.github.io

Personal site of Tomas Diez. Plain Jekyll, hand-written layouts and CSS,
built for the **native GitHub Pages build** — no custom plugins, no theme
gems, no JavaScript.

## Deploy

Push this repo to `github.com/tomasdiez/tomasdiez.github.io` (branch `main`),
then in the repo settings enable **Pages → Deploy from a branch → main /
(root)**. GitHub runs Jekyll in safe mode with the whitelisted plugins used
here (`jekyll-seo-tag`, `jekyll-sitemap`, `jekyll-feed`). Nothing else to
configure.

## Run locally (optional)

```
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`. The `github-pages` gem pins the same
versions GitHub uses in production.

## Where the content lives

| What | File |
|---|---|
| Home | `index.html` |
| Work (5 main projects) | `work.html` + `_data/projects.yml` |
| Research & teaching | `research.html` + `_data/publications.yml` |
| Writing index | `writing.html` + `_data/writing.yml` |
| About | `about.html` |
| Contact | `contact.html` |
| Header / footer | `_includes/header.html`, `_includes/footer.html` |
| Layouts | `_layouts/default.html`, `_layouts/page.html` |
| All styles | `assets/css/main.css` |

## Add an essay (the permanent record)

Essays live in `_essays/` and render at `/writing/slug/` with the `essay`
layout (assigned automatically via `_config.yml` defaults). They appear in
the "On this site" section of the Writing page. This is where graduated
RXTX transmissions land after a proper rewrite — citations, context, a
haircut. Three ways to add one:

1. **PagesCMS** (`.pages.yml` at repo root) → **Essays** collection.
2. `python3 ~/websites/tools/publish.py essay path/to/draft.md`
3. By hand: one `.md` file in `_essays/` with frontmatter:

```yaml
---
title: "The title"
date: 2026-08-01        # optional, defaults to today via publish.py
description: "One sentence for search engines and link previews."
venue: "First transmitted as TX-002."   # optional provenance note
---
Body in Markdown.
```

## Add a writing entry (external link)

Append a block to `_data/writing.yml` (newest goes first):

```yaml
- title: The title of the piece
  venue: Fab City blog
  year: 2026        # optional
  url: https://...
  note: Spanish     # optional
```

Same idea for `_data/publications.yml` (fields: `title`, `venue`, `year`,
`url`, `note` — venue and url optional).

## Add or edit a project

Projects on the Work page come from `_data/projects.yml`. Each entry:

```yaml
- id: anchor-slug          # used for #anchor links from the home page
  name: Project Name
  url: https://project.example
  link_label: project.example
  meta: Role — one-line descriptor
  body: >-
    Two to four sentences of prose.
```

I used a data file rather than a Jekyll collection because the projects are
few, prose-only, and never need their own pages; one YAML file is easier to
edit than five Markdown files with front matter.

## Flip to tomasdiez.com when DNS is ready

1. In `_config.yml`, comment out the github.io `url:` line and uncomment
   `url: "https://tomasdiez.com"`.
2. Add a file named `CNAME` at the repo root containing exactly one line:

   ```
   tomasdiez.com
   ```

3. Point DNS: a `CNAME` record from `www` → `tomasdiez.github.io`, and the
   four GitHub Pages `A` records on the apex (see GitHub Pages docs), then
   enable **Enforce HTTPS** in the repo settings.

All internal links use the `relative_url` filter, so the site works on
either domain without further edits.

## Loose ends (search the repo for `TODO-TOMAS`)

- Portrait photo slots (home hero, about page) — HTML comments mark the spots.
- License line in the footer (`_includes/footer.html`) — CC BY-SA or ©.
- Meaningful Design Group link on the Work page.
- Optional X/Twitter handle in `_config.yml` for richer social cards.
