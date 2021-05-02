const dev = process.env.NODE_ENV === "development";

// const API_BASE_URL = dev ? "http://localhost:8080" : "https://api.coderintuition.com";
// const WEB_BASE_URL = dev ? "http://localhost:3000" : "https://coderintuition.com";
// const WEBSOCKET_BASE_URL = dev ? "ws://localhost:8080" : "wss://api.coderintuition.com";
// uncomment the three below and comment three above to force production
const API_BASE_URL = "https://api.coderintuition.com";
const WEB_BASE_URL = "https://coderintuition.com";
const WEBSOCKET_BASE_URL = "wss://api.coderintuition.com";

// publishable keys only identify a business so they can live in the code
const STRIPE_PUBLISHABLE_KEY = true
  ? "pk_test_51IENECDemtyf6AFovOK3QQsVhltFMCfd62wKJcyi0y6PypVYC08AmRqO1aPaqbLNkAShdE8I396ED3bBtNFJ0sQ0000hGDIneX"
  : "pk_live_51IENECDemtyf6AFoKuYR1gFGJzt9X9mAH4KCgpNgtxZLoFnz7MQIaBzVija7zYllR676oTSe3a0upWeEM5UB6N0s00xc8AyRil";

export const constants = {
  // backend urls
  API_BASE_URL: API_BASE_URL,
  WEB_BASE_URL: WEB_BASE_URL,
  STOMP_BASE_URL: WEBSOCKET_BASE_URL + "/socket/websocket",
  ACTIVITY_URL: API_BASE_URL + "/activity/",
  PROBLEM_WEB_URL: WEB_BASE_URL + "/problem/",
  PROBLEM_URL: API_BASE_URL + "/problem/",
  PROBLEMS_URL: API_BASE_URL + "/problems/",
  READING_URL: API_BASE_URL + "/reading/",
  READING_WEB_URL: WEB_BASE_URL + "/reading/",
  READINGS_URL: API_BASE_URL + "/readings",
  PROBLEMS_BY_CATEGORY: API_BASE_URL + "/problems-by-category",
  PROBLEM_ID_URL: API_BASE_URL + "/problem/id/",
  READING_ID_URL: API_BASE_URL + "/reading/id/",
  TEST_RUN_URL: API_BASE_URL + "/testrun",
  SUBMISSION_URL: API_BASE_URL + "/submission",
  CMS_PROBLEM_URL: API_BASE_URL + "/cms/problem/",
  CMS_READING_URL: API_BASE_URL + "/cms/reading/",
  PRODUCE_OUTPUT_URL: API_BASE_URL + "/produceoutput",
  USER_PROFILE_URL: API_BASE_URL + "/user/",
  USER_URL: API_BASE_URL + "/user/me",
  CHANGE_PASSWORD_URL: API_BASE_URL + "/user/me/changepassword",
  USER_SUBMISSIONS_URL: API_BASE_URL + "/user/me/submissions/",
  VERIFY_EMAIL_URL: API_BASE_URL + "/user/verify",
  RESET_PASSWORD_REQUEST_URL: API_BASE_URL + "/auth/reset/request",
  RESET_PASSWORD_VALIDATE_URL: API_BASE_URL + "/auth/reset/validate/",
  RESET_PASSWORD_SAVE_URL: API_BASE_URL + "/auth/reset/save",
  ISSUE_URL: API_BASE_URL + "/issue",
  SUPPORT_URL: API_BASE_URL + "/support",
  ADMIN_WEB_URL: WEB_BASE_URL + "/admin/cms",
  // stripe stuff
  CHECKOUT_SESSION_URL: API_BASE_URL + "/stripe/checkout-session",
  CUSTOMER_PORTAL_URL: API_BASE_URL + "/stripe/customer-portal",
  STRIPE_PUBLISHABLE_KEY: STRIPE_PUBLISHABLE_KEY,
  SUCCESS_URL: WEB_BASE_URL,
  CANCEL_URL: WEB_BASE_URL + "/plus",
  MONTHLY_PRICE_ID: dev ? "price_1IEO1RDemtyf6AFoJnVdWZji" : "price_1IEO1RDemtyf6AFoJnVdWZji",
  YEARLY_PRICE_ID: dev ? "price_1IEW9nDemtyf6AFoSj3gK34S" : "price_1IEW9nDemtyf6AFoSj3gK34S",
  // auth stuff
  LAST_URL: "lastUrl",
  ACCESS_TOKEN: "accessToken",
  OAUTH2_REDIRECT_URI: WEB_BASE_URL + "/oauth2/redirect",
};

export const GOOGLE_AUTH_URL = API_BASE_URL + "/oauth2/authorize/google?redirect_uri=" + constants.OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL =
  API_BASE_URL + "/oauth2/authorize/facebook?redirect_uri=" + constants.OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = API_BASE_URL + "/oauth2/authorize/github?redirect_uri=" + constants.OAUTH2_REDIRECT_URI;

export const QUIZ_TEMPLATE = JSON.stringify(
  [
    {
      question: "",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["", "", "", ""],
      correctAnswer: "1",
      messageForCorrectAnswer: "Correct, good job!",
      messageForIncorrectAnswer: "Incorrect, try again!",
      explanation: "",
      point: "1",
    },
    {
      question: "",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["", "", "", ""],
      correctAnswer: "1",
      messageForCorrectAnswer: "Correct, good job!",
      messageForIncorrectAnswer: "Incorrect, try again!",
      explanation: "",
      point: "1",
    },
  ],
  null,
  1
);
