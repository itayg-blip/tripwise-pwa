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

## Platform note

Daily and weekly notifications use the Web Notifications API and are evaluated when the PWA is opened. Fully scheduled delivery while the PWA is closed requires a push service/backend, especially on iOS. Location capture is automatic only after permission has already been granted; enabling it in settings initiates the permission flow.
