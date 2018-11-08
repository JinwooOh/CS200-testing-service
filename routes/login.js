module.exports = (app, passport)=> {
  app.get('/api/login',
    passport.authenticate('saml', { failureRedirect: '/login/fail' }),
    function (req, res) {
      res.redirect('/');
    }
  );

  app.post('/api/login/callback',
    passport.authenticate('saml', { failureRedirect: '/login/fail' }),
    function(req, res) {
      res.redirect('/');
    }
  );

  app.get('/login/fail',
    function(req, res) {
      res.status(401).send('Login failed');
    }
  );
}