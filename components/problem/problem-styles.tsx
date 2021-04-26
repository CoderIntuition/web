import styled from "styled-components";
import { Button, Dropdown, DropdownMenu, Menu, MenuMenu, Segment } from "semantic-ui-react";
import { AlertTriangle, Edit, Moon } from "react-feather";
import { RedButton } from "common/global-styles";

export const FlexDiv = styled.div`
  &&& {
    flex: 1 1 auto;
    display: flex;
    background-color: ${(props) => (props.dark ? "#16171b" : "")};
  }
`;

export const SplitterVerticalDiv = styled.div`
  &&& {
    flex: 1 1 auto;
    position: relative;
    overflow: hidden;
    height: calc(100vh - 60px);

    .splitter-layout > .layout-splitter {
      background-color: ${(props) => (props.dark ? "#303136" : "")};
    }
  }
`;

export const InfoDiv = styled.div`
  &&& {
    position: relative;
    height: 100%;
    min-height: 100%;
  }
`;

export const OuterPaddingDiv = styled.div`
  &&& {
    padding: 10px;
  }
`;

export const StyledMenu = styled(Menu)`
  &&& {
    border-bottom: ${(props) => (props.dark ? "1px solid #3b3d44" : "")};
    background-color: ${(props) => (props.dark ? "#242529" : "")};
  }
`;

export const StyledMenuItem = styled(Menu.Item)`
  &&&&& {
    background-color: ${(props) => (props.dark ? "#242529" : "")};
    color: ${(props) => (props.dark ? "#e0e0e0" : "")};
  }
`;

export const StyledDropdown = styled(Dropdown)`
  &&&&& {
    background-color: ${(props) => (props.dark ? "#242529" : "")};
    color: ${(props) => (props.dark ? "#e0e0e0" : "")};
  }
`;

export const StyledDropdownItem = styled(Dropdown.Item)`
  &&&&& {
    .text {
      color: ${(props) => (props.dark ? "#e0e0e0" : "")};
    }
  }
`;

export const StyledDropdownMenu = styled(DropdownMenu)`
  &&&&& {
    background-color: ${(props) => (props.dark ? "#242529" : "")};
  }
`;

export const StyledEdit = styled(Edit)`
  &&& {
    color: ${(props) => (props.dark ? "#e0e0e0" : "")};

    &:hover {
      color: #fbbd08;
      cursor: pointer;
    }
  }
`;

export const StyledAlertTriangle = styled(AlertTriangle)`
  &&& {
    color: ${(props) => (props.dark ? "#e0e0e0" : "")};

    &:hover {
      color: #fc5c65;
      cursor: pointer;
    }
  }
`;

export const StyledMoon = styled(Moon)`
  &&& {
    color: ${(props) => (props.dark ? "#4d69e9" : "")};

    &:hover {
      color: #4d69e9;
      cursor: pointer;
    }
  }
`;

export const Label = styled.span`
  &&& {
    display: block;
    margin-bottom: 4px;
    color: #000000de;
    font-size: 13px;
    font-weight: 600;
  }
`;

export const ContentSegment = styled(Segment)`
  &&& {
    overflow-y: hidden;
    height: ${(props) => props.height}px;
    padding: 0;
  }
`;

export const InfoContentWrapper = styled.div`
  &&& {
    max-height: 100%;
    height: 100%;
    overflow: auto;
    padding: 20px;
    background-color: ${(props) => (props.dark ? "#202125" : "")};
    color: ${(props) => (props.dark ? "#e0e0e0" : "")};
  }
`;

export const EditorWrapper = styled.div`
  &&& {
    max-height: 100%;
    height: 100%;
    background-color: ${(props) => (props.dark ? "#202125" : "")};
  }
`;

export const StyledEditor = styled.div`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  height: ${(props) => props.height};
  color: ${(props) => (props.dark ? "#e0e0e0" : "")};
`;

export const TestContentWrapper = styled.div`
  &&& {
    max-height: 100%;
    height: 100%;
    background-color: ${(props) => (props.dark ? "#202125" : "")};
  }
`;

export const BottomLeftButton = styled(RedButton)`
  &&& {
    float: left;
    margin-left: 10px;
  }
`;

export const BottomRightButton = styled(Button)`
  &&& {
    float: right;
    margin-right: 10px;
  }
`;

export const BottomBar = styled.div`
  &&& {
    height: 58px;
    min-width: 440px;
    width: 100%;
    position: absolute;
    bottom: 0;
    border-top: 1px solid;
    color: ${(props) => (props.dark ? "#e0e0e0" : "")};
    border-color: ${(props) => (props.dark ? "#202125" : "#d3d3d3cc")};
    background-color: ${(props) => (props.dark ? "#202125" : "#ffffff")};
    z-index: 1;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    line-height: 38px;
    padding-top: 10px;
  }
`;

export const RightSubMenu = styled(MenuMenu)`
  &&& {
    padding: 4px;
    margin-bottom: 3px;
    margin-top: 3px;
  }
`;

export const RunButton = styled(Button)`
  &&& {
    background-color: ${(props) => (props.dark ? "#e0e0e0" : "")};

    &:hover {
      background-color: ${(props) => (props.dark ? "#caccce" : "#f4f4f4")};
    }
  }
`;
