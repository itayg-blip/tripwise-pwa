# TripWise QA report

Date: 2026-10-05

## Verified flows

- Fresh onboarding: destination selection, dates, budget currency, reminder preferences, and destination cover.
- Manual expense: MXN 1,000 saved as ILS 168 using the static rate.
- Currency display settings:
  - Combined: MX$1,000 with an ILS 168 conversion.
  - ILS only: ILS 168.
  - Local only: MX$1,000.
- Base currency: switching ILS to MXN converts the budget and updates the dashboard, daily allowance, insights, map totals, and couple balance.
- Home metrics: selected metrics change the two dashboard cards immediately.
- Empty states: dashboard, insights, map, and balance render correctly with no expenses.
- OCR: the supplied bank screenshot produced six editable transactions with amounts, dates, and contextual categories.
- OCR offline: the same six transactions were recognized after the local server was stopped, using only the PWA cache.
- Navigation and bilingual layout: dashboard, expenses, insights, map, and settings in Hebrew RTL and English LTR.
- Responsive mobile layout checked at a 390 × 844 viewport.
- PWA offline launch verified after the local server was stopped.
- No JavaScript console errors during the verified flows.
- Authentication gate: Firebase-not-configured state disables Google sign-in, explains the missing setup, and exposes a local test mode.
- Local session: sign-out returns to the authentication gate; signing in locally again restores the saved budget and expenses.
- Account UI: profile shortcut, user card, sync state, and sign-out are responsive at a 390 × 844 viewport.
- Firebase assets and configuration load successfully over HTTP and are included in the PWA cache manifest.
- OCR regression after the authentication changes: the supplied bank screenshot still produced six editable transactions; no browser console errors were emitted.

## Fixes included

- Replaced the forced SIMD OCR core with automatic Tesseract core selection for broader mobile compatibility.
- Cached both SIMD and non-SIMD LSTM cores plus OCR language data.
- Added explicit OCR error details and cache refresh behavior.
- Connected settings to real app behavior: base currency, expense currency display, dashboard metrics, notification schedule controls, and automatic daily location.
- Fixed base-currency budget math by keeping ILS as the canonical conversion value.
- Fixed empty insight charts, zero-value bars, balanced couple state, and dynamic five-day labels.
- Added bilingual place rendering.
- Added self-hosted Google Sans weights for consistent online and offline typography.
- Added keyboard focus styling and ARIA state for toggles and filters.
- Added Google SSO integration with persistent Firebase Authentication sessions.
- Added per-user local storage plus Cloud Firestore real-time state sync and offline write queueing.
- Added a per-user Firestore interaction log with descriptive event names and restrictive security rules.
- Fixed authentication status copy after sign-out and included all Firebase runtime files in the offline cache.

## Platform note

Daily and weekly notifications use the Web Notifications API and are evaluated when the PWA is opened. Fully scheduled delivery while the PWA is closed requires a push service/backend, especially on iOS. Location capture is automatic only after permission has already been granted; enabling it in settings initiates the permission flow.

The Firebase Web configuration for `travelwise-6b43c` is connected and initializes successfully. Google Authentication is enabled, and `localhost` plus `itayg-blip.github.io` are authorized. Live two-device Firestore synchronization still requires Firestore to be created and `firestore.rules` to be published.

The authorized-domain blocker was resolved for `localhost` and `itayg-blip.github.io`. A subsequent sign-in failure exposed two runtime issues: direct `file://` launch cannot perform OAuth, and redirect sign-in is vulnerable to cross-domain browser storage restrictions. The app now disables Google sign-in on `file://`, explains how to launch it correctly, uses popup sign-in by default, falls back to redirect only when a popup is blocked, and surfaces redirect-result errors after returning to the app.

Google SSO is verified end to end on `localhost`: the authenticated profile is rendered, the sign-in gate closes, and the Firebase session survives a full page reload. Firestore database creation and the supplied UID-isolation rules were verified in production mode. A reversible currency-display change synchronized to the cloud, returned to `combined`, and remained correct after a full reload. The account and sync state both remained active, with no browser console errors.
