import styled from "styled-components";
import {
  Button,
  Image,
  Grid,
  GridRow,
  Header,
  Icon,
  Label,
  List,
  Progress,
  Segment,
  Statistic,
} from "semantic-ui-react";

export const StyledGrid = styled(Grid)`
  &&& {
    margin: 30px 60px 60px;
  }
`;

export const MarginRow = styled(GridRow)`
  &&& {
    margin-bottom: 20px;
  }
`;

export const HeaderRow = styled(GridRow)`
  &&& {
    margin-top: 5px;
  }
`;

export const StyledProfileDiv = styled.div`
  &&& {
    margin-bottom: 35px;
  }
`;

export const ProfilePicture = styled(Image)`
  &&& {
    width: 180px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    border: 6px solid #ffffff;
    margin-bottom: -5px;
  }
`;

export const ProfileName = styled(Header)`
  &&& {
    margin-bottom: 2px;
  }
`;

export const ProfileUsername = styled.p`
  &&& {
    margin-bottom: 10px;
    font-weight: 400;
    color: #7c8ba1;
    font-size: 16px;
  }
`;

export const ProfileBadge = styled(Label)`
  &&&&& {
    padding: 10px;
    background-color: #ecb645;
    color: #ffffff;
    margin-bottom: 10px;
  }
`;

export const JoinedDate = styled.p`
  &&& {
    font-size: 12px;
    font-weight: 500;
  }
`;

export const StatsContentRow = styled(GridRow)`
  &&& {
    height: 120px;
    align-content: center;
  }
`;

export const StyledNavIcon = styled(Icon)`
  &&& {
    cursor: pointer;
  }
`;

export const SocialButton = styled(Button)`
  &&& {
    margin: 0 10px 5px;
    width: 40px;
    height: 40px;
    background: #4d69e9;
  }
`;

export const ActivityGrid = styled(Grid)`
  &&& {
    margin: 0;
  }
`;

export const ActivityHeader = styled(List.Header)`
  &&& {
    text-transform: capitalize;
  }
`;

export const ActivitySegment = styled(Segment)`
  &&& {
    padding: 10px 30px;
    min-height: 630px;
  }
`;

export const ActivityList = styled(List)`
  &&& {
    width: 100%;
  }
`;

export const HexagonDiv = styled.div`
  &&& {
    background-image: url(${"/images/hexagon.svg"});
    width: 125px;
    height: 140px;
  }
`;

export const HexagonStatistic = styled(Statistic)`
  &&& {
    margin-top: 40px;
  }
`;

export const PointsBarRow = styled(GridRow)`
  &&& {
    padding: 15px 30px 30px 30px;
  }
`;

export const StyledProgress = styled(Progress)`
  &&& {
    width: 100%;
  }
`;

export const BadgesGrid = styled(Grid)`
  &&& {
    margin-block: 2px;
  }
`;

export const BadgeRow = styled(GridRow)`
  &&&& {
    margin-inline: 10px;

    &:not(:first-child) {
      margin-top: -20px;
    }
  }
`;

export const Badge = styled(Image)`
  &&& {
    width: 100px;
    margin-bottom: 5px;
  }
`;
