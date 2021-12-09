# src

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

## :arrow_up: How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Install the Application with `yarn` or `npm i`

## :arrow_forward: How to Run App

1. cd to the repo
2. Run Build for either OS

- for iOS
  - run `react-native run-ios`
- for Android
  - Run Genymotion
  - run `react-native run-android`

## :no_entry_sign: Standard Compliant

- Foldering:
- \_src/core : for core component
- \_src/override : for custom component

## :closed_lock_with_key: Secrets

This project uses [react-native-config](https://github.com/luggit/react-native-config) to expose config variables to your javascript code in React Native. You can store API keys
and other sensitive information in a `.env` file:

```
API_URL=https://api.example.com
GOOGLE_MAPS_API_KEY=example
```

and access them from React Native like so:

```
import Secrets from 'react-native-config'

Secrets.API_URL  // 'https://api.example.com'
Secrets.GOOGLE_MAPS_API_KEY  // 'example'
```

The `.env` file is ignored by git keeping those secrets out of your repo.

### Get started:

1. Copy .env.example to .env
2. Add your config variables
3. Follow instructions at [https://github.com/luggit/react-native-config#setup](https://github.com/luggit/react-native-config#setup)
4. Done!
