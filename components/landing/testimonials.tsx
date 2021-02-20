import React, {useState} from "react";
import "slick-carousel/slick/slick.css";
import {ArrowLeft, ArrowRight} from "react-feather";
import {Container, ContentWithPaddingXl, HighlightedText,} from "./landing-styles";
import {
  CompanyImage,
  ControlButton,
  Controls,
  CustomerInfo,
  CustomerInfoAndControlsContainer,
  CustomerName,
  CustomerProfilePicture,
  CustomerTextInfo,
  CustomerTitle,
  DecoratorBlob,
  Description,
  Heading,
  Image,
  ImageColumn,
  Quote,
  Row,
  Subheading,
  Testimonial,
  TestimonialHeading,
  TestimonialSlider,
  TextColumn,
} from "./testimonial-styles";

const Testimonials = () => {
  const [sliderRef, setSliderRef] = useState<any>(null);

  const subheading = "TESTIMONIALS";
  const heading = (
    <>
      Interviewees <HighlightedText>Love</HighlightedText> Us.
    </>
  );
  const description =
    "Check out what those who landed software jobs have to say.";
  const testimonials = [
    {
      profileImageSrc: "/images/michelle.png",
      heading: "I actually understand the intuition now!",
      quote:
        "I used to attempt the problems on Leetcode, but after getting stuck I would always just read the solution. " +
        "However, I never actually had a solid understanding of the concepts since I would get stuck again on similar " +
        "problems that I attempted. With CoderIntuition, I actually learned how to approach any problem and it really " +
        "helped me ace my interview with Airbnb!!",
      customerName: "Michelle L.",
      customerTitle: "Software Engineering Intern",
      companyImageSrc: "/images/airbnb.png",
    },
    {
      profileImageSrc: "/images/rohan.png",
      heading: "Helped build my problem-solving skillset!",
      quote:
        "CoderIntuition really helped me develop my problem-solving skill set for interview problems. " +
        "I found that other platforms only explain the solution without the intuition behind it. " +
        "I really enjoyed the quizzes that CoderIntuition has that help build algorithmic intuition. " +
        "CoderIntuition also saved me lots of time from watching 45-minute long solution " +
        "videos. I'm now a Software Engineer at Google thanks to the help of CoderIntuition!",
      customerName: "Rohan G.",
      customerTitle: "Software Engineer",
      companyImageSrc: "/images/google.png",
    },
  ];

  return (
    <Container>
      <ContentWithPaddingXl>
        <Row>
          <ImageColumn>
            <Image
              src="/images/testimonials.svg"
              alt="Testimonials graphic"
              width="800px"
              height="800px"
              imageborder={0}
              imageshadow={0}
              imagerounded={1}
            />
          </ImageColumn>
          <TextColumn textOnLeft={false}>
            <Subheading>{subheading}</Subheading>
            <Heading>{heading}</Heading>
            <Description>{description}</Description>
            <TestimonialSlider arrows={false} ref={setSliderRef}>
              {testimonials.map((testimonial, index) => (
                <Testimonial key={index}>
                  <TestimonialHeading>{testimonial.heading}</TestimonialHeading>
                  <Quote>{testimonial.quote}</Quote>
                  <CustomerInfoAndControlsContainer>
                    <CustomerInfo>
                      <CustomerProfilePicture
                        src={testimonial.profileImageSrc}
                        alt={testimonial.customerName + "'s profile picture"}
                        width="100px"
                        height="100px"
                      />
                      <CustomerTextInfo>
                        <CustomerName>{testimonial.customerName}</CustomerName>
                        <CustomerTitle>
                          {testimonial.customerTitle}
                        </CustomerTitle>
                        <CompanyImage
                          src={testimonial.companyImageSrc}
                          alt={"Company logo"}
                          width="100px"
                          height="100px"
                        />
                      </CustomerTextInfo>
                    </CustomerInfo>
                    <Controls>
                      <ControlButton onClick={sliderRef?.slickPrev}>
                        <ArrowLeft/>
                      </ControlButton>
                      <div className="divider"/>
                      <ControlButton onClick={sliderRef?.slickNext}>
                        <ArrowRight/>
                      </ControlButton>
                    </Controls>
                  </CustomerInfoAndControlsContainer>
                </Testimonial>
              ))}
            </TestimonialSlider>
          </TextColumn>
        </Row>
      </ContentWithPaddingXl>
      <DecoratorBlob
        src="/images/svg-decorator-blob-2.svg"
        alt="Decorator blob"
      />
    </Container>
  );
};

export default Testimonials;
