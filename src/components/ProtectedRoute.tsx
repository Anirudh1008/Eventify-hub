import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Spinner } from '@/components/ui/spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectToLogin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectToLogin = true 
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  // If redirectToLogin is false, we allow access to the page even if not logged in
  if (!user && redirectToLogin) {
    // We'll handle the redirect in the component itself rather than using Navigate
    // This allows us to keep the URL in the address bar
    window.location.href = "/login";
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
