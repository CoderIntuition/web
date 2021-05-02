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
  SAVE_URL: API_BASE_URL + "/save",
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

export const beginnerPathData = {
  introduction: [
    {
      type: "reading",
      urlName: "who-is-the-beginner-path-meant-for",
      name: "Who is the Beginner Path meant for?",
    },
    {
      type: "reading",
      urlName: "why-should-i-use-a-learning-path",
      name: "Why should I use a Learning Path?",
    },
    {
      type: "problem",
      urlName: "fizz-buzz",
      name: "Problem: Fizz Buzz",
    },
    {
      type: "problem",
      urlName: "sum-of-array",
      name: "Problem: Sum of Array",
    },
    {
      type: "quiz",
      urlName: "prerequisites",
      name: "Quiz: Prerequisites",
    },
  ],
  bigONotation: [
    {
      type: "reading",
      urlName: "why-do-i-need-to-know-big-o-notation",
      name: "Why do I need to know Big O notation?",
    },
    {
      type: "reading",
      urlName: "big-o-notation",
      name: "Big O Notation",
    },
    {
      type: "reading",
      urlName: "time-complexity",
      name: "Time Complexity",
    },
    {
      type: "quiz",
      urlName: "time-complexity-quiz",
      name: "Quiz: Time Complexity",
    },
    {
      type: "reading",
      urlName: "space-complexity",
      name: "Space Complexity",
    },
    {
      type: "quiz",
      urlName: "space-complexity-quiz",
      name: "Quiz: Space Complexity",
    },
    {
      type: "tip",
      urlName: "using-time-and-space-complexity",
      name: "Interview Tip: Using Time and Space Complexity",
    },
  ],
  stringsAndArrays: [
    {
      type: "reading",
      urlName: "overview-of-basic-strings-and-arrays",
      name: "Overview of Basic Strings and Arrays",
    },
    {
      type: "reading",
      urlName: "the-array-data-structure",
      name: "The Array Data Structure",
    },
    {
      type: "problem",
      urlName: "longest-common-prefix",
      name: "Problem: Longest Common Prefix",
    },
    {
      type: "reading",
      urlName: "the-two-pointer-method",
      name: "The Two-Pointer Method",
    },
    {
      type: "problem",
      urlName: "reverse-an-array",
      name: "Problem: Reverse an Array",
    },
    {
      type: "problem",
      urlName: "valid-palindrome",
      name: "Problem: Valid Palindrome",
    },
    {
      type: "problem",
      urlName: "remove-duplicates-from-sorted-array",
      name: "Problem: Remove Duplicates from Sorted Array",
    },
    {
      type: "quiz",
      urlName: "two-pointer-method-quiz",
      name: "Quiz: Two-Pointer Method",
    },
    {
      type: "reading",
      urlName: "searching-arrays",
      name: "Introduction to Searching Arrays",
    },
    {
      type: "problem",
      urlName: "find-element-in-array",
      name: "Problem: Find Element in Array",
    },
    {
      type: "reading",
      urlName: "modifying-binary-search",
      name: "Modifying Binary Search",
    },
    {
      type: "problem",
      urlName: "find-pivot-point-of-rotated-sorted-array",
      name: "Problem: Find Pivot Point of Rotated Sorted Array",
    },
    {
      type: "problem",
      urlName: "valid-perfect-square",
      name: "Problem: Valid Perfect Square",
    },
    {
      type: "quiz",
      urlName: "searching-arrays-quiz",
      name: "Quiz: Searching Arrays",
    },
    {
      type: "reading",
      urlName: "sorting-arrays",
      name: "Introduction to Sorting Arrays",
    },
    {
      type: "problem",
      urlName: "insertion-sort",
      name: "Problem: Practice Insertion Sort",
    },
    {
      type: "problem",
      urlName: "detect-meeting-time-conflicts",
      name: "Problem: Detect Meeting Time Conflicts",
    },
    {
      type: "problem",
      urlName: "merge-two-sorted-arrays",
      name: "Problem: Merge Two Sorted Arrays",
    },
    {
      type: "quiz",
      urlName: "sorting-arrays-quiz",
      name: "Quiz: Sorting Arrays",
    },
    {
      type: "tip",
      urlName: "plan-of-attack-for-array-problems",
      name: "Interview Tip: Plan of Attack for Array Problems",
    },
  ],
  linkedLists: [
    {
      type: "reading",
      urlName: "the-linked-list-data-structure",
      name: "The Linked List Data Structure",
    },
    {
      type: "problem",
      urlName: "delete-node-from-linked-list",
      name: "Problem: Delete Node from Linked List",
    },
    {
      type: "problem",
      urlName: "reverse-a-linked-list",
      name: "Problem: Reverse a Linked List",
    },
    {
      type: "problem",
      urlName: "remove-duplicates-from-sorted-linked-list",
      name: "Problem: Remove Duplicates from Sorted Linked List",
    },
    {
      type: "reading",
      urlName: "the-two-pointer-method-linked-list-edition",
      name: "The Two Pointer Method: Linked List Edition",
    },
    {
      type: "problem",
      urlName: "detect-cycle-in-linked-list",
      name: "Problem: Detect Cycle in Linked List",
    },
  ],
};
