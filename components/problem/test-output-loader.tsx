import React, { FC } from "react";
import { Dimmer, Grid, GridRow, Header, Loader } from "semantic-ui-react";

interface TestOutputLoaderProps {
  text: string;
  dark: number;
}

const TestOutputLoader: FC<TestOutputLoaderProps> = (props) => {
  return (
    <Dimmer active inverted={!props.dark}>
      <Grid columns={2} style={{ marginTop: 20 }}>
        <GridRow>
          <Loader active />
        </GridRow>
        <GridRow>
          <Header size="small" color={props.dark ? "grey" : "black"} style={{ fontWeight: 500 }}>
            {props.text}
          </Header>
        </GridRow>
      </Grid>
    </Dimmer>
  );
};

export default TestOutputLoader;
