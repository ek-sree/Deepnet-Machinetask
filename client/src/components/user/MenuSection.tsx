import { useEffect, useState } from 'react';
import menuBackground from '../../../public/menuBackground.jpg'
import { userAxios } from '../../api/axios/userAxios';
import { userEndpoints } from '../../api/endpoints/userEndpoints';
import { ICategory } from '../../interface/ICategory';
import MenuList from './MenuList';


const MenuSection = () => {

  const [data, setData] = useState<ICategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);

  async function fetchCategories(){
    try {
      const response = await userAxios.get(userEndpoints.getCategories)
      if(response.status==200){
        setData(response.data.data);
        if(response.data.data.length > 0){
          setSelectedCategory(response.data.data[0]);
        }
      }
    } catch (error) {
      console.log("Error occured while fetching categoried",error);
      
    }
  }


  const handleCategoryClick = (category: ICategory) => {
    setSelectedCategory(category); 
  };

  useEffect(()=>{
    fetchCategories()
  },[])

    return (
        <section 
          className="bg-cover bg-center h-[400px]" 
          style={{ backgroundImage: `url(${menuBackground})` }}
        >
          <div className="h-full flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-4xl font-bold mb-4">MENU</h1>
            <p className="max-w-xl text-sm">
              Please take a look at our menu featuring food, drinks, and brunch. If you'd like to place an order, use the
              "Order Online" button located below the menu.
            </p>
            <div className="flex space-x-4 mt-6">
            {data.map((cat)=>(  
              <> 
              <button key={cat._id} onClick={() => handleCategoryClick(cat)}    className={`px-6 py-2 transition text-white rounded-md ${selectedCategory?._id === cat._id ? 'bg-blue-500' : 'bg-gray-800 hover:bg-blue-500'}`}>{cat.categoryName}</button>
            </>))}</div> 
          </div>
          {selectedCategory && (
        <MenuList categoryId={selectedCategory._id} categoryImage={selectedCategory.categoryImage} />
      )}
        </section>
    );
};

export default MenuSection;
