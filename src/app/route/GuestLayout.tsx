import { Outlet } from "react-router-dom";
import Navbar from '../../components/protected/guest/Navbar';
import Footer from '../../components/protected/guest/Footer';
import ScrollToTopButton from '../../components/public/ScrollToTopButton';

const GuestLayout = () => {

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className='pt-18'>
        <ScrollToTopButton />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default GuestLayout;