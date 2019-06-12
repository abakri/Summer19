import React from "react";
import { Box, Heading } from "grommet";

export const Loading = props => {
  return (
    // <div />
    <Box
      fill={true}
      direction="column"
      justify="center"
      align="center"
      animation="pulse"
    >
      <Heading level="1" color="brand">
        Loading...
      </Heading>
    </Box>
  );
};

export default Loading;
