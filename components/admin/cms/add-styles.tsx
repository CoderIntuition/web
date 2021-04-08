import styled from "styled-components";
import { Grid, Header, Segment } from "semantic-ui-react";

export const StyledGrid = styled(Grid)`
  &&& {
    margin: 20px 20px 80px 20px;
  }
`;

export const StyledSegment = styled(Segment)`
  &&& {
    width: 100%;
    margin-inline: 20px;
    padding: 30px;
  }
`;

export const SegmentHeader = styled(Header)`
  &&& {
    color: #243e63;
    font-weight: 500;
    font-size: 20px;
  }
`;

export const Divider = styled.hr`
  width: 100%;
  margin-inline: 10px;
`;

export const SectionDivider = styled.hr`
  width: 10%;
  height: 5px;
  color: #000000;
  background-color: #243e63;
  border-radius: 999px;
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

export const TemplateSpan = styled.span`
  float: right;
  font-weight: 500;
  color: #4d69e9;
  cursor: pointer;
  &:hover {
    color: #1c41e3;
  }
`;

export const RadioDiv = styled.div`
  &&& {
    display: flex;
    align-items: center;
    margin-top: 15px;
`;

export const RadioLeftLabel = styled.span`
  &&& {
    font-weight: 600;
    margin-right: 10px;
  }
`;

export const RadioRightLabel = styled.span`
  &&& {
    font-weight: 600;
    margin-left: 10px;
  }
`;
