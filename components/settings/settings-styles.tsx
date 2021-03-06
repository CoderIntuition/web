import styled from "styled-components";
import { Button, Form, Menu, Segment } from "semantic-ui-react";
import cntl from "cntl";

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

export const BillingButton = styled(Button)`
  &&& {
    padding: 16px 24px;
    margin-bottom: 30px;
    width: fit-content;
    align-self: center;
  }
`;

export const Plan = cntl`w-full max-w-80 mt-8 md:mr-12 md:last:mr-0 text-center px-8 rounded-2xl relative text-gray-900 bg-white flex flex-col shadow-lg`;

export const PlanDuration = cntl`lowercase text-gray-600 font-medium tracking-widest`;

export const PlanFeatures = cntl`flex flex-col -mx-8 px-8 py-8 flex-1 text-base`;

export const PlanFeaturesSpan = styled.span`
  margin-top: 15px;
  font-weight: 400;
  color: #667892;
  &:first-child {
    margin-top: 0;
  }
`;

export const PlanFreeName = cntl`font-semibold text-gray-800 text-xl`;

export const PlanHeader = cntl`flex flex-col leading-relaxed py-8 -mx-8 bg-primary-100 rounded-t-lg`;

export const PlanMainFeature = cntl`text-gray-600 text-sm font-medium tracking-wide`;

export const PlanPrice = cntl`font-bold text-gray-800 text-4xl sm:text-5xl my-1`;

export const PlanSlash = cntl`text-xl text-gray-600`;
