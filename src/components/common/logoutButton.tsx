// await fetch('/api/session/logout', { method: 'POST' });
// router.push('/login');
'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Clear cookie via API
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      sessionStorage.removeItem('userSession');

      // Redirect to login page
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button
      className="govuk-button govuk-!-margin-0 govuk-button--warning"
      type="button"
      onClick={handleLogout} 
    >
      Logout
    </button>
  );
}
