import dynamic from "next/dynamic";

// Dynamically import the PasswordResetView component with SSR disabled
const PasswordResetView = dynamic(() => import("@/components/store/password-reset-view"), {
    ssr: false, // Disable server-side rendering
});

const Page = () => {
    return (
        <div className="container max-w-md mx-auto py-12 px-4">
            <PasswordResetView />
        </div>
    );
};

export default Page;