import React from "react";
import Footer from "../../components/user/Footer";
import MenuList from "../../components/user/MenuList";
import MenuSection from "../../components/user/MenuSection";
import Navbar from "../../components/user/Navbar";

const MenuPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <MenuSection />
        <MenuList  categoryImage={[]} categoryId={""} />
      </main>
      <Footer />
    </div>
  );
};

export default MenuPage;