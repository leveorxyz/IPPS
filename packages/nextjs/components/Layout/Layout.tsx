import Header from './Header';
import Footer from './Footer';

type PropTypes = {
  children: React.ReactNode;
};

const Layout = ({ children }: PropTypes) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
