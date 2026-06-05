import { useAuth } from '../auth/useAuth';
import { UserProfileCard } from '../components/profile/UserProfileCard';
import { LoadingState } from '../components/feedback/LoadingState';

export function ProfilePage(): JSX.Element {
  const { user } = useAuth();

  if (!user) {
    return <LoadingState />;
  }

  return <UserProfileCard user={user} />;
}
