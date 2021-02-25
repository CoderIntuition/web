import React, { useState } from "react";
import AnimationRevealPage from "components/common/helpers/animation-reveal-page";
import { ChevronDown } from "react-feather";
import { Container, ContentWithPaddingXl } from "../landing-styles";
import {
  Answer,
  Column,
  DecoratorBlob1,
  DecoratorBlob2,
  Description,
  FAQ,
  FAQSContainer,
  Heading,
  Question,
  QuestionText,
  QuestionToggleIcon,
  Subheading,
} from "./faq-styles";

const Faq = () => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

  const toggleQuestion = (questionIndex) => {
    if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
    else setActiveQuestionIndex(questionIndex);
  };

  const faqs = [
    {
      question: "Why should I use CoderIntuition?",
      answer:
        "CoderIntuition is the only interview preparation website that helps you learn the intuition that can be " +
        "repeatably applied in interview problems in an efficient manner. Our hints, interactive quizzes, and concise " +
        "explanations guide you while you are coding, allowing to you learn with experience.",
    },
    {
      question: "How is CoderIntuition different from other interview preparation websites?",
      answer:
        "Unlike other interview preparation websites, CoderIntuition teaches you intuition in an efficient manner. " +
        "Other websites only have text and video solutions for you to read/watch after you attempt the problem, but " +
        "nothing while you are coding. Not to mention, these also take a long time to read/watch. CoderIntuition's " +
        "hints, interactive quizzes, and concise explanations appear at relevant places while you are coding, " +
        "maximizing your learning and efficiency. Many CoderIntuition users have said that compared to other websites, " +
        "they can complete double the amount of questions on CoderIntuition with full understanding.",
    },
    {
      question: "How do I use CoderIntuition?",
      answer:
        "We recommend following one of our structured learning paths to gain the most necessary intuition. " +
        "When attempting problems, you should follow the prompts that the intuition steps give. The intuition steps " +
        "will guide you towards understanding the intuition of the problem and how it can be repeatably applied to " +
        "other problems. It will also ask quizzes as you code to reinforce your understanding.",
    },
    {
      question: "Who is CoderIntuition for?",
      answer:
        "CoderIntuition is perfect for students and professionals who have basic coding experience (loops, " +
        "conditionals, strings, arrays) and want to land a lucrative job in tech. These include internships and " +
        "full-time positions in software engineering, software quality assurance, data science, and product management.",
    },
    {
      question: "What languages does CoderIntuition support?",
      answer:
        "CoderIntuition support Python, Java, and JavaScript in the online editor. Solutions are also available in " +
        "Python, Java, and JavaScript. Note: Python is recommended for interviews since it is the quickest to write " +
        "on a whiteboard.",
    },
    {
      question: "Will CoderIntuition support any more languages in the future?",
      answer:
        "CoderIntuition may support C++ and Ruby in the future if there is sufficient demand. If you are not familiar " +
        "with any of our supported languages, we recommend you to learn Python.",
    },
  ];

  return (
    <AnimationRevealPage>
      <div className={Container}>
        <div className={ContentWithPaddingXl}>
          <div className={Column}>
            <div>
              <h1 className={Subheading}>FAQ</h1>
              <h2 className={Heading}>Have Questions?</h2>
              <p className={Description}>We have the answers to most of them here.</p>
            </div>
            <dl className={FAQSContainer}>
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  onClick={() => {
                    toggleQuestion(index);
                  }}
                  className={FAQ}
                >
                  <dt className={Question}>
                    <span className={QuestionText}>{faq.question}</span>
                    <QuestionToggleIcon
                      variants={{
                        collapsed: { rotate: 0 },
                        open: { rotate: -180 },
                      }}
                      initial="collapsed"
                      animate={activeQuestionIndex === index ? "open" : "collapsed"}
                      transition={{
                        duration: 0.02,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                    >
                      <ChevronDown />
                    </QuestionToggleIcon>
                  </dt>
                  <Answer
                    variants={{
                      open: { opacity: 1, height: "auto", marginTop: "16px" },
                      collapsed: { opacity: 0, height: 0, marginTop: "0px" },
                    }}
                    initial="collapsed"
                    animate={activeQuestionIndex === index ? "open" : "collapsed"}
                    transition={{
                      duration: 0.3,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    {faq.answer}
                  </Answer>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <img className={DecoratorBlob1} src="/images/svg-decorator-blob-3.svg" alt="Decorator blob" />
        <img className={DecoratorBlob2} src="/images/svg-decorator-blob-1.svg" alt="Decorator blob" />
      </div>
    </AnimationRevealPage>
  );
};

export default Faq;
