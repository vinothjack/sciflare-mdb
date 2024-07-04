const passport = require('passport');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { UserModel } = require('../model/user-model'); 
const jwtUtils = require('../utils/jwt-helper'); 

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'NewLife', 
  },
  async (jwtPayload, done) => {
    try { 
      const user = await UserModel.findById(jwtPayload.id);
      if (!user) {
        return done(null, false, { message: 'User not found.' });
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
));

const authenticate = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Unauthorized ' });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = {
  authenticate,
};
