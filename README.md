# Sheltr

Your crowdsourced disaster overwatch.

https://youtu.be/gg1QbVRAsKA

## Summary

Designed to relieve some of the burden on overstretched local authorities in LA dealing with the wildfires, Sheltr empowers the general population to contribute actively to disaster management. By allowing citizens to report incidents, share critical updates, and assist with relief efforts in real-time, Sheltr provides a much-needed boost to emergency response capabilities, enhancing coordination and resilience during this challenging time.

Sheltr uses disaster reporting and prioritization. Users can create detailed incident reports using an intuitive map feature by dropping a pin and adding key details like disaster type, description, time, location, and severity. A community-driven system prioritizes reports based on likes, ensuring critical updates are highlighted for responders and the community. This approach enhances situational awareness and enables faster, more effective disaster response.

## Contributor List

- Kieran Llarena (coding)
- Jolie Chau (ideation)

## This repo

### Key Files

1. All the protected routes are under the `/protected` directory
2. All components are under the `/components` directory. This includes shadcn components and my custom components
3. All the Supabase logic is under the `/utils/supabase` directory. This includes server-side and client-side session management, auth, and form actions for database management
4. `manifest.tsx` is used to turn a NextJS project into a PWA
5. `middleware.ts` is used for route protection and session refreshing using Supabase auth

### How to Run This App

Three things are needed to run this app:
1. [Supabase](https://supabase.com/) Database
2. [Mapbox](https://www.mapbox.com/) Access Token
3. [Geoapify](https://www.geoapify.com/) Key
4. [pnpm](https://pnpm.io/)

Once all of these are obtained:
1. Clone this repository
2. `cd` into it
3. Create a `.env.local` file with the following environment variables
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=...
NEXT_PUBLIC_GEOAPIFY_KEY=...
```
4. `pnpm install` in the root directory
4. `pnpm run dev` in the root directory
