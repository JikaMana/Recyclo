# Recyclo

Recyclo is a mobile application built with React Native and Expo, designed to promote recycling by allowing users to schedule pickups, earn points, and access recycling resources. The app supports two main user roles: **User** and **Collector**.

---

## Features

### For Users

- **Register/Login:** Create an account or sign in.
- **Schedule Pickup:** Request recyclable waste pickups by selecting material type, location, and uploading photos.
- **Pickup History:** View past and pending pickup requests with status tracking.
- **Profile Management:** Edit profile, view notifications, change password, and log out.
- **Learn & Earn:** Access educational content on proper recycling and sorting.
- **Notifications:** Receive updates about pickups, offers, and app news.

### For Collectors

- **Dashboard:** View key metrics (total, pending, completed pickups) and recent activities.
- **Pickup Requests:** Browse and manage incoming pickup requests, view details, and accept/reject requests.
- **Map View:** See pending pickups on a map.
- **Profile & Subscription:** View collector profile, manage subscription plans, and renew via payment.

---

## Project Structure

```
app/
  (auth)/           # Authentication screens (login, register)
  (tabs)/           # Main tab navigation for users and collectors
    (user)/         # User-specific screens (home, pickup, history, profile)
      (home)/       # User home, notifications, learn & earn
    (collector)/    # Collector-specific screens (dashboard, pickup, map, profile)
      (pickup)/     # Collector pickup requests and details
      (profile)/    # Collector profile and subscription
components/         # Reusable UI components
contexts/           # React contexts (e.g., AuthContext)
assets/             # Images and fonts
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**

   ```sh
   git clone <your-repo-url>
   cd Recyclo
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**

   ```sh
   npm start
   # or
   yarn start
   ```

4. **Run on device or emulator:**
   - Use the Expo Go app on your phone, or an Android/iOS emulator.

---

## Scripts

- `npm start` — Start the Expo development server.
- `npm run android` — Run on Android device/emulator.
- `npm run ios` — Run on iOS simulator.
- `npm run web` — Run in web browser.
- `npm run lint` — Run ESLint.

---

## Configuration

- **API Keys:** Place your Google Maps API keys in the `.env` file (see `.env.example`).
- **Environment Variables:** See `.env` for configuration.

---

## Dependencies

- React Native, Expo
- Expo Router
- React Navigation
- @expo/vector-icons
- react-native-maps
- And more (see [package.json](package.json))

---

## Folder Reference

- [app/(auth)/register.jsx](<app/(auth)/register.jsx>) — Registration screen
- [app/(auth)/login.jsx](<app/(auth)/login.jsx>) — Login screen
- [app/(tabs)/(user)/(home)/index.jsx](<app/(tabs)/(user)/(home)/index.jsx>) — User home
- [app/(tabs)/(user)/pickup.jsx](<app/(tabs)/(user)/pickup.jsx>) — Schedule pickup
- [app/(tabs)/(user)/history.jsx](<app/(tabs)/(user)/history.jsx>) — Pickup history
- [app/(tabs)/(user)/profile.jsx](<app/(tabs)/(user)/profile.jsx>) — User profile
- [app/(tabs)/(user)/(home)/notification.jsx](<app/(tabs)/(user)/(home)/notification.jsx>) — Notifications
- [app/(tabs)/(user)/(home)/learn.jsx](<app/(tabs)/(user)/(home)/learn.jsx>) — Learn & Earn
- [app/(tabs)/(collector)/dashboard.jsx](<app/(tabs)/(collector)/dashboard.jsx>) — Collector dashboard
- [app/(tabs)/(collector)/(pickup)/index.jsx](<app/(tabs)/(collector)/(pickup)/index.jsx>) — Collector pickup requests
- [app/(tabs)/(collector)/(pickup)/request.jsx](<app/(tabs)/(collector)/(pickup)/request.jsx>) — Pickup request details
- [app/(tabs)/(collector)/map.jsx](<app/(tabs)/(collector)/map.jsx>) — Map view for collectors
- [app/(tabs)/(collector)/(profile)/index.jsx](<app/(tabs)/(collector)/(profile)/index.jsx>) — Collector profile
- [app/(tabs)/(collector)/(profile)/subscription.jsx](<app/(tabs)/(collector)/(profile)/subscription.jsx>) — Subscription management

---

## Customization

- **Theming:** Colors and styles are defined in each component’s `StyleSheet`.
- **Navigation:** Uses Expo Router for file-based navigation.
- **Icons:** Uses [@expo/vector-icons](https://docs.expo.dev/guides/icons/).

---

## License

MIT

---

## Author

Codefloxx Technologies
Yahaya Abdullahi Mana(Jika Mana)
