import { useEffect, useState } from "react";
import { userAxios } from "../../api/axios/userAxios";
import { userEndpoints } from "../../api/endpoints/userEndpoints";
import { IProduct } from "../../interface/IProduct";

interface MenuListProps {
  categoryId: string;
  categoryImage: string[];
}

const MenuList: React.FC<MenuListProps> = ({ categoryId, categoryImage = [] }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function fetchProduct() {
    try {
      setLoading(true);
      const response = await userAxios.get(
        `${userEndpoints.getProducts}?categoryId=${categoryId}`
      );
      if (response.status === 200) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-black text-white p-8 min-h-[50vh] flex items-center justify-center">
        <div className="text-2xl">No products found in this category</div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white py-16 pb-40"> 
      <div className="container mx-auto px-4">
        <div className="relative max-w-4xl mx-auto bg-black border border-white rounded-lg p-8">

          <div className="absolute -top-16 left-0">
            {categoryImage[0] && (
              <img
                src={categoryImage[0]}
                alt="Top Cocktail"
                className="w-28 h-40 object-fit"
              />
            )}
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-center mb-6 tracking-widest">
              BRUNCH COCKTAILS
            </h2>
          </div>

          {/* Product List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold flex-grow pr-4">{product.productName}</h3>
                  <div className="border-b border-dotted border-gray-600 flex-grow mx-2"></div>
                  <span className="text-lg font-semibold">${product.productPrice}</span>
                </div>

                <p className="text-sm text-gray-400">{product.productDescription}</p>
              </div>
            ))}
          </div>

          <div className="absolute -bottom-24 md:-bottom-24 right-8 md:right-8">
            {categoryImage[1] && (
              <img
                src={categoryImage[1]}
                alt="Bottom Cocktail"
                className="w-28 h-40 object-fit"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuList;
