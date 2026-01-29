// PWA Service Worker registration
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration)
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error)
        })
    })
  }
}

// Check if PWA is installable
export function isPWAInstallable() {
  return 'serviceWorker' in navigator && 'PushManager' in window
}

// Handle PWA install prompt
export function setupInstallPrompt(callback) {
  let deferredPrompt

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    if (callback) {
      callback(deferredPrompt)
    }
  })

  return () => deferredPrompt
}
