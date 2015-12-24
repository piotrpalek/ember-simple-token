import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';
import fetch from 'fetch';

const { get, isEmpty, RSVP, computed } = Ember;
const { resolve, reject } = RSVP;

export default BaseAuthenticator.extend({
  serverTokenEndpoint: computed({
    get() {
      let config = get(this, 'config').serverTokenEndpoint;
      return config;
    }
  }),

  tokenAttributeName: 'token',

  identificationAttributeName: computed({
    get() {
      let config = get(this, 'config').identificationAttributeName;
      return config;
    }
  }),

  authenticate(data) {
    let endpoint = get(this, 'serverTokenEndpoint');
    let identificationAttributeName = get(this, 'identificationAttributeName');
    const credentials = {};
    credentials['password'] = data.password;
    credentials[identificationAttributeName] = data.identification;

    return fetch(endpoint, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return resolve(response.json());
      } else {
        return reject(new Error(response.statusText));
      }
    });
  },

  restore(data) {
    const token = get(data, this.tokenAttributeName);
    if (isEmpty(token)) {
      return reject();
    } else {
      return resolve(data);
    }
  },

  invalidate() {
    return resolve();
  }
});
