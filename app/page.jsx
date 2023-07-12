import { Feed } from "@components/Feed";
import mainView from "@assets/images/main_intro2.png";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";

const Home = () => (
  <section
    className="w-full flex-center flex-col mt-[-5px]"
    // style={{ border: "4px solid green" }}
  >
    <h1 className="head_text text-center mt-[-26px]">
      Discover and share
      <br className="max-md:hidden" />
      <span className="orange_gradient text-center"> Code Snippets</span>
    </h1>
    <Image src={mainView} width={175} height={175} className="mt-6" />

    <p className="desc text-center mb-[-20px]">
      Code-Recipe is open-source Platform for Developers to share, discover,
      create code snippets
    </p>

    {/* <div style={{ border: "4px solid yellow", width:"100% !important" }}> */}
    <Feed />
    {/* </div> */}

    <ToastContainer />
  </section>
);

export default Home;
