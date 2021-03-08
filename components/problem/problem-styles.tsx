import styled from "styled-components";
import { Button, MenuMenu, Segment } from "semantic-ui-react";
import { AlertTriangle, Moon } from "react-feather";
import { RedButton } from "common/global-styles";

export const NavbarLine = styled.hr`
  &&& {
    margin-top: 0;
    margin-bottom: 0;
    background-color: #d3d3d3;
    height: 1px;
    border: none;
`;

export const FlexDiv = styled.div`
  &&& {
    flex: 1 1 auto;
    display: flex;
  }
`;

export const SplitterVerticalDiv = styled.div`
  &&& {
    flex: 1 1 auto;
    position: relative;
    overflow: hidden;
    height: calc(100vh - 61px);
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

export const StyledAlertTriangle = styled(AlertTriangle)`
  &&& {
    &:hover {
      color: #fc5c65;
      cursor: pointer;
    }
  }
`;

export const StyledMoon = styled(Moon)`
  &&& {
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
    overflow: auto;
    padding: 20px;
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
    width: 100%;
    position: absolute;
    bottom: 0;
    border-top: 1px solid;
    border-color: #d3d3d3cc;
    background-color: #ffffff;
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
    &:hover {
      background-color: #f4f4f4 !important;
    }
  }
`;
