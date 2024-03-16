import React from 'react'
import { useState, useEffect } from 'react';

const CheckoutModal = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardType, setCardType] = useState('');
    const [nameCard, setNameCard] = useState('');

    useEffect(() => {
        const storedFormData = JSON.parse(localStorage.getItem('checkoutFormData'));
        if (storedFormData) {
            setName(storedFormData.name || '');
            setEmail(storedFormData.email || '');
            setTel(storedFormData.tel || '');
            setAddress(storedFormData.address || '');
            setCity(storedFormData.city || '');
            setState(storedFormData.state || '');
        }
    }, []);

    useEffect(() => {
        const formData = { name, email, tel, cardNumber };
        localStorage.setItem('checkoutFormData', JSON.stringify(formData));
    }, [name, email, tel, cardNumber]);

    const handleCardNumberChange = (e) => {
        const { value } = e.target;
        setCardNumber(value);
        detectCardType(value);
    };

    const detectCardType = (value) => {
        const visaRegex = /^4/;
        const mastercardRegex = /^5[1-5]/;
        const amexRegex = /^3[47]/;

        if (visaRegex.test(value)) {
          setCardType('visa');
        } else if (mastercardRegex.test(value)) {
          setCardType('mastercard');
        } else if (amexRegex.test(value)) {
          setCardType('amex');
        } else {
          setCardType('');
        }
    };

    return (
      <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? '' : 'hidden'}`}>
        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
        <div className="bg-white p-10 rounded-lg z-10">
            <form className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                <div className='flex flex-col gap-2'>
                    <h2 className="text-xl font-bold mb-4">Contact information</h2>
                    <label htmlFor="cardNumber">Name:</label>
                    <input
                        className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
                        type="text"
                        id="name"
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                        maxLength="16"
                        placeholder=" Enter your name"
                        required
                    />
                    <label htmlFor="expiry">Email:</label>
                    <input 
                        className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
                        type="email"
                        id="email"
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        placeholder="Enter your email"
                        maxLength="80"
                        required
                    />
                    <label htmlFor="cvv">Cellphone:</label>
                    <input
                        className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
                        type='number'
                        id="tel"
                        value={tel}
                        onChange={({ target }) => setTel(target.value)}
                        maxLength="12"
                        required
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <h2 className="text-xl font-bold mb-4">Shipping address</h2>
                    <label htmlFor="cardNumber">Address:</label>
                    <input
                        className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
                        type="text"
                        id="address"
                        value={address}
                        onChange={({ target }) => setAddress(target.value)}
                        maxLength="20"
                        placeholder=" Enter your address"
                        required
                    />
                    <label htmlFor="expiry">City:</label>
                    <input 
                        className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
                        type="text"
                        id="city"
                        value={city}
                        onChange={({ target }) => setCity(target.value)}
                        placeholder="Enter your city"
                        maxLength="80"
                        required
                    />
                    <label htmlFor="cvv">State:</label>
                    <input
                        className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
                        type='text'
                        id="state"
                        value={state}
                        onChange={({ target }) => setState(target.value)}
                        maxLength="12"
                        required
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <h2 className="text-xl font-bold mb-4">Payment Details</h2>
                    <label htmlFor="cardNumber">Card Number:</label>
                    <div className='flex flex-row'>
                        {cardType && (
                            <img
                                src={cardType === 'visa'
                                ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Visa_Electron.png/640px-Visa_Electron.png'
                                : cardType === 'mastercard'
                                ? 'https://www.mastercard.us/content/dam/mccom/global/logos/logo-mastercard-mobile.svg'
                                : cardType === 'amex'
                                ? 'https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg'
                                : ''
                                }
                                alt={cardType}
                                style={{ width: '50px', height: '30px' }}
                            />
                        )}
                        <input
                            className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
                            type="text"
                            id="cardNumber"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            maxLength="16"
                            placeholder="Enter your card number"
                            required
                        />
                    </div>
                    <label htmlFor="expiry">Expiry Date:</label>
                    <input 
                        type="text" 
                        id="expiry"
                        value={expiryDate}
                        onChange={({ target }) => setExpiryDate(target.value)}
                        placeholder="MM/YY" 
                        maxLength="5" 
                        required
                    />
                    <label htmlFor="cvv">CVV:</label>
                    <input 
                        className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
                        type="text" 
                        id="cvv" 
                        value={cvv}
                        onChange={({ target }) => setCvv(target.value)}
                        placeholder="123" 
                        maxLength="4" 
                        required
                    />
                    <label htmlFor="nameCard">Name on Card:</label>
                    <input 
                        className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
                        type="text"
                        value={nameCard}
                        onChange={({ target }) => setNameCard(target.value)}
                        id="nameCard" 
                        required
                    />
                </div>
            </form>
            <div className='mt-5 mb-2 flex flex-row justify-end gap-5'>
                <button onClick={onClose}>Close</button>
                <button className="bg-orange-400 text-white px-4 py-2 rounded-lg" type="submit">Pay Now</button>
            </div>
        </div>
      </div>
    );
  };

export default CheckoutModal
