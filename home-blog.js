(() => {
  const grid = document.getElementById('homeBlogGrid');
  if (!grid) return;

  const make = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };

  async function renderPosts() {
    try {
      const response = await fetch(`blog.html?posts=${Date.now()}`, { cache: 'no-store' });
      if (!response.ok) throw new Error('Could not load published posts.');
      const source = await response.text();
      const posts = [];
      const markers = /<!-- POST:([\w-]+):START -->([\s\S]*?)<!-- POST:\1:END -->/g;
      let match;
      while ((match = markers.exec(source)) !== null) {
        const postDoc = new DOMParser().parseFromString(match[2], 'text/html');
        const article = postDoc.querySelector('article');
        const title = article?.querySelector('.article-h1, .article-h1-bn')?.textContent.trim();
        if (article && title) posts.push({ id: match[1], article, title });
      }

      grid.replaceChildren();
      if (!posts.length) {
        grid.append(make('p', 'home-blog-empty', 'No published posts yet. Check back soon.'));
        return;
      }

      posts.slice(0, 3).forEach(({ id, article, title }, index) => {
        const card = make('a', `blog-card reveal vis${index ? ` d${index}` : ''}`);
        card.href = `blog.html#${encodeURIComponent(id)}`;
        const image = article.querySelector('.article-image img');
        if (image?.getAttribute('src')) {
          const media = make('div', 'home-blog-media');
          const thumb = make('img');
          thumb.src = image.getAttribute('src');
          thumb.alt = image.getAttribute('alt') || title;
          thumb.loading = 'lazy';
          media.append(thumb);
          card.append(media);
        }
        const tag = article.querySelector('.article-tag')?.textContent.trim() || 'Reflection';
        card.append(make('div', 'blog-tag', tag));
        card.append(make('h3', 'blog-h', title));
        const summary = Array.from(article.querySelectorAll('.article-p'))
          .map(paragraph => paragraph.textContent.trim())
          .find(Boolean);
        if (summary) card.append(make('p', 'blog-p', summary.length > 170 ? `${summary.slice(0, 167).trimEnd()}…` : summary));
        const link = make('span', 'blog-link', 'Read article');
        const icon = make('i', 'fa-solid fa-arrow-right');
        icon.setAttribute('aria-hidden', 'true');
        link.append(icon);
        card.append(link);
        grid.append(card);
      });
    } catch (error) {
      grid.replaceChildren(make('p', 'home-blog-empty', 'Recent posts are temporarily unavailable.'));
    }
  }

  renderPosts();
})();
