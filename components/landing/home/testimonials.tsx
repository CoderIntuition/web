import React, { useState } from "react";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Container, ContentWithPaddingXl, HighlightedText } from "../landing-styles";
import {
  CompanyImage,
  ControlButton,
  ControlButtonIcon,
  Controls,
  ControlsDivider,
  CustomerInfo,
  CustomerInfoAndControlsContainer,
  CustomerName,
  CustomerProfilePicture,
  CustomerTextInfo,
  CustomerTitle,
  DecoratorBlob,
  Description,
  Heading,
  ImageColumn,
  Quote,
  Row,
  Subheading,
  Testimonial,
  TestimonialHeading,
  TestimonialSlider,
  TestimonialSliderStyles,
  TextColumn,
} from "./testimonial-styles";

const Testimonials = () => {
  const [sliderRef, setSliderRef] = useState<any>(null);

  const subheading = "TESTIMONIALS";
  const heading = (
    <>
      Interviewees <span className={HighlightedText}>Love</span> Us.
    </>
  );
  const description = "Check out what those who landed software jobs have to say.";
  const testimonials = [
    {
      profileImageSrc: "/images/michelle.png",
      heading: "I actually understand the intuition now!",
      quote:
        "I used to always read the solution when I got stuck, but I never actually understood " +
        "the underlying intuition since I'd get stuck again on similar problems. With CoderIntuition, " +
        "I learned how to approach problems without memorizing solutions and I aced my interview with Airbnb!",
      customerName: "Michelle L.",
      customerTitle: "Software Engineering Intern",
      companyImageSrc: "/images/airbnb.png",
    },
    {
      profileImageSrc: "/images/rohan.png",
      heading: "Helped build my problem-solving skillset!",
      quote:
        "CoderIntuition helped me develop my problem-solving skills for interview problems. " +
        "I found that other platforms only explain the solution without the intuition behind it. " +
        "I'm now a Software Engineer at Google thanks to CoderIntuition!",
      customerName: "Rohan G.",
      customerTitle: "Software Engineer",
      companyImageSrc: "/images/google.png",
    },
  ];

  return (
    <div className={Container}>
      <div className={ContentWithPaddingXl}>
        <div className={Row}>
          <div className={ImageColumn}>
            <Image src="/images/testimonials.svg" alt="Testimonials graphic" width="470px" height="470px" />
          </div>
          <div className={TextColumn}>
            <h1 className={Subheading}>{subheading}</h1>
            <h2 className={Heading}>{heading}</h2>
            <p className={Description}>{description}</p>
            <TestimonialSlider className={TestimonialSliderStyles} arrows={false} ref={setSliderRef}>
              {testimonials.map((testimonial, index) => (
                <div className={Testimonial} key={index}>
                  <div className={TestimonialHeading}>{testimonial.heading}</div>
                  <blockquote className={Quote}>{testimonial.quote}</blockquote>
                  <div className={CustomerInfoAndControlsContainer}>
                    <div className={CustomerInfo}>
                      <Image
                        className={CustomerProfilePicture}
                        src={testimonial.profileImageSrc}
                        alt={testimonial.customerName + "'s profile picture"}
                        width="100px"
                        height="100px"
                      />
                      <div className={CustomerTextInfo}>
                        <span className={CustomerName}>{testimonial.customerName}</span>
                        <p className={CustomerTitle}>{testimonial.customerTitle}</p>
                        <Image
                          className={CompanyImage}
                          src={testimonial.companyImageSrc}
                          alt={"Company logo"}
                          width="100px"
                          height="30px"
                        />
                      </div>
                    </div>
                    <div className={Controls}>
                      <button className={ControlButton} onClick={sliderRef?.slickPrev}>
                        <ArrowLeft className={ControlButtonIcon} />
                      </button>
                      <div className={ControlsDivider} />
                      <button className={ControlButton} onClick={sliderRef?.slickNext}>
                        <ArrowRight className={ControlButtonIcon} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </TestimonialSlider>
          </div>
        </div>
      </div>
      <img className={DecoratorBlob} src="/images/svg-decorator-blob-5.svg" alt="Decorator blob" />
    </div>
  );
};

export default Testimonials;
