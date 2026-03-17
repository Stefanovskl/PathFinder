# PathFinder 🗺️

A React Native (Expo) mobile application for tracking physical movements in real-time, saving routes, and reviewing past activities.

## Features

- 🗺️ Real-time dark map integration using MapTiler
- 📍 Live GPS location tracking with blue dot indicator
- 🏃 Activity tracking with live duration and distance
- 🛣️ Polyline path drawing on map as you move
- 💾 Persistent local storage of all activities
- 📋 History screen listing all saved routes
- 🔍 Detail view with static map for each past activity
- ⚠️ Edge case handling for location permissions

## Tech Stack

- **Framework**: Expo (Managed Workflow)
- **Language**: TypeScript
- **Map Provider**: MapTiler via react-native-maps
- **State Management**: Zustand
- **Styling**: NativeWind (Tailwind CSS v4)
- **Storage**: AsyncStorage
- **Navigation**: Expo Router

## Architecture

The project follows a clean, scalable architecture with clear separation of concerns:
```
pathfinder/
├── app/                    → Screens & navigation (Expo Router)
│   ├── (tabs)/            → Tab screens (Map, History)
│   └── activity/          → Dynamic detail screen
├── components/            → UI components (co-located styles & tests)
│   ├── Map/
│   ├── StatsBar/
│   ├── TrackingButton/
│   ├── LoadingScreen/
│   └── LocationError/
├── hooks/                 → Business logic & data fetching
├── store/                 → Global state (Zustand)
├── errors/                → Error handling utilities
├── types/                 → Shared TypeScript interfaces
├── constants/             → App-wide constants
├── styles/                → Screen level styles
└── tests/                 → Global tests (hooks & store)
```

### Key architectural decisions:
- **Hooks** handle all business logic, keeping screens clean
- **Zustand store** manages global tracking state
- **Components** are co-located with their styles and tests
- **Types** are defined once and imported everywhere
- **Constants** eliminate magic numbers and strings

## How to Run

### Prerequisites
- Node.js 18+
- Expo Go app on your phone
- MapTiler account (free)

### Setup

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/PathFinder.git
cd PathFinder
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file in root:
```
EXPO_PUBLIC_MAPTILER_KEY=your_maptiler_api_key
```

4. Start the app
```bash
npx expo start
```

5. Scan QR code with **Expo Go** app on your phone

### Testing outdoors
For accurate GPS tracking, run with tunnel mode:
```bash
npx expo start --tunnel
```

## Testing

Unit tests are structured in two locations:
- **Component tests**: co-located inside each component folder
- **Logic tests**: in the `tests/` folder covering hooks and store
```bash
npm test
```

> Note: Full test suite requires jest-expo compatibility with Expo 54.

## AI Tools Used

I used **Claude (Anthropic)** extensively throughout this project as my primary AI-assisted development tool. Here's how it helped:

- **Architecture decisions**: Prompted Claude to design a clean folder structure separating hooks, store, components, types, and errors
- **Complex logic**: Used AI to implement the Haversine formula for GPS distance calculation
- **Debugging**: Iteratively debugged NativeWind v4 configuration issues with Expo 54
- **Best practices**: Asked Claude to review code and suggest improvements like moving state to Zustand and creating shared types
- **Edge cases**: Prompted AI to handle location permission denial, GPS unavailability, and AsyncStorage failures

The workflow was highly iterative — I would prompt, review the output, identify issues, and re-prompt with more specific requirements. This process helped me ship a polished product quickly while maintaining clean architecture.

## Biggest Challenge

The biggest challenge during the vibe coding process was configuring **NativeWind v4 with Expo 54**. The babel, metro, and tailwind configurations required multiple iterations to work correctly together. AI helped identify that NativeWind v4 requires a `metro.config.js` with `withNativeWind` wrapper and a `global.css` import in the root layout — something that wasn't obvious from the documentation alone.

## Author
Bojan Stefanovski,
Built as part of the Intertec technical assessment — PathFinder Challenge.
