import PasswordResetView from "@/components/store/password-reset-view";
import { SearchParams } from "next/dist/server/request/search-params";
import { Suspense } from "react";



const Page = async ({ searchParams }: {
    searchParams: Promise<{
        email: string
    }>
}) => {
    const email = (await searchParams).email || "";

    return (
        <Suspense fallback={<>Loading</>}>
            <PasswordResetView userEmail={email} />
        </Suspense>
    )
};

export default Page;