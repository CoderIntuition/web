import styled from "styled-components";
import { Menu } from "semantic-ui-react";

export const SidebarProblemsMenu = styled(Menu)`
  &&& {
    position: absolute;
    margin-top: 30px;
    width: 260px;
    border-radius: 10px;
    padding: 5px;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  }
`;

export const ContentDiv = styled.div`
  &&& {
    margin-left: 290px;
    padding: 40px;
  }
`;

export const StyledMenuHeader = styled(Menu.Header)`
  &&& {
    font-size: 1.3em !important;
    color: #1a202c !important;
  }
`;

export const StyledMenuItem = styled(Menu.Item)`
  &&& {
    font-size: 1em !important;
  }
`;
