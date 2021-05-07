import { NextRouter, withRouter } from "next/router";
import React, { Component } from "react";
import { Button, Card, CardGroup, Grid, GridRow, Header, Icon, List, ListItem } from "semantic-ui-react";
import { Heading } from "../home/features-styles";
import { HighlightedText } from "../landing-styles";

interface LinksProps {
  router: NextRouter;
}

class Links extends Component<LinksProps> {
  constructor(props) {
    super(props);

    this.state = {
      unsubscribing: false,
      unsubscribed: false,
    };
  }

  render() {
    return (
      <Grid style={{ margin: 20 }} centered>
        <GridRow centered>
          <h2 className={Heading} style={{color: "#243e63"}}>
            CoderIntuition <span className={HighlightedText}>Links</span>
          </h2>
        </GridRow>
        <GridRow>
          <CardGroup centered>
            <Card raised fluid style={{ maxWidth: 350 }}>
              <div style={{ margin: 20 }}>
                <Header size="medium" style={{ marginBottom: 10, fontWeight: 500 }}>
                  Sign Up For CoderIntuition
                </Header>
                <List>
                  <ListItem>
                    ✔️ Learn algorithmic <b>intuition</b>
                  </ListItem>
                  <ListItem>✔️ Receive daily coding problems</ListItem>
                </List>
              </div>
              <Button primary icon onClick={() => this.props.router.push("/signup")}>
                Sign Up for a Free Account&nbsp;
                <Icon name="user" />
              </Button>
            </Card>
            <br />
            <Card raised fluid style={{ maxWidth: 350 }}>
              <div style={{ margin: 20 }}>
                <Header size="medium" style={{ marginBottom: 10, fontWeight: 500 }}>
                  Join Our Discord Server
                </Header>
                <List>
                  <ListItem>✔️ Meet other software engineers</ListItem>
                  <ListItem>✔️ Ask for help with coding</ListItem>
                  <ListItem>
                    ✔️ Internship <b>job postings bot</b>
                  </ListItem>
                </List>
              </div>
              <Button
                icon
                style={{ backgroundColor: "#7289da", color: "white" }}
                onClick={() => (window.location.href = "https://discord.gg/nJA3jYcz9E")}
              >
                Join Our Discord Server&nbsp;
                <Icon name="discord" />
              </Button>
            </Card>
            <br />
            <Card raised fluid style={{ maxWidth: 350 }}>
              <div style={{ margin: 20 }}>
                <Header size="medium" style={{ marginBottom: 10, fontWeight: 500 }}>
                  Subscribe to Our YouTube
                </Header>
                <List>
                  <ListItem>
                    ✔️ Watch problem <b>explanations</b>
                  </ListItem>
                  <ListItem>✔️ Watch coding tutorials</ListItem>
                </List>
              </div>
              <Button
                icon
                style={{ backgroundColor: "red", color: "white" }}
                onClick={() =>
                  (window.location.href = "https://www.youtube.com/channel/UCIvCYsN3c2bI4Z2xH_9hUVQ?sub_confirmation=1")
                }
              >
                Subscribe to Our YouTube&nbsp;
                <Icon name="youtube" />
              </Button>
            </Card>
            <br />
            <Card raised fluid style={{ maxWidth: 350 }}>
              <div style={{ margin: 20 }}>
                <Header size="medium" style={{ marginBottom: 10, fontWeight: 500 }}>
                  Follow Our TikTok
                </Header>
                <List>
                  <ListItem>
                    ✔️ Learn coding <b>concepts</b>
                  </ListItem>
                  <ListItem>✔️ Get career tips</ListItem>
                </List>
              </div>
              <Button
                icon
                style={{ backgroundColor: "black", color: "white" }}
                onClick={() => (window.location.href = "https://www.tiktok.com/@coderintuition")}
              >
                Follow Our TikTok&nbsp;
                <Icon name="music" />
              </Button>
            </Card>
          </CardGroup>
        </GridRow>
      </Grid>
    );
  }
}

export default withRouter(Links);
