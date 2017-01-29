if ('serviceWorker' in window.navigator) {
  window.addEventListener('load', () => {
    window.navigator.serviceWorker.register('/service-worker.js')
      .then(registration => console.info('ServiceWorker registration successful', registration.scope))
      .catch(error => console.error('ServiceWorker registration failed', error));
  });
}
