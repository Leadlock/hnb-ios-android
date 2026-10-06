# Configure StatusBar to Overlay WebView

The Capacitor `StatusBar` plugin is currently not configured in the project. By default, `overlaysWebView` is `false`. This plan will enable the overlay for both iOS and Android.

## Proposed Changes

### [Component Name] Capacitor & Web Setup

#### [MODIFY] [capacitor.config.json](file:///Users/neozaar/Downloads/Hangers%20and%20Baskets/Hangers%20and%20Baskets/capacitor.config.json)
Add the `plugins` section with `StatusBar` configuration set to `overlaysWebView: true`.

#### [MODIFY] [index.html](file:///Users/neozaar/Downloads/Hangers%20and%20Baskets/Hangers%20and%20Baskets/src/index.html)
Update the `viewport` meta tag to include `viewport-fit=cover`. This is critical for iOS to allow the webview to occupy the entire screen area, including the space behind the status bar and notch.

#### [MODIFY] [index.css](file:///Users/neozaar/Downloads/Hangers%20and%20Baskets/Hangers%20and%20Baskets/src/index.css)
Add safe-area padding to the root or body to ensure content (like the header) is not hidden behind the status bar or notch when `overlaysWebView` is enabled.

### [Component Name] Dependencies

#### [NEW] Install `@capacitor/status-bar`
Run `npm install @capacitor/status-bar` to add the required plugin to the project.

## Verification Plan

### Automated Tests
- Run `npx cap sync` to ensure the configuration is propagated to the native projects.
- Verify the build completes successfully.

### Manual Verification
- Deploy to an iOS device/simulator and verify the background color or content extends behind the status bar.
- Deploy to an Android device and verify the same behavior.
- Check that the Header has sufficient padding at the top so it's not obscured by the status bar.
