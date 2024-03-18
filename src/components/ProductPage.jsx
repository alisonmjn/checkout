import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CheckoutModal from './CheckoutModal';

const schema = yup.object({
  selectedSize: yup.string().required("Please select a size before adding to cart."),
});

const ProductPage = () => {
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sizes = ['S', 'M', 'L', 'XL'];

  useEffect(() => {
    getProduct();
  }, []);

  const { register, handleSubmit, formState: { errors }, trigger } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSizeChange = (size) => {
    setProduct((prevState) => ({ ...prevState, selectedSize: size }));
    trigger("selectedSize");
  };

  const getProduct = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const responseData = await response.json();
      const filteredProducts = responseData.filter(product =>
        product.category === "men's clothing" || product.category === "women's clothing"
      );
      const randomIndex = Math.floor(Math.random() * filteredProducts.length);
      const randomProduct = filteredProducts[randomIndex];
      setProduct(randomProduct);
      getRelatedProducts(randomProduct.category);
    } catch (error) {
      console.error(error);
    }
  };

  const getRelatedProducts = async (category) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      const responseData = await response.json();
      const firstFourProducts = responseData.slice(4, 8);
      setProducts(firstFourProducts);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (data) => {
    if (!Object.keys(errors).length) {
      openModal();
    }
  };

  return (
    <div>
      <div className='m-5 p-5 border-1 border-solid border-slate-300'>
        {product && product.category &&(
          <>   
            <div className='flex justify-start mb-10'>
              {product.category} / <span className='font-bold ml-1'>{product.title}</span>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'>
              <div className='grid gap-5'>
                <img className='rounded-lg shadow-md' src={product.image} alt="silla" />
              </div>
              <div className='text-left flex flex-col gap-4 mb-14'>
                <h1 className='text-3xl font-semibold'>{product.title}</h1>
                <h4 className='text-4xl font-bold italic'><span className='not-italic'> $</span>{product.price}</h4>
                <h3 className='text-lg font-medium'>Size:</h3>
                <div className='flex flex-wrap gap-2'>
                  {sizes.map((size) => (
                    <label key={size} className="inline-flex items-center">
                      <input
                        type="radio"
                        value={size}
                        {...register("selectedSize")}
                        onChange={() => handleSizeChange(size)}
                        className="h-6 w-6 border border-gray-300 rounded-full mr-2 mb-2"
                      />
                      <span className={`h-6 w-6 rounded-full mr-2 mb-2 flex items-center justify-center ${product.selectedSize === size ? 'bg-orange-400 text-white' : ''}`}>{size}</span>
                    </label>
                  ))}
                </div>
                <p className='text-red-500'>{errors.selectedSize?.message}</p>
                <input type="submit" onClick={handleSubmit(onSubmit)} className='w-full h-11 bg-orange-400 text-white rounded-lg' value="Add to Cart" />
                <CheckoutModal isOpen={isModalOpen} onClose={closeModal} />
                <h3 className='text-lg font-medium'>Description:</h3>
                <p className='font-light'>{product.description}</p>
                <br />
              </div>
            </div>
          </>
        )}
        {products.length > 0 && (
          <div className='mt-10 mb-10'>
            <h2 className='text-lg font-medium text-left mb-5'>
              Related products:
            </h2>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8'>
              {products.map((product) => (
                <img key={product.id} className='rounded-lg shadow-md hover:shadow-xl' src={product.image} alt={product.title}/>
              ))}
            </div>
          </div>
        )}
      </div> 
    </div>
  );
};

export default ProductPage;
