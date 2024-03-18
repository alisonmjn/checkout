import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { BounceLoader } from 'react-spinners';

const CheckoutModal = ({ isOpen, onClose, product }) => {
    const [cardType, setCardType] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [redirectToCheckoutSummary, setRedirectToCheckoutSummary] = useState(false);
    const [paymentData, setPaymentData] = useState(null);

    const schema = yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        tel: yup.string().required('Phone number is required'),
        address: yup.string().required('Address is required'),
        city: yup.string().required('City is required'),
        state: yup.string().required('State is required'),
        cardNumber: yup.string().required('Card number is required'),
        expiryDate: yup.string().required('Expiry date is required'),
        cvv: yup.string().required('CVV is required'),
        nameCard: yup.string().required('Name on card is required'),
    });

    const { setValue } = useForm();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        const storedFormData = JSON.parse(localStorage.getItem('checkoutFormData'));
        if (storedFormData) {
            Object.keys(storedFormData).forEach(key => {
                setValue(key, storedFormData[key]);
            });
        }
    }, [setValue]);

    const onSubmit = async (data) => {
        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 5000));
        localStorage.setItem('checkoutFormData', JSON.stringify(data));
        console.log(data);

        setLoading(false);
        setPaymentData(data);
        setRedirectToCheckoutSummary(true);

    };

    useEffect(() => {
        if (redirectToCheckoutSummary) {
            navigate("/checkout-summary", { state: { product: product, paymentData: paymentData } });
        }
    }, [redirectToCheckoutSummary]);

    const handleCardNumberChange = (e) => {
        const { value } = e.target;
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
            <div className="bg-white p-10 rounded-lg z-10 overflow-y-auto max-h-screen">
                {loading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="text-orange-400">
                            <BounceLoader color="#FFA500" loading={loading} size={150} />
                        </div>
                    </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8'>
                        <div className='flex flex-col gap-2'>
                            <h2 className="text-xl font-bold mb-4">Contact information</h2>
                            <label htmlFor="name">Name:</label>
                            <input
                                {...register('name')}
                                type="text"
                                className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
                                placeholder="Enter your name"
                            />
                            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                            <label htmlFor="email">Email:</label>
                            <input 
                                {...register('email')}
                                type="email"
                                className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
                                placeholder="Enter your email"
                            />
                            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                            <label htmlFor="tel">Cellphone:</label>
                            <input
                                {...register('tel')}
                                type='number'
                                className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
                            />
                            {errors.tel && <span className="text-red-500">{errors.tel.message}</span>}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h2 className="text-xl font-bold mb-4">Shipping address</h2>
                            <label htmlFor="address">Address:</label>
                            <input
                                {...register('address')}
                                type="text"
                                className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
                                placeholder="Enter your address"
                            />
                            {errors.address && <span className="text-red-500">{errors.address.message}</span>}
                            <label htmlFor="city">City:</label>
                            <input
                                {...register('city')}
                                className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
                                type="text"
                                placeholder="Enter your city"
                            />
                            {errors.city && <span className="text-red-500">{errors.city.message}</span>}
                            <label htmlFor="state">State:</label>
                            <input
                                {...register('state')}
                                className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
                                type='text'
                                placeholder="Enter your state"
                            />
                            {errors.state && <span className="text-red-500">{errors.state.message}</span>}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
                            <label htmlFor="cardNumber">Card Number:</label>
                            <div className='flex flex-row items-center gap-1'>
                                <div style={{ maxWidth: '40px', maxHeight: '20px' }}>
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
                                            style={{ width: '100%', height: 'auto' }} // Ancho 100% para que se ajuste al contenedor
                                        />
                                    )}
                                </div>
                                <input
                                    {...register('cardNumber')}
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
                                    type="text"
                                    placeholder="Enter your card number"
                                    onChange={handleCardNumberChange} 
                                />
                            </div>

                            {errors.cardNumber && <span className="text-red-500">{errors.cardNumber.message}</span>}
                            <label htmlFor="expiry">Expiry Date:</label>
                            <input 
                                {...register('expiryDate')}
                                type="text" 
                                placeholder="MM/YY" 
                            />
                            <label htmlFor="cvv">CVV:</label>
                            <input
                                {...register('cvv')}
                                className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
                                type="text" 
                                placeholder="123" 
                            />
                            {errors.cvv && <span className="text-red-500">{errors.cvv.message}</span>}
                            <label htmlFor="nameCard">Name on Card:</label>
                            <input 
                                {...register('nameCard')}
                                className='"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
                                type="text"
                                placeholder='Enter name card'
                            />
                            {errors.nameCard && <span className="text-red-500">{errors.nameCard.message}</span>}
                        </div>
                    </div>
                    <div className='mt-5 mb-2 flex flex-row justify-end gap-5'>
                        <button onClick={onClose}>Close</button>
                        <button className="bg-orange-400 text-white px-4 py-2 rounded-lg" type="submit">Pay Now</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutModal;
