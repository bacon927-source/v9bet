/* Light / dark — Tailwind's dark-mode pattern (darkMode: 'selector') — and text size.
 *
 * <html> gets the .dark class when the member picked Dark, or picked nothing
 * and the device is dark; variables.css swaps every colour on that class.
 * Load it in <head> before the page paints, so there is no flash of the
 * wrong theme. The choice is kept in this browser (localStorage 'theme':
 * 'light' | 'dark'; absent = follow the device).
 */
(function () {
  const root = document.documentElement;
  const device = window.matchMedia('(prefers-color-scheme: dark)');
  const saved = () => { try { return localStorage.getItem('theme'); } catch (e) { return null; } };
  const apply = () => {
    const choice = saved();
    root.classList.toggle('dark', choice === 'dark' || (choice !== 'light' && device.matches));
  };
  apply();
  // Following the device means following it live, too.
  device.addEventListener('change', apply);

  // 'system' | 'light' | 'dark' — used by Setup › Theme, Settings and the test panel.
  window.setTheme = (choice) => {
    try {
      if (choice === 'system') localStorage.removeItem('theme');
      else localStorage.setItem('theme', choice);
    } catch (e) { /* storage blocked: the class still changes for this visit */
      root.classList.toggle('dark', choice === 'dark' || (choice === 'system' && device.matches));
      return;
    }
    apply();
  };
  window.getTheme = () => saved() || 'system';

  // Text size: 'default' | 'large' (localStorage 'text-size'; absent = default).
  // variables.css enlarges everything under data-text-size="large".
  const savedSize = () => { try { return localStorage.getItem('text-size'); } catch (e) { return null; } };
  const applySize = (size) => { if (size === 'large') root.dataset.textSize = 'large'; else delete root.dataset.textSize; };
  applySize(savedSize());
  window.setTextSize = (size) => {
    try { if (size === 'large') localStorage.setItem('text-size', 'large'); else localStorage.removeItem('text-size'); } catch (e) { /* this visit only */ }
    applySize(size);
  };
  window.getTextSize = () => (savedSize() === 'large' ? 'large' : 'default');
})();
