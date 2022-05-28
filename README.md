# vglist Variety Generator

Based on an image that floated around social media, where people would share an image with a list of 100 game series' and fill out which game series' they've played. For the hell of it, I've created a little website that uses the [vglist](https://vglist.co) API to fill it out for you.

Built with Vue 3, TypeScript, and Vite.

## Setup Instructions

To run locally, you'll want to have Node 16 and Yarn v1 installed.

Then:
- Clone the repo.
- Create and configure the `.env.local` file (see section below).
- Run `yarn install`.
- Run `yarn dev`.

And then the site will be available at localhost:3000.

### `.env.local`

In order to connect to the vglist GraphQL API, you'll need to set up some environment variables for yourself.

- Create `.env.local` in the vglist-variety-generator directory.
- Populate it with the following:

```
VITE_VGLIST_CLIENT_ID=FOOBAR
VITE_VGLIST_REDIRECT_URI=http://localhost:3000/vglist-variety-generator/
```

- You can keep the value of `VITE_VGLIST_REDIRECT_URI` as-is.
- For the Client ID, you'll need to create an OAuth application in https://vglist.co.
  - Log into https://vglist.co/.
  - Go to Settings.
  - Go to the "Developer" page in the left sidebar.
  - Click "New Application".
  - Give it a name.
  - Set the redirect URI as `http://localhost:3000/vglist-variety-generator/`.
  - Uncheck Confidential, since the application secret won't be necessary.
  - Give it the `read` scope (you won't need/want to give it the `write` scope).
  - Click Submit.
  - Copy the "Application UID" and use it for the value of `VITE_VGLIST_CLIENT_ID` in `.env.local`.
