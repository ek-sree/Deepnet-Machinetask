import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { adminAxios } from "../../api/axios/adminAxios";
import { useSelector } from "react-redux";
import { ICategory } from "../../interface/ICategory";
import { RootState } from "../../redux/store/store";
import { adminEndpoints } from "../../api/endpoints/adminEndpoints";
import AddCategoryModal from "./AddCategoryModal";

const Category = () => {

    const [IsModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [category, setCategory] = useState<ICategory[]>([]);

    const token = useSelector((state: RootState) => state.Auth.token);
    const adminAxiosInstance = adminAxios(token);

    async function fetchCategory(){
        try {
            const response = await adminAxiosInstance.get(adminEndpoints.getCategory);
            console.log(response);
            if(response.status==200){
                setCategory(response.data.data)
            }
            
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error : any) {
            const errorMessage = error?.response?.data?.data?.message;
            toast.error(errorMessage)
           console.log("Error fetching category",error);
        }
    }


    const handleSuccess=(category: ICategory)=>{
        setCategory(prev=> [...prev, category])
        toast.success("Category created")
    }


    useEffect(()=>{
        fetchCategory()
    },[])

  
      return (
        <div className="bg-gradient-to-b from-black to-slate-900 rounded-lg min-h-[710px] w-full p-4">
          <Toaster position="top-center" expand={false} richColors />
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              Category
            </h1>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-fuchsia-600 py-2 px-4 rounded-lg text-white font-medium w-full sm:w-auto"
            >
              Add Category
            </button>
          </div>
    
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead className="bg-gray-800">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-white">Name</th>
                      <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-white">Title</th>
                      <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-white">Image</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700 bg-gray-700">
                    {category.map((categ) => (
                      <tr key={categ._id}>
                        <td className="px-4 py-3 text-sm text-slate-300 whitespace-nowrap">
                          {categ.categoryName}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-300 whitespace-nowrap">
                          {categ.categoryTitle}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-300">
                          <img
                            src={categ.categoryImage[0]}
                            alt={`${categ.categoryName} Image`}
                            className="h-12 w-12 rounded-md object-cover"
                          />
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-300">
                          {categ.isStatus ? 'Active' : 'Blocked'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
    
          {IsModalOpen && (
            <AddCategoryModal
              isOpen={IsModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSuccess={handleSuccess}
            />
          )}
        </div>
      );
    };
export default Category