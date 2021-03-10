import React, { FC, PropsWithChildren } from "react";
import { Dimmer, Grid, GridRow, Loader } from "semantic-ui-react";

const TestOutputLoader: FC<PropsWithChildren<any>> = (props) => {
  return (
    <Dimmer active inverted>
      <Grid columns={2}>
        <GridRow>
          <Loader />
        </GridRow>
        <GridRow>
          <div style={{ color: "black", fontSize: "18px", fontWeight: 500 }}>{props.text}</div>
        </GridRow>
      </Grid>
    </Dimmer>
  );
};

export default TestOutputLoader;
