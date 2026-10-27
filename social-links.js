(() => {
  const iconByKey = {
    facebook: '.fa-facebook-f',
    x: '.fa-x-twitter',
    instagram: '.fa-instagram',
    youtube: '.fa-youtube'
  };

  fetch('social.json', { cache: 'no-store' })
    .then(response => {
      if (!response.ok) throw new Error('Social links are unavailable.');
      return response.json();
    })
    .then(links => {
      Object.entries(iconByKey).forEach(([key, iconSelector]) => {
        const value = String(links[key] || '').trim();
        let url;
        try { url = new URL(value, window.location.href); } catch { return; }
        if (!['https:', 'http:'].includes(url.protocol)) return;
        document.querySelectorAll(iconSelector).forEach(icon => {
          const anchor = icon.closest('a');
          if (!anchor) return;
          anchor.href = url.href;
          anchor.target = '_blank';
          anchor.rel = 'noopener noreferrer';
        });
      });
    })
    .catch(() => {});
})();
