import { constants } from "common/constants";

const request = (options) => {
  const headers = new Headers({
    "Content-Type": "application/json"
  });

  if (localStorage.getItem(constants.ACCESS_TOKEN)) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem(constants.ACCESS_TOKEN)
    );
  }

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function getCurrentUserToken() {
  return localStorage.getItem(constants.ACCESS_TOKEN);
}

export function getCurrentUser() {
  if (!localStorage.getItem(constants.ACCESS_TOKEN)) {
    return Promise.reject("No access token set.");
  }

  return request({
    url: constants.API_BASE_URL + "/user/me",
    method: "GET"
  });
}

export function login(loginRequest) {
  return request({
    url: constants.API_BASE_URL + "/auth/login",
    method: "POST",
    body: JSON.stringify(loginRequest)
  });
}

export function signup(signupRequest) {
  return request({
    url: constants.API_BASE_URL + "/auth/signup",
    method: "POST",
    body: JSON.stringify(signupRequest)
  });
}

export function isMod(roles) {
  let found = false;
  roles.forEach((role) => {
    if (role.name === "ROLE_MODERATOR" || role.name === "ROLE_ADMIN") {
      found = true;
    }
  });
  return found;
}

export function isPlus(roles) {
  let found = false;
  roles.forEach((role) => {
    if (role.name === "ROLE_PLUS") {
      found = true;
    }
  });
  return found;
}
