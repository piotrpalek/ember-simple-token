import TokenAuthenticator from 'ember-simple-token/authenticators/token';
import TokenAuthorizer from 'ember-simple-token/authorizers/token';
import config from '../config/environment';

export function initialize(application) {
  application.register('authenticator:token', TokenAuthenticator);
  application.register('authorizer:token', TokenAuthorizer);
  application.register('config:simple-token', config['ember-simple-token'], { instantiate: false });
  application.inject('authenticator:token', 'config', 'config:simple-token');
}

export default {
  name: 'simple-token',
  initialize
};
