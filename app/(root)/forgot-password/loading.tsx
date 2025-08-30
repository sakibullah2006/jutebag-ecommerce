export default function Loading() {
    return (
        <>
            {/* Breadcrumb Loading */}
            <div id="header" className='relative w-full'>
                <div className="breadcrumb-block style-img">
                    <div className="breadcrumb-main bg-linear overflow-hidden">
                        <div className="container lg:pt-[134px] pt-24 pb-10 relative">
                            <div className="main-content w-full h-full flex flex-col items-center justify-center relative z-[1]">
                                <div className="text-content">
                                    <div className="heading2 text-white text-center animate-pulse">
                                        <div className="h-8 bg-white/20 rounded w-48 mx-auto"></div>
                                    </div>
                                    <div className="link flex items-center justify-center gap-1 caption1 text-white relative z-[1] mt-3">
                                        <div className="h-4 bg-white/20 rounded w-12 animate-pulse"></div>
                                        <div className="text-white">
                                            <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="h-4 bg-white/20 rounded w-32 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Forgot Password Form Loading */}
            <div className="forgot-password-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex gap-y-8 max-md:flex-col">
                        <div className="left md:w-1/2 w-full lg:pr-[60px] md:pr-[40px] md:border-r border-line">
                            <div className="heading4 animate-pulse">
                                <div className="h-7 bg-gray-300 rounded w-48 mb-2"></div>
                            </div>
                            <div className="mt-2 text-secondary animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            </div>
                            <div className="form-forgot-pass md:mt-7 mt-4">
                                <form className="md:mt-7 mt-4">
                                    <div className="email ">
                                        <div className="h-4 bg-gray-300 rounded w-16 mb-2 animate-pulse"></div>
                                        <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                                    </div>
                                    <div className="block-button md:mt-7 mt-4">
                                        <div className="h-12 bg-gray-300 rounded-full animate-pulse"></div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="right md:w-1/2 w-full lg:pl-[60px] md:pl-[40px] flex items-center">
                            <div className="text-content">
                                <div className="heading4 animate-pulse">
                                    <div className="h-7 bg-gray-300 rounded w-40 mb-2"></div>
                                </div>
                                <div className="mt-2 text-secondary animate-pulse">
                                    <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-1"></div>
                                    <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                                </div>
                                <div className="block-button md:mt-7 mt-4">
                                    <div className="h-12 bg-gray-300 rounded-full animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
