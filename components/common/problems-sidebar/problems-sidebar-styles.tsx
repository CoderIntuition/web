import styled from "styled-components";
import { Menu } from "semantic-ui-react";

export const FlexWrapper = styled.div`
  display: flex;
  padding: 30px 30px 50px 30px;
`;

export const SidebarContainer = styled.div`
  flex: 0 0 250px;
`

export const SidebarMenu = styled(Menu)`
  &&& {
    width: 100%;
    padding: 5px;
    border-radius: 10px;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
  }
`;

export const Spacer = styled.div`
  flex: 0 0 30px;
`

export const ContentDiv = styled.div`
  &&& {
    flex: 1;
  }
`;

export const StyledMenuHeader = styled(Menu.Header)`
  &&& {
    font-size: 1.2em !important;
    color: #1a202c !important;
  }
`;

export const StyledMenuItem = styled(Menu.Item)`
  &&& {
    font-size: 1em !important;
  }
`;
