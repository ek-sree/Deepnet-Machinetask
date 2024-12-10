import { FC, useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { toast, Toaster } from "sonner";
import { useSelector } from "react-redux";
import { ICategory } from "../../interface/ICategory";
import { RootState } from "../../redux/store/store";
import { adminAxios } from "../../api/axios/adminAxios";
import { adminEndpoints } from "../../api/endpoints/adminEndpoints";

interface ErrorCategory {
  categoryName: string;
  categoryTitle:string;
}

interface CategoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (category: ICategory) => void;
}

const AddCategoryModal: FC<CategoryProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryTitle, setCategoryTitle] = useState<string>("");
  const [errors, setErrors] = useState<ErrorCategory>({
    categoryName: "",
    categoryTitle: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const token = useSelector((state: RootState) => state.Auth.token);
  const adminAxiosInstance = adminAxios(token);

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: ErrorCategory = {
      categoryName: "",
      categoryTitle: "",
    };

    const onlyAlphabets = /^[A-Za-z\s]+$/;

    if (!categoryName.trim()) {
      newErrors.categoryName = "Category name is required";
      isValid = false;
    } else if (!onlyAlphabets.test(categoryName)) {
      newErrors.categoryName = "Category name should contain only alphabets";
      isValid = false;
    }

    if (!categoryTitle.trim()) {
        newErrors.categoryTitle = "Category title is required";
        isValid = false;
      } else if (!onlyAlphabets.test(categoryName)) {
        newErrors.categoryTitle = "Category title should contain only alphabets";
        isValid = false;
      }

    if (images.length < 1) {
      toast.error("At least one image is required");
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      if (images.length + newImages.length > 2) {
        toast.error("You can upload a maximum of 2 images");
        return;
      }
      setImages([...images, ...newImages]);
    }
  };

  const handleImageDelete = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleSubmit = async () => {
    try {
        setLoading(true)
      if (validateForm()) {
        const formData = new FormData();
        formData.append("categoryName", categoryName);
        formData.append("categoryTitle", categoryTitle);
        images.forEach((image) => {
            formData.append('images', image);
          });

        const response = await adminAxiosInstance.post(
          adminEndpoints.addCategory,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
console.log("response cat",response);

        if (response.status == 201) {
          onSuccess(response.data.data);
          onClose();
        }
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || "Error occurred";
      toast.error(errorMessage);
      console.log("Error occurred while adding category", error);
    }finally{
        setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <Toaster position="top-center" richColors expand={false} />
      <div className="w-full max-w-2xl bg-gradient-to-br from-purple-500 to-indigo-600 p-8 rounded-lg shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">Add Product</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <CloseOutlinedIcon fontSize="large" />
          </button>
        </div>

        <div className="custom-scrollbar overflow-y-auto max-h-[65vh] pr-4">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white mb-1"
              >
                Category Name*
              </label>
              <input
                type="text"
                className="w-full p-3 bg-white bg-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
              {errors.categoryName && (
                <p className="mt-1 text-red-300 text-sm">
                  {errors.categoryName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-white mb-1"
              >
                Category Title*
              </label>
              <input
                type="text"
                className="w-full p-3 bg-white bg-opacity-20 rounded-md text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                placeholder="Enter category title"
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
              />
              {errors.categoryTitle && (
                <p className="mt-1 text-red-300 text-sm">
                  {errors.categoryTitle}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-1">
                Upload Images (Max 2)*
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-300
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100"
              />
              <div className="flex flex-wrap gap-4 mt-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-24 h-24 border border-white rounded-md overflow-hidden"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded ${index}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      onClick={() => handleImageDelete(index)}
                    >
                      <DeleteOutlineOutlinedIcon fontSize="small" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
  onClick={handleSubmit}
  disabled={loading}
  className={`mt-6 w-full p-3 rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-500 
    ${loading 
      ? 'bg-purple-300 text-purple-500 cursor-not-allowed' 
      : 'bg-white text-purple-700 hover:bg-gray-100'
    }`}
>
  {loading ? (
    <div className="flex items-center justify-center">
      <svg 
        className="animate-spin h-5 w-5 mr-3" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        ></circle>
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      Submitting...
    </div>
  ) : (
    'Submit Product'
  )}
</button>
      </div>
    </div>
  );
};

export default AddCategoryModal;
