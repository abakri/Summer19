import React, { useState, useEffect } from "react";
import { Box, Button } from "grommet";
import Loading from "./Loading";
import PostInput from "./PostInput";

const EditPost = props => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setLoading] = useState(true); // if it is new, don't load, otherwise we need fetch edit
  const [save, setSave] = useState(false);
  const [del, setDelete] = useState(false);

  /* 
  To-Do:
  1. if it was a new post, do redux action, set cursor to end of whichever textarea was being typed in (seamless)
  2. show message on save, etc.
  3. auto-save
  */

  useEffect(() => {
    const loadPost = () => {
      fetch(`/api/posts/${props.match.params.id}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title);
          setBody(data.body);
          setLoading(false);
        });
    };

    // if this is a new post and the body or title has changed,
    // then upload it and move to edit
    if (isLoading && !del) loadPost();
  }, [isLoading, props.match.params, del]);

  // when save is clicked
  useEffect(() => {
    const savePost = () => {
      fetch(`/api/posts/update/${props.match.params.id}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          body: body
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log("post last saved at ", Date().toString());
        });
    };

    if (save) {
      savePost();
      setSave(false); // set save back to false
    }
  }, [save, title, body, props.match.params]);

  // when save is clicked
  useEffect(() => {
    const deletePost = () => {
      fetch(`/api/posts/${props.match.params.id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          props.history.push("/posts");
        });
    };

    if (del) {
      setLoading(true);
      deletePost();
    }
  }, [del, props.match.params, props.history]);

  if (isLoading) return <Loading />;
  else
    return (
      <Box
        animation="fadeIn"
        align="center"
        margin={{ horizontal: "xlarge", vertical: "small" }}
      >
        <PostInput
          title={title}
          body={body}
          setBody={e => setBody(e.target.value)}
          setTitle={e => setTitle(e.target.value)}
        />
        <Button label="save" onClick={e => setSave(true)} />
        <Button label="delete" onClick={e => setDelete(true)} />
      </Box>
    );
};

export default EditPost;
