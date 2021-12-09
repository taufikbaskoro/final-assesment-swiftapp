import Config from 'react-native-config';
import * as Sentry from '@sentry/react-native';

const routingInstrumentation = new Sentry.ReactNavigationV5Instrumentation();
Sentry.init({
  dsn: Config.SENTRY_DSN,

  // integrations: [new Integrations.BrowserTracing()],

  // Release Health
  enableAutoSessionTracking: true,
  sessionTrackingIntervalMillis: 5000,

  // Performance
  integrations: [
    new Sentry.ReactNativeTracing({
      idleTimeout: 5000,
      routingInstrumentation,
      tracingOrigins: ['localhost', /^\//, /^https:\/\//],
    }),
  ],
  environment: Config.MODE_ACTIVE,
  tracesSampleRate: 1.0,
});
