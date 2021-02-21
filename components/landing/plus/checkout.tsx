import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Button, Modal } from "semantic-ui-react";
import { getCurrentUserToken } from "common/auth-service";
import { showErrorToast, withGlobalContext } from "common/utils";
import { constants } from "common/constants";
import { GrayButton } from "common/global-styles";
import { StyledButton } from "./plus-styles";

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(constants.STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

const Checkout = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [signupModalOpen, setSignupModalOpen] = useState(false);

  const redirectToCheckout = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!props.authenticated) {
      setSignupModalOpen(true);
      setLoading(false);
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${getCurrentUserToken()}`,
      },
    };

    axios
      .post(constants.CHECKOUT_SESSION_URL, { priceId: props.priceId }, config)
      .then(async (res) => {
        const sessionId = res.data.id;
        const stripe = await getStripe();
        const { error } = await stripe.redirectToCheckout({
          sessionId: sessionId,
        });

        if (error) {
          console.log(error);
          showErrorToast("Stripe Connection Error", error.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        showErrorToast("Stripe Connection Error", "");
        setLoading(false);
      });
  };

  return (
    <>
      <StyledButton primary loading={loading} onClick={redirectToCheckout}>
        {props.authenticated ? "Upgrade Now" : "Buy Now"}
      </StyledButton>
      <Modal closeOnEscape={true} size="tiny" open={signupModalOpen} onClose={() => setSignupModalOpen(false)}>
        <Modal.Header>Get Intuition+</Modal.Header>
        <Modal.Content>
          <p>Create a CoderIntuition account first and then you can upgrade your account to Intuition+.</p>
        </Modal.Content>
        <Modal.Actions>
          <GrayButton onClick={() => router.push("/login")}>Log In</GrayButton>
          <Button primary onClick={() => router.push("/signup")}>
            Sign Up
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default withGlobalContext(Checkout);
