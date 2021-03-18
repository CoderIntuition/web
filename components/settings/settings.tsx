import React, { FC, useEffect, useState } from "react";
import { Button, Form, Grid, GridColumn, Image, Loader, Menu, Message } from "semantic-ui-react";
import {
  FlexWrapper,
  Heading,
  ImageEditButton,
  ProfilePictureWrapper,
  SettingsHeader,
  SettingsMenuItem,
  SettingsSegment,
  SidebarContainer,
  SidebarSettingsMenu,
  StyledButton,
  StyledInput,
} from "./settings-styles";
import { constants } from "common/constants";
import { getCurrentUserToken } from "common/auth-service";
import { showErrorToast, showSuccessToast, withGlobalContext } from "common/utils";
import axios from "axios";
import { NextRouter } from "next/router";
import Link from "next/link";
import { Spacer } from "../common/problems-sidebar/problems-sidebar-styles";

interface SettingsProps {
  router: NextRouter;
  authenticated: boolean;
  currentUser: any;
  loadCurrentUser: (type: string) => void;
}

const Settings: FC<SettingsProps> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [usernameMessage, setUsernameMessage] = useState<string>("");
  const [nameMessage, setNameMessage] = useState<string>("");
  const [state, setState] = useState({
    name: props.currentUser.name,
    username: props.currentUser.username,
    github: props.currentUser.githubLink,
    linkedin: props.currentUser.linkedinLink,
    website: props.currentUser.websiteLink,
    language: props.currentUser.language,
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // Effect 1 - runs once, upon mounting the component
  useEffect(() => {
    if (!props.authenticated) {
      props.router.push("/login");
      return;
    }
    setLoading(false);
  }, []);

  // Effect 2 - runs when user saved their changes and the settings are updated
  // Reset the username and name error messages to empty string
  useEffect(() => {
    setUsernameMessage("");
    setNameMessage("");
  }, [props.router.query.setting]);

  // Effect 3 - Runs when the username state changes
  useEffect(() => {
    let timeoutId;
    if (state.username === "") {
      setUsernameMessage("Username cannot be empty.");
      return;
    } else if (state.username === props.currentUser.username) {
      setUsernameMessage("");
    } else {
      timeoutId = setTimeout(() => {
        const url = constants.USER_PROFILE_URL + state.username;
        axios
          .get(url)
          .then((_res) => {
            setUsernameMessage("Username is already taken.");
            return;
          })
          .catch((error) => {
            if (error.response.status === 404) {
              setUsernameMessage("");
            }
          });
      }, 1000);
    }
    return () => clearTimeout(timeoutId);
  }, [state.username]);

  // Loading state
  if (loading) {
    return (
      <Loader active inverted size="large">
        Loading
      </Loader>
    );
  }

  if (props.currentUser === null) {
    props.router.push("/");
    return null;
  }

  const handleChange = (field, e) => {
    if (field === "name") {
      if (e.target.value === "") {
        setNameMessage("Please enter your name.");
        return;
      } else {
        setNameMessage("");
      }
    }

    // Set states for the input fields
    setState({
      ...state,
      [field]: e.target.value,
    });
  };

  const onChangeDropDown = (event, value) => {
    setState({ ...state, language: value.value });
  };

  const handleSaveGeneral = () => {
    const token = getCurrentUserToken();
    if (usernameMessage !== "" || nameMessage !== "") {
      showErrorToast("Error", "Failed to update - please try again.");
      return;
    }
    setSaving(true);
    fetch(constants.USER_PROFILE_URL + "me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: state.name,
        username: state.username,
        githubLink: state.github,
        linkedinLink: state.linkedin,
        websiteLink: state.website,
        language: state.language,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          showErrorToast("Error", "Failed to update - please try again.");
          return;
        }
        setSaving(false);
        props.loadCurrentUser("SETTINGS");
      })
      .catch((error) => {
        showErrorToast(error.message, error.details[0]);
        setSaving(false);
      });
  };

  const handleChangePassword = () => {
    if (state.newPassword !== state.confirmNewPassword) {
      showErrorToast("Error", "Your passwords do not match.");
      return;
    }
    const url = constants.CHANGE_PASSWORD_URL;
    const config = {
      headers: {
        Authorization: `Bearer ${getCurrentUserToken()}`,
      },
    };
    const request = {
      currentPassword: state.currentPassword,
      newPassword: state.newPassword,
    };
    setSaving(true);
    axios
      .post(url, request, config)
      .then((_res) => {
        setSaving(false);
        showSuccessToast("Success", "Your password has been updated.");
        setState({
          ...state,
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      })
      .catch((error) => {
        showErrorToast("Error", error.response.data.message);
        setSaving(false);
      });
  };

  const settingsSidebar = () => {
    return (
      <>
        <SettingsHeader>Settings</SettingsHeader>
        <Menu.Menu>
          <Link href="/settings/general" passHref>
            <a>
              <SettingsMenuItem active={props.router.query.setting === "general" || !props.router.query.setting}>
                General
              </SettingsMenuItem>
            </a>
          </Link>
          <Link href="/settings/password" passHref>
            <a>
              <SettingsMenuItem active={props.router.query.setting === "password"}>
                Password & Security
              </SettingsMenuItem>
            </a>
          </Link>
          <Link href="/settings/membership" passHref>
            <a>
              <SettingsMenuItem active={props.router.query.setting === "membership"}>Membership</SettingsMenuItem>
            </a>
          </Link>
        </Menu.Menu>
      </>
    );
  };

  const handleStripePortal = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${getCurrentUserToken()}`,
      },
    };
    axios
      .post(constants.CUSTOMER_PORTAL_URL, {}, config)
      .then((res) => {
        window.location.replace(res.data.url);
      })
      .catch((_err) => {
        showErrorToast("Error", "Could not redirect to Stripe. Please contact support.");
      });
  };

  const profileImageSettings = () => {
    return (
      <ProfilePictureWrapper>
        <Image src="/images/michelle.png" size="medium" circular />
        <ImageEditButton circular icon="edit" />
      </ProfilePictureWrapper>
    );
  };

  const generalSettings = () => {
    const languageOptions = [
      {
        key: "python",
        text: "Python",
        value: "PYTHON",
      },
      {
        key: "java",
        text: "Java",
        value: "JAVA",
      },
      {
        key: "javascript",
        text: "JavaScript",
        value: "JAVASCRIPT",
      },
    ];
    return (
      <>
        <Heading>General</Heading>
        <Grid relaxed="very">
          <GridColumn width={12}>
            <Form error={nameMessage !== "" || usernameMessage !== ""}>
              <StyledInput
                label="Name"
                onChange={(e) => handleChange("name", e)}
                defaultValue={props.currentUser.name}
              />
              {nameMessage === "" ? <></> : <Message error content={nameMessage} />}
              <StyledInput
                label="Username"
                onChange={(e) => handleChange("username", e)}
                defaultValue={props.currentUser.username}
                inputerror={usernameMessage}
                icon={usernameMessage === "" ? "check circle" : "times circle"}
              />
              {usernameMessage === "" ? <></> : <Message error content={usernameMessage} />}
              <StyledInput
                label="Github"
                onChange={(e) => handleChange("github", e)}
                defaultValue={props.currentUser.githubLink}
              />
              <StyledInput
                label="Linkedin"
                onChange={(e) => handleChange("linkedin", e)}
                defaultValue={props.currentUser.linkedinLink}
              />
              <StyledInput
                label="Website"
                onChange={(e) => handleChange("website", e)}
                defaultValue={props.currentUser.websiteLink}
              />
              <Form.Dropdown
                label="Language"
                fluid
                selection
                header="Choose language"
                defaultValue={props.currentUser.language}
                onChange={onChangeDropDown}
                options={languageOptions}
              />
            </Form>
          </GridColumn>
          <GridColumn width={4}>{profileImageSettings()}</GridColumn>
        </Grid>
        <StyledButton primary loading={saving} onClick={() => handleSaveGeneral()}>
          Save Changes
        </StyledButton>
      </>
    );
  };

  const passwordSettings = () => {
    return (
      <>
        <Heading>Change Password</Heading>
        <Form>
          <StyledInput
            label="Current Password"
            type="password"
            value={state.currentPassword}
            onChange={(e) => handleChange("currentPassword", e)}
          />
          <StyledInput
            label="New Password"
            type="password"
            value={state.newPassword}
            onChange={(e) => handleChange("newPassword", e)}
          />
          <StyledInput
            label="Confirm New Password"
            type="password"
            value={state.confirmNewPassword}
            onChange={(e) => handleChange("confirmNewPassword", e)}
          />
        </Form>
        <StyledButton primary loading={saving} onClick={() => handleChangePassword()}>
          Save Changes
        </StyledButton>
      </>
    );
  };

  const planSettings = () => {
    return (
      <>
        <Heading>Membership</Heading>
        <Button primary onClick={() => handleStripePortal()} style={{ padding: "15px 20px" }}>
          Go to Stripe
        </Button>
      </>
    );
  };

  return (
    <FlexWrapper>
      <SidebarContainer>
        <SidebarSettingsMenu vertical>
          <Menu.Item>{settingsSidebar()}</Menu.Item>
        </SidebarSettingsMenu>
      </SidebarContainer>
      <Spacer />
      <SettingsSegment raised>
        {props.router.query.setting === "general" || !props.router.query.setting
          ? generalSettings()
          : props.router.query.setting === "password"
          ? passwordSettings()
          : planSettings()}
      </SettingsSegment>
    </FlexWrapper>
  );
};

export default withGlobalContext(Settings);
