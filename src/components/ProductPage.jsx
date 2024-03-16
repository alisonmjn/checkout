import React from 'react'
import { useState, useEffect } from 'react';

const ProductPage = () => {
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const colors = [
    '#796e72' //Classic gray
  ];

  const sizes = ['S', 'M', 'L', 'XL'];

  useEffect(() => {
    getProduct()
    getRelatedProducts();
  }, []);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const getProduct = async  () => {
    try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products/4')
        const responseData = await response.json()
        setProduct(responseData);
        setCategoryId(parseFloat(responseData.category.id))
    } catch (error) {
        console.error(error)
    }
  }

  const getRelatedProducts = async () => {
    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`)
        const responseData = await response.json()
        const firstFourProducts = responseData.slice(4, 8);
        setProducts(firstFourProducts);
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <div>
      <div className='m-5 p-5 border-1 border-solid border-slate-300'>
        {product && product.category &&(
            <>   
            <div className='flex justify-start mb-10'>
                {product.category.name} / <span className='font-bold ml-1'>{product.title}</span>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'>
                <div className='grid gap-5'>
                    <img className='rounded-lg shadow-md' src={product.images[0]} alt="silla" />
                    <div className='grid grid-cols-3 gap-5'>
                    {product.images.map((image, index) => (
                        <img key={index} className='rounded-lg shadow-md' src={image} alt="silla" />
                    ))}
                    </div>
                </div>
                <div className='text-left flex flex-col gap-4 mb-14'>
                    <h1 className='text-3xl font-semibold'>{product.title}</h1>
                    <h4 className='text-4xl font-bold italic'><span className='not-italic'> $</span>{product.price}</h4>
                    <h3 className='text-lg font-medium'>Color:</h3>
                    <div className='flex flex-wrap gap-2'>
                        {colors.map((color, index) => (
                            <button
                            key={index}
                            className={`w-8 h-8 rounded-full border border-gray-300 hover:shadow-xl ${
                                selectedColor === color ? 'border-2' : ''
                            }`}
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorChange(color)}
                            ></button>
                        ))}
                    </div>
                    <h3 className='text-lg font-medium'>Size:</h3>
                    <div className='flex flex-wrap gap-2'>
                        {sizes.map((size) => (
                            <button
                                key={size}
                                className={`w-12 h-12 border border-gray-300 rounded-full mr-2 mb-2 ${
                                selectedSize === size ? 'bg-orange-400 text-white' : ''
                                }`}
                                onClick={() => handleSizeChange(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                    <button className='w-full h-11 bg-orange-400 text-white rounded-lg'>
                        Add to Cart
                    </button>
                    <h3 className='text-lg font-medium'>Description:</h3>
                    <p className='font-light'>{product.description}</p>
                    <br />
                    <h3 className='text-lg font-medium'>Specifications::</h3>
                    <ul className='font-light'>
                        <li>Material: Soft cotton blend.</li>
                        <li>Color: Classic gray.</li>
                    </ul>
                </div>
              </div>
            </>
        )}
            <div className='mt-10 mb-10'>
                <h2 className='text-lg font-medium text-left mb-5'>
                    Related products::
                </h2>
                <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8'>
                {products.map((product) => (
                    <img key={product.id} className='rounded-lg shadow-md hover:shadow-xl' src={product.images[0]} alt={product.title}/>
                 ))}
                </div>
            </div>
        </div> 
    </div>
  )
}

export default ProductPage
