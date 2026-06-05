import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import { REQUIRED_APP_ROLE } from './constants/roles';
import { AppLayout } from './components/layout/AppLayout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { ProfilePage } from './pages/ProfilePage';
import { ProtectedAppPage } from './pages/ProtectedAppPage';
import { ForbiddenPage } from './pages/ForbiddenPage';

export function App(): JSX.Element {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.APP}
          element={
            <ProtectedRoute requiredRole={REQUIRED_APP_ROLE}>
              <ProtectedAppPage />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTES.FORBIDDEN} element={<ForbiddenPage />} />
        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Route>
    </Routes>
  );
}
