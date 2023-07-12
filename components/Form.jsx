"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { csharp } from "@replit/codemirror-lang-csharp";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import previewimage from "@assets/images/PreviewImage.png";
const Form = ({ type, post, setPostData, submitting, handleSubmit }) => {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  const handlePreviewChange = (event) => {
    const files = event.target.files;

    if (files.length <= 3) {
      const selectedFilesArray = Array.from(files);

      const imageArray = selectedFilesArray.map((file) => {
        return URL.createObjectURL(file);
      });

      setPostData({ ...post, postImageUrl: imageArray });
    }
  };

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      // setImageSrc(onLoadEvent.target.result);
      setPostData({ ...post, postImageUrl: onLoadEvent.target.result });
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  return (
    <section className="mt-[-20px]  w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type}</span> Post
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share your code snippets and ideas
      </p>

      {/* <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
        <p>
          <input type="file" name="file" />
        </p>
      </form> */}

      <form
        // onSubmit={handleSubmit}
        onSubmit={handleSubmit}
        className="mt-8 w-full flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-normal text-base text-gray-700 text-sm">
            Your Snippet
          </span>

          <CodeMirror
            value={post.snippet}
            className="mt-3"
            minHeight="200px"
            width="100%"
            theme="dark"
            extensions={[
              javascript({ jsx: true }),
              python({}),
              csharp({}),
              java({}),
            ]}
            onChange={(value, viewUpdate) => {
              setPostData({ ...post, snippet: value });
            }}
          />
        </label>
        <label>
          <span className="font-satoshi font-normal text-base text-gray-700 text-sm">
            Tags
            <span className="text-fs-13 font-normal text-blue-500">
              ( #html, #react, #.net )
            </span>
          </span>
          <input
            value={post.tags}
            onChange={(e) => {
              setPostData({ ...post, tags: e.target.value });
            }}
            placeholder="#tags here..."
            required
            className="form_input"
            style={{ resize: "none" }}
          />
        </label>

        <label
          for="image"
          className="font-satoshi font-normal text-base text-gray-700 text-sm"
        >
          Screenshots
        </label>

        <p className="font-satoshi font-normal text-base text-center text-sm text-red-700">
          select again to change your choice
        </p>

        <div className="border">
          {/* <input
            name="image"
            type="file"
            accept="image/*"
            multiple
            className="w-full absolute h-56 border opacity-0 cursor-pointer"
            onChange={handlePreviewChange}
          />
           */}

          <input
            name="image"
            type="file"
            accept="image/*"
            className="w-full absolute h-56 border opacity-0 cursor-pointer"
            onChange={handleOnChange}
          />

          <div className="w-full flex flex-wrap justify-center items-center">
            {post?.postImageUrl?.length === 0 ? (
              <Image
                className="m-4"
                src={previewimage}
                width={200}
                height={200}
                alt="failed"
              />
            ) : (
              <img src={post?.postImageUrl} className="w-full md:w-3/4" />
            )}
          </div>
        </div>

        {/* {post?.postImageUrl?.length > 0 && (
          <div className="border w-full flex flex-wrap justify-center items-center">
            {post.postImageUrl.map((imageurl, idx) => {
              return (
                <Image
                  className="m-4"
                  src={imageurl}
                  width={300}
                  height={300}
                  alt="failed"
                />
              );
            })}
          </div>
        )} */}

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            cancel
          </Link>

          <button
            type="submit"
            className="px-6 pt-1 pb-1.5 font-semibold text-md bg-[#ff7300] rounded-4 text-white"
            disabled={submitting}
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
