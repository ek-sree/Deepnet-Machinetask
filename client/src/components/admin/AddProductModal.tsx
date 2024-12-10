import { FC, useEffect, useState } from "react";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { toast, Toaster } from "sonner";
import CircularProgress from '@mui/material/CircularProgress';
import { IProduct } from "../../interface/IProduct";
import { IErrorStates } from "../../interface/IErrorStates";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { adminAxios } from "../../api/axios/adminAxios";
import { adminEndpoints } from "../../api/endpoints/adminEndpoints";


interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess:(Product:IProduct)=>void;
}

const AddProductModal: FC<AddProductModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState<number | string>("");
  const [productDescription, setProductDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(""); 
  const [categories, setCategories] = useState<{ _id: string; categoryName: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<IErrorStates>({
    productName: "",
    productPrice: "",
    productDescription: "",
    category:'',
  });

  const token = useSelector((store: RootState) => store.Auth.token);
  const adminAxiosInstance = adminAxios(token);

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: IErrorStates = {
      productName: "",
      productPrice: "",
      productDescription: "",
      category:"",
    };

    if (!productName.trim()) {
      newErrors.productName = "Product name is required";
      isValid = false;
    }

    if (!productPrice) {
      newErrors.productPrice = "Product price is required";
      isValid = false;
    }else if(Number(productPrice)<0){
      newErrors.productPrice="Price cant be negative";
      isValid=false
    }


    if (!productDescription.trim()) {
      newErrors.productDescription = "Product description is required";
      isValid = false;
    }

    if (!selectedCategory) { 
      newErrors.category = "Category is required";
      isValid = false;
    }


    setErrors(newErrors);
    return isValid;
  };



  async function fetchCategory(){
    try {
      const response = await adminAxiosInstance.get(adminEndpoints.getCategory);
            console.log(response);
            if(response.status==200){
              setCategories(response.data.data)
            }
    } catch (error) {
      console.log("Error while fetching category",error);
      
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      if (validateForm()) {
        const formData = new FormData();

        formData.append('productName', productName);
        formData.append('productPrice', productPrice.toString());
        formData.append('productDescription', productDescription);
        formData.append('category', selectedCategory);

        const response = await adminAxiosInstance.post(adminEndpoints.addProducts, formData);
        console.log(response);
        
        if (response.status === 201) {
          onSuccess(response.data.data)
          toast.success("Product added successfully!");
          onClose();
        }
      }
    } catch (error) {
      console.log("Error occurred while uploading product", error);
      toast.error("Can't add product now, something happened!");
    }finally{
      setLoading(false)
    }
  };

  // const handleProductShortsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   if (value.length <= maxShortLength) {
  //     setProductShorts(value);
  //   }
  // };

  useEffect(()=>{
    fetchCategory()
  },[isOpen])


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <Toaster expand={false} position="top-center" richColors />
      <div className="w-full max-w-2xl bg-gradient-to-br from-purple-500 to-indigo-600 p-8 rounded-lg shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Add Product</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
            <CloseOutlinedIcon fontSize="large" />
          </button>
        </div>

        <div className="custom-scrollbar overflow-y-auto max-h-[65vh] pr-4">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-1">Product Name*</label>
              <input
                type="text"
                className="w-full p-3 bg-white bg-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              {errors.productName && <p className="mt-1 text-red-300 text-sm">{errors.productName}</p>}
            </div>


            <div>
              <label htmlFor="category" className="block text-sm font-medium text-white mb-1">Category</label>
              <select
                className="w-full p-3 bg-gradient-to-br from-purple-500 to-indigo-600 bg-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="" className="bg-slate-800 text-white">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id} className="bg-slate-600 text-white">
                    {category.categoryName}
                  </option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-red-300 text-sm">{errors.category}</p>}
            </div>


            <div>
              <label htmlFor="price" className="block text-sm font-medium text-white mb-1">Product Price*</label>
              <input
                type="number"
                className="w-full p-3 bg-white bg-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
              {errors.productPrice && <p className="mt-1 text-red-300 text-sm">{errors.productPrice}</p>}
            </div>


            <div>
              <label htmlFor="description" className="block text-sm font-medium text-white mb-1">Product Description*</label>
              <textarea
                className="w-full p-3 bg-white bg-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Detailed description"
                rows={4}
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
              {errors.productDescription && <p className="mt-1 text-red-300 text-sm">{errors.productDescription}</p>}
            </div>

            
            <div className="flex justify-end mt-6">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-white bg-opacity-20 text-white rounded-md hover:bg-opacity-30 transition-colors flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} className="text-white" /> 
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
