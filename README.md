# Rentify

## Features

Rentify core features include:

- User Manage and Login flow
- Role Manage
- Module Manage with Access level Definition
- Access Management associated with roles
- Email Template and settings
- Media Manage and server side processing
- Error handling and log Management
- Authentication and Authorization
- Content Management
- State Management using redux
- Development ready setup
- Production ready setup

Since anything in our codebase can be extended, overwritten, or installed as a package, you may also develop, scale, and customize anything on our platform.

## Installation

- `git clone <this_url> && cd <repo_name>`
- install npm on client and server
  - `cd client`
  - `npm install`
  - `cd ../server`
  - `npm install`
- Import Default data into MongoDB server from `database` folder
  - `cd ../database`
  - run `mongorestore` to import all BSON/json filesj
- Configure Server
  - Create `.env` file in `server`
  - Update `.env` file with `MONGODB_URI=mongodb://localhost:27017/rentify`
- Configure Client
  - Create `.env` file in `client`
  - Update `.env` file with `VITE_API_BASE=http://localhost:5050/api/`
- Running the application in development mode
  - Development Mode (Client only): `cd client` then `npm run start` then open `http://localhost:5051` in a browser
  - Development Mode (Server only): `cd server` then `npm run start` then open `http://localhost:5050` in a browser
- Default Credentials : Email : `admin@waftengine.org` , Password : `Test@1234`
- For more [Getting started](https://Rentify.org/documentation/2019-7-1-getting-started-with-Rentify)

### License

Copyright © [The MIT License (MIT)](./LICENSE.md)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FWaftTech%2FRentify.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FWaftTech%2FRentify?ref=badge_large)
