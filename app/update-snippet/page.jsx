"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";
import { ToastContainer, toast } from "react-toastify";
const UpdatePost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [postData, setPostData] = useState({
    snippet: "",
    tags: "",
  });

  useEffect(() => {
    const getPostDetail = async () => {
      const response = await fetch(`/api/snippet/${id}`);
      const data = await response.json();
      setPostData({
        snippet: data.snippetData,
        tags: data.tags,
      });
    };

    if (id) getPostDetail();
  }, [id]);

  const updatePost = async (e) => {
    e.preventDefault();

    if (!id) alert("No Id");
    setSubmitting(true);

    // console.log("========================");
    // console.log(postData.snippet, postData.tags);
    try {
      const response = await fetch(`/api/snippet/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          snippet: postData.snippet,
          tags: postData.tags,
        }),
      });

      if (response.ok) {
        toast("🦄 Your Post is Updated!", {
          type: "success",
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          router.push("/profile");
        }, 1500);
      }
    } catch (error) {
      toast("🦄 Failed to Update!", {
        type: "error",
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setSubmitting(() => false);
    }
  };

  return (
    <>
      <Form
        type="Update"
        post={postData}
        setPostData={setPostData}
        submitting={submitting}
        handleSubmit={updatePost}
      />
      <ToastContainer />
    </>
  );
};

export default UpdatePost;
