import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthed = useAuthStore((s) => s.isAuthed);
  return isAuthed ? <>{children}</> : <Navigate to="/login" replace />;
}
