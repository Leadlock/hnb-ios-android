import { Capacitor } from '@capacitor/core'
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics'
import { Browser } from '@capacitor/browser'
import { App } from '@capacitor/app'

/**
 * Check if the application is running inside a native iOS or Android shell.
 */
export const isNativePlatform = () => {
  return Capacitor.isNativePlatform()
}

/**
 * Trigger subtle physical haptic feedback (iOS / Android only).
 * In web browsers, this safely no-ops with zero side-effects.
 * @param {'light'|'medium'|'heavy'|'success'|'warning'|'selection'} type
 */
export const triggerHaptic = async (type = 'medium') => {
  try {
    switch (type) {
      case 'selection':
      case 'medium':
        await Haptics.impact({ style: ImpactStyle.Medium })
        break
      case 'heavy':
        await Haptics.impact({ style: ImpactStyle.Heavy })
        break
      case 'light':
        await Haptics.impact({ style: ImpactStyle.Light })
        break
      case 'success':
        await Haptics.notification({ type: NotificationType.Success })
        break
      case 'warning':
        await Haptics.notification({ type: NotificationType.Warning })
        break
      default:
        await Haptics.impact({ style: ImpactStyle.Medium })
        break
    }
  } catch (e) {
    try {
      await Haptics.vibrate({ duration: 40 })
    } catch {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try { navigator.vibrate(40) } catch {}
      }
    }
  }
}

/**
 * Open external URLs (e.g. Google Maps, external policies, store pages)
 * inside a native In-App Browser tab (iOS SFSafariViewController / Android Custom Tabs)
 * so users stay inside the app without being kicked out to external Safari/Chrome.
 * In desktop/web browser, opens a standard new tab (_blank).
 */
export const openInAppBrowser = async (url) => {
  if (!url) return

  if (isNativePlatform()) {
    try {
      await Browser.open({
        url,
        windowName: '_blank',
        toolbarColor: '#050d20',
        presentationStyle: 'popover',
      })
      return
    } catch {
      // Fallback
    }
  }

  window.open(url, '_blank', 'noopener,noreferrer')
}

/**
 * Initialize native device lifecycle listeners (e.g. Android hardware back button).
 */
export const initNativeListeners = (navigate) => {
  if (!isNativePlatform()) return

  // Android hardware back button handling
  try {
    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) {
        window.history.back()
      } else {
        App.exitApp()
      }
    })
  } catch {
    // Ignore if not supported
  }
}
