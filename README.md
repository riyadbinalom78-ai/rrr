# Riyad Bin Alom — portfolio

Static portfolio for GitHub Pages. Keep the repository root as the Pages publishing directory so the existing page URLs and relative image paths continue to work.

## Pages

- `index.html` is the home page.
- `about.html`, `skills.html` (also available through `skill.html`), `blog.html`, `lab.html`, and `contact.html` are the main sections.
- `admin.html` is the owner’s content panel. The `Site owner` link in page footers opens it.

## Assets

- `assets/css/portfolio.css` contains shared public-site styling.
- `assets/js/home-blog.js` builds the home-page blog cards from the published post blocks in `blog.html`. The post blocks marked `POST:<id>:START/END` are the source of truth, so removing a post in the admin panel also removes it from Home.
- `uploads/` stores media used by blog posts.
- `social.json` is the source of truth for public social links; `assets/js/social-links.js` applies those links to the social icons.

## Admin access

The panel writes changes through the GitHub Contents API. Connect it with a fine-grained GitHub token restricted to this repository and the minimum Contents permissions required. The token is used in the browser; never put a token in a committed file or share the admin session on a device you do not control.

GitHub Pages may take a short time to publish a commit made from the panel.
