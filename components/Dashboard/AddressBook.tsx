'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Customer } from '@/types/customer-type'
import { updateCustomerAddress } from '@/actions/customer-action'
import { addressSchema, type AddressFormValues } from '@/lib/validation'

interface AddressBookProps {
    customer: Customer
    customerId: number
    onCustomerUpdate?: (updatedCustomer: Customer) => void
}

const AddressBook = ({ customer, customerId, onCustomerUpdate }: AddressBookProps) => {
    const [editingAddress, setEditingAddress] = useState<'billing' | 'shipping' | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [customerData, setCustomerData] = useState<Customer>(customer)

    const billingForm = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            first_name: customerData.billing.first_name,
            last_name: customerData.billing.last_name,
            address_1: customerData.billing.address_1,
            address_2: customerData.billing.address_2 || '',
            city: customerData.billing.city,
            state: customerData.billing.state,
            postcode: customerData.billing.postcode,
            country: customerData.billing.country,
            email: customerData.billing.email,
            phone: customerData.billing.phone
        }
    })

    const shippingForm = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            first_name: customerData.shipping.first_name,
            last_name: customerData.shipping.last_name,
            address_1: customerData.shipping.address_1,
            address_2: customerData.shipping.address_2 || '',
            city: customerData.shipping.city,
            state: customerData.shipping.state,
            postcode: customerData.shipping.postcode,
            country: customerData.shipping.country
        }
    })

    const getCurrentForm = (addressType: 'billing' | 'shipping') => {
        return addressType === 'billing' ? billingForm : shippingForm
    }

    const handleEditClick = (addressType: 'billing' | 'shipping') => {
        setEditingAddress(addressType)
        // Reset form with current customer data
        const form = getCurrentForm(addressType)
        const addressData = addressType === 'billing' ? customerData.billing : customerData.shipping

        form.reset({
            first_name: addressData.first_name,
            last_name: addressData.last_name,
            address_1: addressData.address_1,
            address_2: addressData.address_2 || '',
            city: addressData.city,
            state: addressData.state,
            postcode: addressData.postcode,
            country: addressData.country,
            ...(addressType === 'billing' && {
                email: customerData.billing.email,
                phone: customerData.billing.phone
            })
        })
    }

    const onSubmit = async (addressType: 'billing' | 'shipping') => {
        const form = getCurrentForm(addressType)

        const submitHandler = async (data: AddressFormValues) => {
            setIsLoading(true)
            try {
                const result = await updateCustomerAddress(customerId, addressType, data)

                if (result.success) {
                    setEditingAddress(null)

                    // Update local customer data
                    const updatedCustomer = {
                        ...customerData,
                        [addressType]: {
                            ...data
                        }
                    }

                    setCustomerData(updatedCustomer)

                    // Call parent update callback if provided
                    if (onCustomerUpdate) {
                        onCustomerUpdate(updatedCustomer)
                    }

                    alert('Address updated successfully!')
                } else {
                    alert(result.message || 'Failed to update address')
                }
            } catch (error) {
                console.error(`Error saving ${addressType} address:`, error)
                alert('An error occurred while saving the address')
            } finally {
                setIsLoading(false)
            }
        }

        return form.handleSubmit(submitHandler)()
    }

    const handleCancel = (addressType: 'billing' | 'shipping') => {
        setEditingAddress(null)
        const form = getCurrentForm(addressType)
        const addressData = addressType === 'billing' ? customerData.billing : customerData.shipping

        form.reset({
            first_name: addressData.first_name,
            last_name: addressData.last_name,
            address_1: addressData.address_1,
            address_2: addressData.address_2 || '',
            city: addressData.city,
            state: addressData.state,
            postcode: addressData.postcode,
            country: addressData.country,
            ...(addressType === 'billing' && {
                email: customerData.billing.email,
                phone: customerData.billing.phone
            })
        })
    }

    const renderAddressForm = (addressType: 'billing' | 'shipping') => {
        const form = getCurrentForm(addressType)
        const { register, formState: { errors } } = form
        const address = addressType === 'billing' ? customerData.billing : customerData.shipping
        const isEditing = editingAddress === addressType

        return (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                        {addressType === 'billing' ? 'Billing Address' : 'Shipping Address'}
                    </h3>
                    {!isEditing && (
                        <button
                            onClick={() => handleEditClick(addressType)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                            Edit
                        </button>
                    )}
                </div>

                {isEditing ? (
                    <form onSubmit={(e) => { e.preventDefault(); onSubmit(addressType); }} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    {...register('first_name')}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.first_name ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                />
                                {errors.first_name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.first_name.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    {...register('last_name')}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.last_name ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                />
                                {errors.last_name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.last_name.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address Line 1
                            </label>
                            <input
                                type="text"
                                {...register('address_1')}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.address_1 ? 'border-red-300' : 'border-gray-300'
                                    }`}
                            />
                            {errors.address_1 && (
                                <p className="mt-1 text-sm text-red-600">{errors.address_1.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Address Line 2 (Optional)
                            </label>
                            <input
                                type="text"
                                {...register('address_2')}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.address_2 ? 'border-red-300' : 'border-gray-300'
                                    }`}
                            />
                            {errors.address_2 && (
                                <p className="mt-1 text-sm text-red-600">{errors.address_2.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    City
                                </label>
                                <input
                                    type="text"
                                    {...register('city')}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.city ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                />
                                {errors.city && (
                                    <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    State
                                </label>
                                <input
                                    type="text"
                                    {...register('state')}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.state ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                />
                                {errors.state && (
                                    <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Postal Code
                                </label>
                                <input
                                    type="text"
                                    {...register('postcode')}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.postcode ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                />
                                {errors.postcode && (
                                    <p className="mt-1 text-sm text-red-600">{errors.postcode.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Country
                            </label>
                            <input
                                type="text"
                                {...register('country')}
                                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.country ? 'border-red-300' : 'border-gray-300'
                                    }`}
                            />
                            {errors.country && (
                                <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
                            )}
                        </div>

                        {addressType === 'billing' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        {...register('email')}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-300' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        {...register('phone')}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors.phone ? 'border-red-300' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                                    )}
                                </div>
                            </>
                        )}

                        <div className="flex space-x-3 pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                            >
                                {isLoading ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                type="button"
                                onClick={() => handleCancel(addressType)}
                                disabled={isLoading}
                                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="text-sm text-gray-600 space-y-1">
                        <p className="font-medium text-gray-900">
                            {address.first_name} {address.last_name}
                        </p>
                        <p>{address.address_1}</p>
                        {address.address_2 && <p>{address.address_2}</p>}
                        <p>{address.city}, {address.state} {address.postcode}</p>
                        <p>{address.country}</p>
                        {addressType === 'billing' && (
                            <>
                                <p className="pt-2">{address.email}</p>
                                <p>{address.phone}</p>
                            </>
                        )}
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="address-book-block">
            <div className="heading5">Address Book</div>
            <div className="mt-7">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {renderAddressForm('billing')}
                    {renderAddressForm('shipping')}
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full">
                                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-blue-800">
                                Address Information
                            </h3>
                            <div className="mt-1 text-sm text-blue-700">
                                <p>These addresses will be used for billing and shipping purposes. Make sure they are accurate and up to date.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressBook
