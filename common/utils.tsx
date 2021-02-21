import { store } from "react-notifications-component";
import GlobalContext from "./global-context-provider";
import React from "react";

export function showErrorToast(message, details) {
  if (details === "") {
    details = " ";
  }
  store.addNotification({
    title: message,
    message: details,
    type: "danger",
    insert: "bottom",
    container: "bottom-left",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 2000,
      pauseOnHover: true,
      onScreen: true,
    },
  });
}

export function showLongErrorToast(message, details) {
  if (details === "") {
    details = " ";
  }
  store.addNotification({
    title: message,
    message: details,
    type: "danger",
    insert: "bottom",
    container: "bottom-left",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 4000,
      pauseOnHover: true,
      onScreen: true,
    },
  });
}

export function showWarningToast(message, details) {
  if (details === "") {
    details = " ";
  }
  store.addNotification({
    title: message,
    message: details,
    type: "warning",
    insert: "bottom",
    container: "bottom-left",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 2000,
      pauseOnHover: true,
      onScreen: true,
    },
  });
}

export function showSuccessToast(message, details) {
  if (details === "") {
    details = " ";
  }
  store.addNotification({
    title: message,
    message: details,
    type: "success",
    insert: "bottom",
    container: "bottom-left",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 2000,
      pauseOnHover: true,
      onScreen: true,
    },
  });
}

export function showDefaultToast(message, details) {
  if (details === "") {
    details = " ";
  }
  store.addNotification({
    title: message,
    message: details,
    type: "default",
    insert: "bottom",
    container: "bottom-left",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 2000,
      pauseOnHover: true,
      onScreen: true,
    },
  });
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function getName(str) {
  return capitalize(str.split(" ")[0]);
}

export function wrapQuestions(questions) {
  return JSON.parse(
    "{\n" +
      '    "quizTitle": "",\n' +
      '    "quizSynopsis": "",\n' +
      '    "appLocale": {\n' +
      '      "landingHeaderText": "",\n' +
      '      "question": "Question",\n' +
      '      "startQuizBtn": "Start Quiz",\n' +
      '      "resultFilterAll": "All",\n' +
      '      "resultFilterCorrect": "Correct",\n' +
      '      "resultFilterIncorrect": "Incorrect",\n' +
      '      "nextQuestionBtn": "Next",\n' +
      '      "resultPageHeaderText": "Results:"\n' +
      "    },\n" +
      '    "questions": ' +
      questions +
      "\n" +
      "  }"
  );
}

export const withGlobalContext = (Component) => {
  return (props) => (
    <GlobalContext.Consumer>
      {(contextProps) => {
        return <Component {...props} {...contextProps} />;
      }}
    </GlobalContext.Consumer>
  );
};

export const isJsonArray = (str) => {
  try {
    const jsonStr = JSON.parse(str);
    return Array.isArray(jsonStr);
  } catch (e) {
    return false;
  }
};
