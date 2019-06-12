import React from "react";
import { Box, TextArea, TextInput } from "grommet";

const PostInput = props => {
  return (
    <Box
      fill={true}
      height="100vh"
      gap="medium"
      border={{ color: "brand", size: "large" }}
    >
      <TextInput
        placeholder="Untitled"
        value={props.title}
        onChange={props.setTitle}
        plain={true}
      />
      <TextArea
        placeholder="enter markdown here"
        value={props.body}
        onChange={props.setBody}
        plain={true}
        resize={false}
      />
    </Box>
  );
};

export default PostInput;
