import React, { useEffect, useState } from "react";
import axios from "axios";
import AnimationRevealPage from "components/common/helpers/animation-reveal-page";
import { showErrorToast, showSuccessToast } from "common/utils";
import { Button, Loader } from "semantic-ui-react";
import { constants } from "common/constants";
import {
  Container,
  Description,
  Form,
  Heading,
  Image,
  ImageColumn,
  StyledInput,
  StyledTextarea,
  Subheading,
  TextColumn,
  TextContent,
  TwoColumn,
} from "./contact-styles";

class ContactForm extends React.Component<any, any> {
  state = {
    email: "",
    name: "",
    subject: "",
    message: "",
    sending: false,
  };

  handleSend() {
    if (this.state.email === "" || this.state.name === "" || this.state.subject === "" || this.state.message === "") {
      showErrorToast("Error", "Please fill out all of the fields.");
      return;
    }
    this.setState({ sending: true });

    const request = {
      email: this.state.email,
      name: this.state.name,
      subject: this.state.subject,
      message: this.state.message,
    };
    axios
      .post(constants.SUPPORT_URL, request)
      .then(() => {
        showSuccessToast("Success", "Your support ticket has been submitted. We will get back to you within 24 hours.");
        this.setState({
          email: "",
          name: "",
          message: "",
          sending: false,
        });
      })
      .catch((err) => {
        showErrorToast(err.response.data.message, err.response.data.details[0]);
      });
  }

  render() {
    return (
      <Form>
        <StyledInput
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => this.setState({ email: e.target.value })}
        />
        <StyledInput
          type="text"
          name="name"
          placeholder="Name"
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <StyledInput
          type="text"
          name="subject"
          placeholder="Subject"
          onChange={(e) => this.setState({ subject: e.target.value })}
        />
        <StyledTextarea
          name="message"
          placeholder="Your Message"
          onChange={(e) => this.setState({ message: e.target.value })}
        />
        <Button
          primary
          type="button"
          style={{ marginTop: 30 }}
          loading={this.state.sending}
          onClick={() => this.handleSend()}
        >
          Send
        </Button>
      </Form>
    );
  }
}

const Contact = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Loader active inverted size="large">
        Loading
      </Loader>
    );
  }

  return (
    <AnimationRevealPage>
      <Container>
        <TwoColumn>
          <ImageColumn>
            <Image imageSrc="/images/contact.svg" alt="Contact us graphic" width="800px" height="800px" />
          </ImageColumn>
          <TextColumn textOnLeft={true}>
            <TextContent>
              <Subheading>Contact Us</Subheading>
              <Heading>Feel free to get in touch</Heading>
              <Description>
                If you have any questions or discovered any issues with our website, please fill this form and our
                customer support team will get back to you within 24 hours!
              </Description>
              <ContactForm />
            </TextContent>
          </TextColumn>
        </TwoColumn>
      </Container>
    </AnimationRevealPage>
  );
};

export default Contact;
