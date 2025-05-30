import ProfilePage from '@/components/store/profile-page';

export const generateMetadata = async () => {
  return {
    title: 'Profile Page',
    description: 'View and manage your profile information.',
  };
};

const Page = () => {
  return (
    <ProfilePage />
  )
}

export default Page