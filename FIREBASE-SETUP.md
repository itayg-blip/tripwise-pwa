# Firebase setup for TripWise

TripWise uses Firebase Authentication for one-time Google sign-in and Cloud Firestore for per-user, real-time state sync. No custom WebSocket server is required.

## 1. Create the Firebase project

1. Create a Firebase project and add a Web App.
2. Copy the Web App configuration into `firebase-config.js` (the current build is connected to `travelwise-6b43c`).
3. Do not add a service-account key. The web configuration is intentionally public.

## 2. Enable Google sign-in

1. In Firebase Console, open Authentication → Sign-in method.
2. Enable Google.
3. Add `itayg-blip.github.io` to Authentication → Settings → Authorized domains.
4. For local integration testing, also add `127.0.0.1` and `localhost`.

## 3. Create Firestore

1. Create a Cloud Firestore database.
2. Publish the rules from `firestore.rules`.

The rules allow each authenticated user to access only documents under `/users/{theirUid}/...`.

## 4. Deploy

Upload the updated static files to GitHub Pages. Each user signs in once on a device; Firebase keeps the session until explicit sign-out. The app stores the current state under `/users/{uid}/apps/tripwise` and appends sync events under `/users/{uid}/history`.

## Behavior

- Browser-local state remains available offline.
- Firestore queues offline writes and synchronizes them when connectivity returns.
- Changes from another signed-in device are applied in real time.
- A local-only button is visible only while `firebase-config.js` still contains placeholders, so the app remains testable before Firebase is configured.
