import React, { useState, useEffect } from "react";
import { Box, Button, TextInput, TextArea } from "grommet";
import Loading from "./Loading";

const NewPost = props => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [postId, setPostId] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [save, setSave] = useState(false);
  const isNew = props.location.pathname === "/newpost" ? true : false;

  /* 
  > If we are in /newpost then
  > check local storage to see if a post is currently being worked on (user might have refreshed the page)
  > If not, then upload a new post
  > If yes, set the postId, and load that post
  > before unmount, clear the local storage

  > If we are in /editpost then
  > set the postId and load the content of the post into the title/body

  For Future: auto-save
  */

  // initial upload happens only once, this allows use to make new or edit existing post
  // this effect gets the postId
  useEffect(() => {
    const uploadPost = () => {
      fetch("/api/posts/submit", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: "Untitled Post",
          body: "Enter markdown data here!"
        })
      })
        .then(res => res.json())
        .then(data => {
          setPostId(data._id);
          setLoading(false);
          localStorage.setItem("postId", data._id);
        });
    };

    if (isNew) {
      if (!localStorage.getItem("postId")) uploadPost();
      else {
        console.log("found local storage");
        setPostId(localStorage.getItem("postId"));
        setLoading(false);
      }
    } else {
      setPostId(props.match.params.id);
      setLoading(false);
    }

    // remove local storage before unmount
    return () => {
      localStorage.removeItem("postId");
    };
  }, [isNew, props.match.params.id]);

  // now once we get access to postId, we can fetch the actual post
  // if we just created a post, it obtains the empty post (optimize if needed)
  useEffect(() => {
    const loadPost = () => {
      fetch(`/api/posts/${postId}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title);
          setBody(data.body);
        });
    };

    if (!isLoading && postId !== null) {
      console.log("postloaded", isLoading, postId);
      loadPost();
    }
  }, [postId, isLoading]);

  useEffect(() => {
    const savePost = () => {
      fetch(`/api/posts/update/${postId}`, {
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
          console.log(data);
        });
    };

    if (save) {
      savePost();
      setSave(false);
    }
  }, [save, title, body, postId]);

  if (isLoading) return <Loading />;
  else
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
        <Button label="publish" />
      </Box>
    );
};

export default NewPost;
