
import PropTypes from "prop-types"; // Import PropTypes
import Header from "../Components/Home/Header";
import Footer from "../Components/Home/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;