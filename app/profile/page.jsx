"use client";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ProfileCard from "@components/Profile";
import { resolve } from "styled-jsx/css";

const Profile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);

      await new Promise((resolve) => setTimeout(resolve, 500));

      const data = await response.json();
      setMyPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-snippet?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const confirmation = confirm(`Are you sure ${post._id}`);
    if (!confirmation) return;

    try {
      const response = await fetch(`/api/snippet/${post._id.toString()}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast("🦄 Deleted!", {
          type: "success",
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        const newPostsList = myPosts.filter((p) => p._id != post._id);
        setMyPosts(newPostsList);
      }
    } catch (error) {
      toast("🦄 Failed to Deleted!", {
        type: "error",
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <ProfileCard
        name="My"
        desc="Welcome to your profile page. Share your exceptional coding skills and inspire others with the power of your imagination"
        data={myPosts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <ToastContainer />
    </>
  );
};

export default Profile;
