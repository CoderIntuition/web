import styled from "styled-components";
import { Button, Form, Menu, Segment } from "semantic-ui-react";

export const FlexWrapper = styled.div`
  display: flex;
  padding: 60px 90px 90px 90px;
  max-width: 1280px;
  margin: auto;
`;

export const SidebarContainer = styled.div`
  flex: 0 0 250px;
`;

export const SidebarSettingsMenu = styled(Menu)`
  &&& {
    width: 100%;
    padding: 5px;
    border-radius: 10px;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
  }
`;

export const SettingsHeader = styled(Menu.Header)`
  &&&&&& {
    font-size: 1.2em;
    color: #1a202c;
  }
`;

export const SettingsMenuItem = styled(Menu.Item)`
  &&&&&& {
    font-size: 1em;
  }
`;

export const Spacer = styled.div`
  flex: 0 0 35px;
`;

export const SettingsSegment = styled(Segment)`
  &&& {
    flex: 1;
    margin: 0;
    padding: 30px 40px 40px;
  }
`;

export const Heading = styled.h1`
  color: #243e63;
  font-size: 25px;
  font-weight: 500;
  letter-spacing: 0.025em;
  margin-bottom: 25px;
`;

export const StyledInput = styled(Form.Input)`
  &&&&& {
    display: flex;
    flex-direction: column;
    .label {
      padding: 0 0 4px 0;
      background: none;
      color: #000000;
      font-weight: 600;
    }
    .icon {
      color: ${(props) => (props.inputerror === "" ? "#20BF6B" : "#FC5C65")};
    }
    &.disabled {
      opacity: 1;
    }
    &.disabled > label {
      opacity: 1;
    }
  }
`;

export const StyledDropdown = styled(Form.Dropdown)`
  &&& {
    .dropdown {
      color: #5a6778;
    }
  }
`;

export const StyledButton = styled(Button)`
  &&& {
    margin-top: 30px;
    padding: 15px 20px;
  }
`;

export const ProfilePictureWrapper = styled.div`
  position: relative;
`;

export const ImageEditButton = styled(Button)`
  &&& {
    position: absolute;
    top: 85%;
    left: 85%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    background-color: #4d69e9;
    color: #ffffff;
  }
`;
