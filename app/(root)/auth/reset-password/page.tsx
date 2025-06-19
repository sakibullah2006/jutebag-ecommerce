import PasswordResetView from "@/components/store/password-reset-view";


type Props = {};

const Page = (props: Props) => {
    return (
        <div className="container max-w-md mx-auto py-12 px-4">
            <PasswordResetView />
        </div>
    )
};

export default Page;