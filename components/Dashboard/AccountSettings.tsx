'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Customer } from '@/types/customer-type'
import { useAuth } from '@/context/AuthContext'
import { updateCustomerPersonalInfo } from '@/actions/customer-action'
import { userResetPassword } from '@/actions/auth-actions'
import { personalInfoSchema, type PersonalInfoFormValues } from '@/lib/validation'

interface AccountSettingsProps {
    customer: Customer
    customerId: number
    onCustomerUpdate?: (updatedCustomer: Customer) => void
}

const AccountSettings = ({ customer, customerId, onCustomerUpdate }: AccountSettingsProps) => {
    const { logout } = useAuth()
    const [isEditingProfile, setIsEditingProfile] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [showResetModal, setShowResetModal] = useState(false)
    const [customerData, setCustomerData] = useState<Customer>(customer)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm<PersonalInfoFormValues>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            first_name: customerData.first_name,
            last_name: customerData.last_name || '',
            email: customerData.email
        }
    })

    const formData = watch()

    const onSubmit = async (data: PersonalInfoFormValues) => {
        setIsLoading(true)
        try {
            const result = await updateCustomerPersonalInfo(customerId, data)

            if (result.success) {
                setIsEditingProfile(false)

                // Update local customer data
                const updatedCustomer = {
                    ...customerData,
                    first_name: result.data.first_name,
                    last_name: result.data.last_name || '',
                    email: result.data.email
                }

                setCustomerData(updatedCustomer)

                // Call parent update callback if provided
                if (onCustomerUpdate) {
                    onCustomerUpdate(updatedCustomer)
                }

                // Reset form with new data
                reset({
                    first_name: result.data.first_name,
                    last_name: result.data.last_name || '',
                    email: result.data.email
                })
                alert('Profile updated successfully!')
            } else {
                alert(result.message || 'Failed to update profile')
            }
        } catch (error) {
            console.error('Error saving profile:', error)
            alert('An error occurred while saving the profile')
        } finally {
            setIsLoading(false)
        }
    }

    const handleCancel = () => {
        setIsEditingProfile(false)
        reset({
            first_name: customerData.first_name,
            last_name: customerData.last_name || '',
            email: customerData.email
        })
    }

    const handleResetPassword = async () => {
        setIsLoading(true)
        try {
            const result = await userResetPassword(customerData.email)

            if (result.success) {
                setShowResetModal(false)
                alert('Password reset email has been sent to your email address.')
            } else {
                alert(result.message || 'Failed to send reset email')
            }
        } catch (error) {
            console.error('Error sending reset email:', error)
            alert('An error occurred while sending the reset email')
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogout = async () => {
        try {
            await logout()
            // The redirect will be handled by the AuthContext
        } catch (error) {
            console.error('Error during logout:', error)
        }
    }

    return (
        <div className="account-settings-block">
            <div className="heading5">Account Settings</div>
            <div className="mt-7 space-y-8">

                {/* Personal Information */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                        {!isEditingProfile && (
                            <button
                                onClick={() => setIsEditingProfile(true)}
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            >
                                Edit
                            </button>
                        )}
                    </div>

                    {isEditingProfile ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                                    Username
                                </label>
                                <input
                                    disabled={true}
                                    type="text"
                                    value={customerData.username}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                                />
                                <p className="mt-1 text-xs text-gray-500">Username cannot be changed</p>
                            </div>

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
                                    value={customerData.billing.phone || customerData.shipping.phone || ''}
                                    disabled
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                                />
                                <p className="mt-1 text-xs text-gray-500">Phone number is managed in address settings</p>
                            </div>

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
                                    onClick={handleCancel}
                                    disabled={isLoading}
                                    className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Name:</span>
                                <span className="text-sm font-medium text-gray-900">
                                    {customerData.first_name} {customerData.last_name}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Username:</span>
                                <span className="text-sm font-medium text-gray-900">{customerData.username}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Email:</span>
                                <span className="text-sm font-medium text-gray-900">{customerData.email}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Phone:</span>
                                <span className="text-sm font-medium text-gray-900">
                                    {customerData.billing.phone || customerData.shipping.phone || 'Not provided'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Member since:</span>
                                <span className="text-sm font-medium text-gray-900">
                                    {new Date(customerData.date_created).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Password Reset */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Password</h3>
                        <button
                            onClick={() => setShowResetModal(true)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                            Reset Password
                        </button>
                    </div>

                    <p className="text-sm text-gray-600">
                        To change your password, we&apos;ll send you a reset link to your email address.
                    </p>
                </div>

                {/* Account Actions */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Account Actions</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-gray-900">Sign out of your account</p>
                                <p className="text-sm text-gray-600">Sign out from all devices and sessions</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors font-medium"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {/* Password Reset Confirmation Modal */}
            {showResetModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-900">Reset Password</h3>
                            <button
                                onClick={() => setShowResetModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                                disabled={isLoading}
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="mb-6">
                            <p className="text-sm text-gray-600 mb-4">
                                A password reset link will be sent to:
                            </p>
                            <p className="text-sm font-medium text-gray-900 bg-gray-50 p-3 rounded-md">
                                {customerData.email}
                            </p>
                        </div>

                        <div className="flex space-x-3">
                            <button
                                onClick={handleResetPassword}
                                disabled={isLoading}
                                className="flex-1 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                            >
                                {isLoading ? 'Sending...' : 'Send Reset Link'}
                            </button>
                            <button
                                onClick={() => setShowResetModal(false)}
                                disabled={isLoading}
                                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AccountSettings
