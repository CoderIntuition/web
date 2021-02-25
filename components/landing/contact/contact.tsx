import React from "react";
import Image from "next/image";
import axios from "axios";
import { Button } from "semantic-ui-react";
import AnimationRevealPage from "components/common/helpers/animation-reveal-page";
import { showErrorToast, showSuccessToast } from "common/utils";
import { constants } from "common/constants";
import { Container } from "../landing-styles";
import {
  Description,
  Form,
  Heading,
  ImageColumn,
  Input,
  Subheading,
  TextArea,
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
      <form className={Form}>
        <input
          className={Input}
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => this.setState({ email: e.target.value })}
        />
        <input
          className={Input}
          type="text"
          name="name"
          placeholder="Name"
          onChange={(e) => this.setState({ name: e.target.value })}
        />
        <input
          className={Input}
          type="text"
          name="subject"
          placeholder="Subject"
          onChange={(e) => this.setState({ subject: e.target.value })}
        />
        <textarea
          className={TextArea}
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
      </form>
    );
  }
}

const Contact = () => {
  return (
    <AnimationRevealPage>
      <div className={Container}>
        <div className={TwoColumn}>
          <div className={ImageColumn}>
            <Image src="/images/contact.svg" alt="Contact us graphic" width="800px" height="800px" />
          </div>
          <div className={TextColumn}>
            <div className={TextContent}>
              <h1 className={Subheading}>Contact Us</h1>
              <h2 className={Heading}>Feel free to get in touch</h2>
              <p className={Description}>
                If you have any questions or discovered any issues with our website, please fill this form and our
                customer support team will get back to you within 24 hours!
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </AnimationRevealPage>
  );
};

export default Contact;
