
export default function LoginLoading() {
    return (
        <>
            {/* Breadcrumb Loading */}
            <div className="breadcrumb-block style-shared">
                <div className="breadcrumb-main bg-gray-200 animate-pulse h-[200px] w-full"></div>
            </div>

            {/* Login Form Loading */}
            <div className="login-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex gap-y-8 max-md:flex-col">
                        {/* Left Side - Login Form */}
                        <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
                            <div className="h-8 bg-gray-300 rounded w-16 animate-pulse"></div>

                            <div className="md:mt-7 mt-4">
                                {/* Username/Email Field */}
                                <div className="email">
                                    <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                                </div>

                                {/* Password Field */}
                                <div className="pass mt-5">
                                    <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between mt-5">
                                    <div className="flex items-center">
                                        <div className="w-5 h-5 bg-gray-300 rounded animate-pulse"></div>
                                        <div className="h-4 bg-gray-300 rounded w-24 ml-2 animate-pulse"></div>
                                    </div>
                                    <div className="h-4 bg-gray-300 rounded w-32 animate-pulse"></div>
                                </div>

                                {/* Login Button */}
                                <div className="block-button md:mt-7 mt-4">
                                    <div className="h-12 bg-gray-300 rounded-lg animate-pulse"></div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - New Customer */}
                        <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
                            <div className="text-content">
                                <div className="h-8 bg-gray-300 rounded w-32 animate-pulse"></div>
                                <div className="mt-2 space-y-2">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                                </div>
                                <div className="block-button md:mt-7 mt-4">
                                    <div className="h-12 bg-gray-300 rounded-lg w-24 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}