"use client";
import { ToastContainer } from "react-toastify";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { csharp } from "@replit/codemirror-lang-csharp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";

import tick from "../assets/icons/tick.svg";
import copy from "../assets/icons/copy.svg";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const Card = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setcopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setcopied(post.snippetData);
    navigator.clipboard.writeText(post.snippetData);
    setTimeout(() => {
      setcopied("");
    }, 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post?.creator?.image}
            alt="user image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post?.creator?.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post?.creator?.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied === post.snippetData ? tick : copy}
            width={12}
            height={12}
          />
        </div>
      </div>

      <CodeMirror
        value={post.snippetData}
        className="my-4 code-place"
        minHeight="200px"
        theme="dark"
        extensions={[javascript({ jsx: true })]}
        readOnly
      />

      <p className="font-inter text-sm blue_gradient cursor-pointer">
        {post.tags.split(" ").map((tag) => (
          <span
            className="mx-1"
            onClick={() => handleTagClick && handleTagClick(tag)}
          >
            {tag}
          </span>
        ))}
      </p>

      {session?.user.id === post?.creator?._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer px-3 py-1 flex justify-between items-center gap-2 crud"
            onClick={handleEdit}
          >
            <Image
              src="https://img.icons8.com/nolan/64/create-new.png"
              width={32}
              height={30}
              className="block"
            />

            <div className="">Edit</div>
          </p>
          <p
            className="font-inter text-sm px-3 py-1 orange_gradient cursor-pointer flex justify-between items-center gap-2 crud"
            onClick={handleDelete}
          >
            <Image
              src="https://img.icons8.com/plasticine/100/filled-trash.png"
              width={32}
              height={30}
              className="block"
            />
            <div>Delete</div>
          </p>
        </div>
      )}
    </div>
  );
};

export default Card;
