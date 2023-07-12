import "@styles/global.css";
//! component imports
import Nav from "@components/Nav";
import Provider from "@components/Provider";

//! metadata declaration
export const metadata = {
  title: "Code-Recipe",
  description: "Discover & Share Code Snippets",
};

//! root component
const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <div className="app">
            <Nav />
            {children}
          </div>
      
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
