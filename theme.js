/* Light / dark — Tailwind's dark-mode pattern (darkMode: 'selector').
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
})();
