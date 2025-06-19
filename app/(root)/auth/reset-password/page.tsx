import PasswordResetView from "@/components/store/password-reset-view";
import { Suspense } from "react";



const Page = () => {
    return (
        <Suspense fallback={<>Loading</>}>
            <PasswordResetView />
        </Suspense>
    )
};

export default Page;