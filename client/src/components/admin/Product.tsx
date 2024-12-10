import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { adminAxios } from '../../api/axios/adminAxios';
import { RootState } from '../../redux/store/store';
import { IProduct } from '../../interface/IProduct';
import { adminEndpoints } from '../../api/endpoints/adminEndpoints';
import { toast, Toaster } from 'sonner';
import AddProductModal from './AddProductModal';

const Product = () => {
    const [IsModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [products, setProducts] = useState<IProduct[]>([])

    const token = useSelector((state: RootState) => state.Auth.token);
    const adminAxiosInstance = adminAxios(token);

    async function fetchProduct(){
        try {
            const response = await adminAxiosInstance.get(adminEndpoints.getProducts);
            if(response.status==200){
                setProducts(response.data.data)
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error : any) {
            const errorMessage = error?.response?.data?.data?.message;
            toast.error(errorMessage)
            console.log("Error fetching products", error);
        }
    }


    const handleSuccess = (product: IProduct) => {
        setProducts(prev => [...prev, product])
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <div className="bg-gradient-to-b from-black to-slate-900 rounded-lg min-h-[710px] w-full p-4">
            <Toaster position="top-center" expand={false} richColors />
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                    Products
                </h1>
                
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-fuchsia-600 py-2 px-4 rounded-lg text-white font-medium w-full sm:w-auto"
                >
                    Add Product
                </button>
            </div>

            <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden shadow-md rounded-lg">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-white">Name</th>
                                    <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-white">Price</th>
                                    <th scope="col" className="px-4 py-3 text-left text-sm font-semibold text-white">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700 bg-gray-700">
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td className="px-4 py-3 text-sm text-slate-300 whitespace-nowrap">
                                            {product.productName}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-slate-300 whitespace-nowrap">
                                            {product.productPrice}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-slate-300">
                                            {product.productDescription}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-slate-300">
                                            {product.isStatus ? 'Active' : 'Blocked'}
                                        </td>
                                       
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {IsModalOpen && (
                <AddProductModal
                    isOpen={IsModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={handleSuccess}
                />
            )}
        </div>
    );
};

export default Product