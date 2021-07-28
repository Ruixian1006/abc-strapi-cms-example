module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'http://localhost:1337'),
  cron: {
    enabled: env.bool('CRON_ENABLED', false),
  },
  admin: {
    auth: {
      events: {
        onConnectionSuccess(e) {
          console.log(e.user, e.provider);
        },
        onConnectionError(e) {
          console.error(e.error, e.provider);
        },
      },
      secret: env('ADMIN_JWT_SECRET', '1cac14309c423efd7188ff3803f67a6a'),
    },
    url: env('PUBLIC_ADMIN_URL', '/admin'),
    forgotPassword: {
      from: 'no-reply@example.com',
      replyTo: 'no-reply@example.com',
    },
  },
});
