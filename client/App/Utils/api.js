var config = require('./config');

var api = {
  login(username, password) {
    var user = { username: username, password: password };
    var url = 'http://' + config.url + ':8000/login';
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(user)
    });
  },

  signup(username, password) {
    var user = { username: username, password: password };
    return fetch('http://' + config.url + ':8000/signup', {
      method: 'POST',
      body: JSON.stringify(user)
    });
  },

  changePassword(username, password, newPassword) {
    var user = { username: username, password: password, newPassword: newPassword };
    return fetch('http://' + config.url + ':8000/changePassword', {
      method: 'POST',
      body: JSON.stringify(user)
    });
  },

  changeUsername(username, newUsername) {
    var user = { username: username, newUsername: newUsername };
    return fetch('http://' + config.url + ':8000/changeUsername', {
      method: 'POST',
      body: JSON.stringify(user)
    });
  },

  checkJWT(JWT, callback) {
    var url = 'http://' + config.url + ':8000/checkJWT/' + JWT;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(userData) { // handle error here for some reason catch was not working
      if (userData.status === 404) {
        console.log('Problem with GET request for JWT');
      } else {
        callback(userData._bodyInit);
      }
    });
  },

  uploadPhoto(imageData, latitude, longitude, userId, visibility, callback) {
    //See server/photos/photoModel.js for visibility definitions
    var url = 'http://' + config.url + ':8000/imgUpload';
    // cut data in half
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        imageData: imageData,
        latitude: latitude,
        longitude: longitude,
        userId: userId,
        visibility: visibility || 0 //default to private incase someone forgets to pass it
      })
    })
    .then((res) => callback(res._bodyText))
    .catch(console.log);
  },

  fetchPhotos(latitude, longitude, radius, callback) {
    var url = 'http://' + config.url + ':8000/fetchPhotos?lat=' + latitude + '&lon=' + longitude + '&radius=' + radius;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(photos) {
      callback(photos._bodyInit);
    })
    .catch(function(err) {
      console.log(err);
    });
  },

  fetchLocations(latitude, longitude, latdelta, londelta, callback) {
    var url = 'http://' + config.url + ':8000/fetchLocations?lat=' + latitude + '&lon=' + longitude + '&latdelta=' + latdelta + '&londelta=' + londelta;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(photos) {
      callback(photos._bodyInit);
    })
    .catch(function(err) {
      console.log(err);
    });
  },


  fetchUserPhotos(userId, callback) {
    var url = 'http://' + config.url + ':8000/fetchUserPhotos?userId=' + userId;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(photos) {
      callback(photos._bodyInit);
    })
    .catch(function(err) {
      console.log(err);
    });
  },

  //fetchUserStreams function ******
  fetchUserStreams(userId, callback) {
    var url = 'http://' + config.url + ':8000/fetchUserStreams?userId=' + userId;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(photoCollections) {
      callback(photoCollections._bodyInit);
    })
    .catch(function(err) {
      console.log(err);
    });
  },

  fetchUserFavorites(userId, callback) {
    var url = 'http://' + config.url + ':8000/fetchUserFavorites?userId=' + userId;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(photos) {
      callback(photos._bodyInit);
    })
    .catch(function(err) {
      console.log(err);
    });
  },

  incrementViews(url, callback) {
    var url = 'http://' + config.url + ':8000/incrementViews?url=' + url;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(result) {
      callback(result._bodyInit);
    })
    .catch(function(err) {
      console.log(err);
    });
  },

  toggleFavorite(userId, url, callback) {
    var url = 'http://' + config.url + ':8000/toggleFavorite?userId=' + userId + '&url=' + url;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(result) {
      callback(result._bodyInit);
    })
    .catch(function(err) {
      console.log(err);
    });
  },

  //add to Stream
  toggleStream(userId, url, callback) {
    var url = 'http://' + config.url + ':8000/toggleStream?userId=' + userId + '&url=' + url;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(result) {
      callback(result._bodyInit);
    })
    .catch(function(err) {
      console.log(err);
    });
  },

  getPhotoData(url, userId, callback) {
    var url = 'http://' + config.url + ':8000/getPhotoData?url=' + url + '&userId=' + userId;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function(data) {
      callback(data._bodyInit);
    })
    .catch(function(err) {
      console.log(err);
    });
  }

};

module.exports = api;
