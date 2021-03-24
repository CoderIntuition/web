import React, { FC, useEffect, useState } from "react";
import { Grid, GridColumn, GridRow, Header, Label, List, Loader, Segment, Statistic } from "semantic-ui-react";
import { Award, CheckCircle, GitHub, Globe, Linkedin, PlusCircle, Upload } from "react-feather";
import {
  ActivityGrid,
  ActivityHeader,
  ActivityList,
  ActivitySegment,
  Badge,
  BadgeRow,
  BadgesGrid,
  HeaderRow,
  HexagonDiv,
  HexagonStatistic,
  JoinedDate,
  MarginRow,
  PointsBarRow,
  ProfileBadge,
  ProfileName,
  ProfilePicture,
  ProfileUsername,
  SocialButton,
  StatsContentRow,
  StyledGrid,
  StyledNavIcon,
  StyledProfileDiv,
  StyledProgress,
} from "./user-styles";
import axios from "axios";
import { constants } from "common/constants";
import { NextRouter } from "next/router";
import moment from "moment/moment";
import Head from "next/head";

interface UserProps {
  router: NextRouter;
}

export const User: FC<UserProps> = (props) => {
  const [user, setUser] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [statsIndex, setStatsIndex] = useState<number>(0);

  const maxStatsPages = 2;

  // Effect 1 - upon mounting, load user
  useEffect(() => {
    const url = constants.USER_PROFILE_URL + props.router.query.username;
    axios
      .get(url)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((_error) => {
        setLoading(true);
      });
  }, []);

  const handleNavButtons = (direction) => {
    if (direction === "right") {
      if (statsIndex < maxStatsPages - 1) {
        setStatsIndex(statsIndex + 1);
      } else {
        setStatsIndex(0);
      }
    } else {
      if (statsIndex > 0) {
        setStatsIndex(statsIndex - 1);
      } else {
        setStatsIndex(maxStatsPages - 1);
      }
    }
  };

  const ProfileSection = (
    <StyledProfileDiv>
      <ProfilePicture centered circular src={user.profilePicturePath || "/images/profile-placeholder.jpg"} />
      <ProfileName size="large">{user.name}</ProfileName>
      <ProfileUsername>{user.username}</ProfileUsername>
      {user.plusRole === true ? <ProfileBadge circular>Intuition+</ProfileBadge> : <></>}
      <JoinedDate>Joined {user.joinedDate}</JoinedDate>
    </StyledProfileDiv>
  );

  const StatsSection = (
    <Segment raised>
      <Grid>
        <HeaderRow centered>
          <Header as="h4">Statistics</Header>
        </HeaderRow>
        <StatsContentRow centered>
          {statsIndex === 0 ? (
            <Statistic size="small">
              <Statistic.Value>{user.numCompletedProblems}</Statistic.Value>
              <Statistic.Label>Problem{user.numCompletedProblems === 1 ? "" : "s"} Solved</Statistic.Label>
            </Statistic>
          ) : (
            <div>page 2</div>
          )}
        </StatsContentRow>
        <GridRow centered>
          <StyledNavIcon name="triangle left" size="large" onClick={() => handleNavButtons("left")} />
          <StyledNavIcon name="triangle right" size="large" onClick={() => handleNavButtons("right")} />
        </GridRow>
      </Grid>
    </Segment>
  );

  const SocialMediaSection = (
    <Segment raised>
      <Grid>
        <HeaderRow centered>
          <Header as="h4">Links</Header>
        </HeaderRow>
        <GridRow centered>
          {!user.githubLink && !user.linkedinLink && !user.websiteLink && (
            <div>The user hasn't added any links yet!</div>
          )}
          {user.githubLink && (
            <SocialButton href={user.githubLink} target="_blank" icon circular color="black">
              <GitHub color="white" size={18} />
            </SocialButton>
          )}
          {user.linkedinLink && (
            <SocialButton href={user.linkedinLink} target="_blank" icon circular color="linkedin">
              <Linkedin color="white" size={18} />
            </SocialButton>
          )}
          {user.websiteLink && (
            <SocialButton href={user.websiteLink} target="_blank" icon circular color="grey">
              <Globe color="white" size={18} />
            </SocialButton>
          )}
        </GridRow>
      </Grid>
    </Segment>
  );

  const formatActivityType = (activityType: string): string => {
    const removedUnderScore = activityType.replace(/_/g, " ").toLowerCase();
    return removedUnderScore.charAt(0).toUpperCase() + removedUnderScore.slice(1);
  };

  const ActivitySection = (
    <ActivitySegment raised padded>
      <ActivityGrid>
        <HeaderRow>
          <Header as="h4">Activity</Header>
        </HeaderRow>
        <GridRow>
          <ActivityList divided relaxed verticalAlign="middle">
            {user.activities?.length !== 0 ? (
              user.activities?.map((activity, index) => (
                <List.Item key={index}>
                  {activity.submissionStatus && (
                    <List.Content floated="right" verticalAlign="middle">
                      <Label color={activity.submissionStatus === "ACCEPTED" ? "green" : "red"} circular size="tiny">
                        {activity.submissionStatus}
                      </Label>
                    </List.Content>
                  )}
                  <List.Icon>
                    {activity.activityType === "LEARN_INTUITION" ? (
                      <CheckCircle />
                    ) : activity.activityType === "SUBMIT_PROBLEM" ? (
                      <Upload />
                    ) : activity.activityType === "EARN_BADGE" ? (
                      <Award />
                    ) : activity.activityType === "UPGRADE_PLUS" ? (
                      <PlusCircle />
                    ) : null}
                  </List.Icon>
                  <List.Content>
                    <ActivityHeader>
                      {formatActivityType(activity.activityType) + ": "}
                      <a href={constants.PROBLEM_WEB_URL + activity.problemUrl} target="_blank">
                        <span>{activity.problemName}</span>
                      </a>
                    </ActivityHeader>
                    <List.Description>{moment(activity.createdDate).format("MMM Do YYYY, h:mm a")}</List.Description>
                  </List.Content>
                </List.Item>
              ))
            ) : (
              <div>The user doesn't have any activities to display.</div>
            )}
          </ActivityList>
        </GridRow>
      </ActivityGrid>
    </ActivitySegment>
  );

  const LevelSection = (
    <Segment raised>
      <Grid>
        <HeaderRow centered>
          <Header as="h4">Level</Header>
        </HeaderRow>
        <GridRow centered>
          <HexagonDiv>
            <HexagonStatistic>
              <Statistic.Value>30</Statistic.Value>
            </HexagonStatistic>
          </HexagonDiv>
        </GridRow>
        <PointsBarRow centered>
          <StyledProgress percent={30} indicating size="small">
            520 points to next level
          </StyledProgress>
        </PointsBarRow>
      </Grid>
    </Segment>
  );

  const BadgeSection = (
    <Segment raised>
      <Grid>
        <HeaderRow centered>
          <Header as="h4">Badges</Header>
        </HeaderRow>
        <BadgesGrid>
          <BadgeRow centered columns={3}>
            <GridColumn>
              <Badge centered src="/images/logo.svg" />
            </GridColumn>
            <GridColumn>
              <Badge centered src="/images/logo.svg" />
            </GridColumn>
            <GridColumn>
              <Badge centered src="/images/logo.svg" />
            </GridColumn>
          </BadgeRow>
          <BadgeRow centered columns={3}>
            <GridColumn>
              <Badge centered src="/images/logo.svg" />
            </GridColumn>
            <GridColumn>
              <Badge centered src="/images/logo.svg" />
            </GridColumn>
            <GridColumn>
              <Badge centered src="/images/logo.svg" />
            </GridColumn>
          </BadgeRow>
        </BadgesGrid>
        <GridRow centered>
          <StyledNavIcon name="triangle left" size="large" />
          <StyledNavIcon name="triangle right" size="large" />
        </GridRow>
      </Grid>
    </Segment>
  );

  if (loading) {
    return (
      <Loader active inverted size="large">
        Loading
      </Loader>
    );
  }

  return (
    <>
      <Head>
        <title>{user.name}</title>
        <meta charSet="utf-8" name="description" content={user.name + "user profile."} />
        <link rel="canonical" href={"https://www.coderintuition.com/user/" + user.name} />
      </Head>
      <StyledGrid relaxed>
        <GridColumn textAlign="center" mobile={16} tablet={16} computer={4}>
          <MarginRow>{ProfileSection}</MarginRow>
          <MarginRow>{StatsSection}</MarginRow>
          <GridRow>{SocialMediaSection}</GridRow>
        </GridColumn>
        <GridColumn mobile={16} tablet={16} computer={8}>
          <GridRow>{ActivitySection}</GridRow>
        </GridColumn>
        <GridColumn mobile={16} tablet={16} computer={4}>
          <MarginRow>{LevelSection}</MarginRow>
          <GridRow>{BadgeSection}</GridRow>
        </GridColumn>
      </StyledGrid>
    </>
  );
};
