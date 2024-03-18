import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

const CheckoutSummary = () => {
  const location = useLocation();
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [total, setTotal] = useState(0);

  const { product, paymentData } = location.state;

  useEffect(() => {
    calculateTotal()
  }, [])
  

  function simulateCallApi() {
    return new Promise((resolve, reject) => {
      const responseTime = Math.floor(Math.random() * 3000) + 1000;
      setTimeout(() => {
        // 80% success, 20% error
        const success = Math.random() < 0.8;

        if (success) {
          resolve('Compra exitosa!');
        } else {
          reject('Error en la compra. Inténtalo de nuevo.');
        }
      }, responseTime);
    });
  }

  const confirmPurchase = () => {
    if (isProcessing) return;

    setIsProcessing(true);

    simulateCallApi()
      .then((mensajeExito) => {
        setMessage(mensajeExito);
        toast.success(`${mensajeExito}`);
      })
      .catch((error) => {
        setMessage(error);
        toast.error(`${error}`);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(product.price);
    const shippingCost = 10.15;
    const total = subtotal + shippingCost;
    setTotal(total.toFixed(2));
  };

  return (
    <div className='m-5 p-5 rounded border border-slate-300 text-left'>
      {isProcessing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="text-orange-400">
            <BounceLoader color="#FFA500" loading={isProcessing} size={150} />
          </div>
        </div>
      )}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
        <div>
          <h2 className='text-lg font-medium text-left mb-2'>
            Contact information:
          </h2>
          <label htmlFor="email">Email:</label>
          <input 
              className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
              type="email"
              id="email"
              value={paymentData.email}
              readonly="readonly" 
          />
          <h2 className='text-lg font-medium text-left mt-6 mb-2'>
            Payment details:
          </h2>
          <label htmlFor="nameCard">Name on Card:</label>
          <input 
            className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
            type="text"
            value={paymentData.nameCard}
            readonly="readonly" 
          />
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
            type="text"
            id="cardNumber"
            value={paymentData.cardNumber}
            readonly="readonly" 
          />
          <h2 className='text-lg font-medium text-left mt-6 mb-2'>
            Shipping address:
          </h2>
          <label htmlFor="address">Address:</label>
          <input
            className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
            type="text"
            id="address"
            value={paymentData.address}
            readonly="readonly" 
          />
          <div className='grid grid-cols-2 gap-3'>
            <div>
              <label htmlFor="city">City:</label>
              <input 
                  className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
                  type="text"
                  id="city"
                  value={paymentData.city}
                  readonly="readonly" 
              />
            </div>
            <div>
              <label htmlFor="state">State:</label>
              <input
                  className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
                  type='text'
                  id="state"
                  value={paymentData.state}
                  readonly="readonly" 
              />
            </div>
          </div>
        </div>
        <div className='bg-slate-200 shadow-md rounded text-left p-5'>
          <h1 className='text-xl font-bold mb-3'>Order summary</h1>
            <div className='rounded bg-white flex gap-3 items-center mb-10'>
              <img className='rounded' src={product.image} alt={product.title} width={64} height={64}/>
              <div>
                <p>{product.title}</p>
                <p>${product.price}</p>
              </div>
            </div>
            <hr></hr>
            <div>
              <div className='flex justify-between'>
                <p>Subtotal</p>
                <p>${product.price}</p>
              </div>
              <div className='flex justify-between'>
                <p>Shipping</p>
                <p>$10,15</p>
              </div>
              <div className='flex justify-between'>
                <p>Total</p>
                <p>${total}</p>
              </div>
            </div>
            <button className="bg-orange-400 w-full text-white px-4 py-2 rounded-lg self-end" type="submit" onClick={confirmPurchase}>CONFIRM PURCHASE</button>
            <ToastContainer />
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
