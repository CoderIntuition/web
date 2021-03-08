import React, { FC, PropsWithChildren } from "react";
import { Dimmer, Grid, GridRow, Loader } from "semantic-ui-react";
import dynamic from "next/dynamic";

const AnimatedEllipsis = dynamic(
  async () => {
    return await import("react-animated-ellipsis");
  },
  {
    loading: () => <></>,
    ssr: false,
  }
);

const TestOutputLoader: FC<PropsWithChildren<any>> = (props) => {
  return (
    <Dimmer active inverted>
      <Grid columns={2}>
        <GridRow>
          <Loader />
        </GridRow>
        <GridRow>
          <div style={{ color: "black", fontSize: "18px", fontWeight: 500 }}>
            {props.text}
            <div style={{ marginLeft: "4px" }}>
              <AnimatedEllipsis />
            </div>
          </div>
        </GridRow>
      </Grid>
    </Dimmer>
  );
};

export default TestOutputLoader;
