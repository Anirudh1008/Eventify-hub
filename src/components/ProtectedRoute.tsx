
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Spinner } from '@/components/ui/spinner';
import { supabase } from '@/integrations/supabase/client';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectToLogin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectToLogin = true 
}) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Log Supabase authentication state to verify integration
    console.log('ProtectedRoute - Supabase auth state:', { user, loading });
    
    if (!loading && !user && redirectToLogin) {
      navigate('/login', { replace: true });
    }
  }, [user, loading, redirectToLogin, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user && redirectToLogin) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
