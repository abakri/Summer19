import React, { useState, useEffect } from "react";
import { Box, Button, TextInput, TextArea } from "grommet";

const NewPost = props => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [save, setSave] = useState(false);

  useEffect(() => {
    const uploadPost = () => {
      fetch("/api/posts/submit", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          body
        })
      })
        .then(res => res.json())
        .then(data => {
          props.history.push(`/edit/${data._id}`);
        });
    };

    // if this is a new post and the body or title has changed,
    // then upload it and move to edit
    if (body !== "" || title !== "" || save) uploadPost();
  }, [title, body, props.history, save]);

  return (
    <Box
      animation="fadeIn"
      align="center"
      margin={{ horizontal: "xlarge", vertical: "small" }}
    >
      <TextInput
        placeholder="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <TextArea
        placeholder="enter markdown here!"
        value={body}
        onChange={e => setBody(e.target.value)}
      />
      <Button label="save" onClick={e => setSave(true)} />
    </Box>
  );
};

export default NewPost;
