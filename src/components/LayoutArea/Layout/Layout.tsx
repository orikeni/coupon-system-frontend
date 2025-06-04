import type { JSX } from "react";
import Routing from "../../Routing/Routing";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import './Layout.css';


function Layout(): JSX.Element {
  return (
    <div className="layout">
      <Header />
      <div className="layout-body">
        <Menu />
        <main className="layout-main">
          <Routing />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;