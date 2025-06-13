import { fetchProfileData } from "@/actions/customer-action";
import { getCountries } from "@/actions/data-actions";
import ProfilePage from "@/components/dashboard/profile-page";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const generateMetadata = async () => {
  return {
    title: 'Profile Page',
    description: 'View and manage your profile information.',
  };
};

const Page = async () => {
  const storedUser = (await cookies()).get("user")?.value
  // const email = JSON.parse(storedUser!).user_email
  const userId = storedUser ? (JSON.parse(storedUser).user_id || 0) : 0;

  if (!userId) {
    redirect("/auth");
  }

  const [{ customer, orders, downloads }, countries] = await Promise.all([
    fetchProfileData(userId),
    getCountries()
  ]);

  return (
    <ProfilePage customer={customer} orders={orders} downloads={downloads} countries={countries} />
  )
}

export default Page