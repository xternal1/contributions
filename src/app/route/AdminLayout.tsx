import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/protected/Sidebar';
import Navbar from '../../components/protected/Navbar';
import Footer from '../../components/protected/Footer';

const MainLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 pt-16">
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
            onClick={closeSidebar}
          />
        )}
        <main className="flex-1 p-4 bg-gray-100 ml-0 md:ml-64">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
