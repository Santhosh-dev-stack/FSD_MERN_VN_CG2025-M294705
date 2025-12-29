import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-6">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
