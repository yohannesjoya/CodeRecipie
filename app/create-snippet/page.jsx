"use client";

// import PreviewImage from "@assets/images/PreviewImage.png";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";
import Form from "@components/Form";
const CreatePost = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [postData, setPostData] = useState({
    snippet: "",
    tags: "",
    postImageUrl: "",
  });

  const createPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const form = e.target;

    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "image"
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "my-uploads");

    try {
      const data = await fetch(
        "https://api.cloudinary.com/v1_1/doew4ampi/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());

      const response = await fetch("/api/snippet/new", {
        method: "POST",
        body: JSON.stringify({
          snippet: postData.snippet,
          tags: postData.tags,
          userId: session?.user.id,
          postImageUrls: data.secure_url,
        }),
      });
      if (response.ok) {
        toast("🦄 Snippet Created!!", {
          type: "success",
          theme: "light",
          autoClose: "5000",
        });

        setTimeout(() => {
          router.push("/profile");
        }, 1500);
      }
    } catch (error) {
      toast("🦄 Failed to create!", {
        type: "error",
        position: "top-center",
        theme: "light",
        autoClose: "5000",
      });
    } finally {
      setSubmitting(() => false);
    }
  };

  return (
    <>
      <Form
        type="create"
        post={postData}
        setPostData={setPostData}
        submitting={submitting}
        handleSubmit={createPost}
      />
      <ToastContainer />
    </>
  );
};

export default CreatePost;
