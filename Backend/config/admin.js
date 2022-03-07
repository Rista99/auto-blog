module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'ec49749d65ff1eda9ca9a19001a7abfc'),
  },
});
