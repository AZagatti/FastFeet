import 'dotenv/config';

if (!process.env.AUTH_SECRET) {
  throw new Error('process.env.AUTH_SECRET not exists');
}

export default {
  secret: process.env.AUTH_SECRET,
  expiresIn: '7d',
};
