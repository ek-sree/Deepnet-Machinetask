import Category from "../../components/admin/Category";
import SideNavAdmin from "../../components/admin/SideNavAdmin";

const CategoryPage = () => {
  return (
    <div className=" bg-gradient-to-r from-slate-700 to-slate-900 min-h-screen p-3 flex flex-col md:flex-row">
      <SideNavAdmin />
      
      <div className="flex-1 ml-2 mt-4 md:mt-0">
        <Category />
      </div>
    </div>
  );
};

export default CategoryPage;
