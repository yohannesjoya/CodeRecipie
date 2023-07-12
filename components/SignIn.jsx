"use client"
import googleLogo from "@assets/images/google-logo.png";
import githubLogo from "@assets/images/github-logo.png";
import logo from "@assets/my_logo.png";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const SignDialogue = ({ providers }) => {
  return (
    <div className="fixed p-0 m-0 top-0 left-0 z-50 w-full h-screen  bg-black bg-opacity-90">
      <div className="absolute w-full h-full flex items-center justify-center">
        <div className="bg-white p-8 rounded-md">
          <div className="mb-7 flex gap-1 flex-center flex-col">
            <Image
              src={logo}
              alt="logo"
              width={60}
              height={60}
              className="object-contain"
            />
            <p className="mid_head_text blue_gradient ">Code-Recipe</p>
          </div>

          <div className="ml-3 mr-3 md:ml-6 md:mr-6 mt-3 mb-3  flex justify-center flex-col gap-4 items-center">
            {providers &&
              Object.values(providers).map((provider) => (
                <div
                  key={provider.name}
                  className="white_btn flex justify-center gap-3"
                >
                  <Image
                    className="block"
                    width={30}
                    height={30}
                    src={provider.name === "Google" ? googleLogo : githubLogo}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className="block"
                  >
                    Sign in {provider.name}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignDialogue;
