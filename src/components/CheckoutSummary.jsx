import React from 'react'

const CheckoutSummary = () => {
  return (
    <div className='m-5 p-5 rounded border border-slate-300 text-left'>
      <div className='grid grid-cols-2 gap-5'>
        <div>
          <h2 className='text-lg font-medium text-left mb-2'>
            Contact information:
          </h2>
          <label htmlFor="expiry">Email:</label>
          <input 
              className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
              type="email"
              id="email"
              //value={email}
              //onChange={({ target }) => setEmail(target.value)}
              placeholder="Enter your email"
              maxLength="80"
              required
          />
          <h2 className='text-lg font-medium text-left mt-6 mb-2'>
            Payment details:
          </h2>
          <label htmlFor="expiry">Name on Card:</label>
          <input 
            className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
            type="text"
            //value={nameCard}
            //onChange={({ target }) => setNameCard(target.value)}
            id="nameCard" 
            required
          />
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
            type="text"
            id="cardNumber"
            //value={cardNumber}
            //onChange={handleCardNumberChange}
            maxLength="16"
            placeholder="Enter your card number"
            required
          />
          <h2 className='text-lg font-medium text-left mt-6 mb-2'>
            Shipping address:
          </h2>
          <label htmlFor="cardNumber">Address:</label>
          <input
            className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
            type="text"
            id="address"
            //value={address}
            //onChange={({ target }) => setAddress(target.value)}
            maxLength="20"
            placeholder=" Enter your address"
            required
          />
          <div className='grid grid-cols-2 gap-3'>
            <div>
              <label htmlFor="expiry">City:</label>
              <input 
                  className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
                  type="text"
                  id="city"
                  //value={city}
                  //onChange={({ target }) => setCity(target.value)}
                  placeholder="Enter your city"
                  maxLength="80"
                  required
              />
            </div>
            <div>
              <label htmlFor="cvv">State:</label>
              <input
                  className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
                  type='text'
                  id="state"
                  //value={state}
                  //onChange={({ target }) => setState(target.value)}
                  maxLength="12"
                  required
              />
            </div>
          </div>
          <div className='flex gap-2 mt-10'>
            <input type='checkbox' />
            <p>Same as shipping information</p>
          </div>
        </div>
        <div className='bg-slate-200 shadow-md rounded text-left p-5'>
          <h1 className='text-xl font-bold mb-3'>Order summary</h1>
          <div className='rounded bg-white flex gap-3 items-center mb-10'>
            <img className='rounded' src="" alt="" width={64} height={64}/>
            <div>
              <p>Nombre del producto</p>
              <p>$1234</p>
            </div>
          </div>
          <hr></hr>
          <div>
            <div className='flex justify-between'>
              <p>Subtotal</p>
              <p>Subtotal</p>
            </div>
            <div className='flex justify-between'>
              <p>Shipping</p>
              <p>Shipping</p>
            </div>
            <div className='flex justify-between'>
              <p>Total</p>
              <p>12345</p>
            </div>
          </div>
          <button className="bg-orange-400 w-full text-white px-4 py-2 rounded-lg self-end" type="submit">CONFIRM PURCHASE</button>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
