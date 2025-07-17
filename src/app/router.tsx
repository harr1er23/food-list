import React, { lazy, Suspense, type JSX } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Loader } from "@mantine/core";
import { useAuthStore } from "../features/auth/store/auth";

const AuthPage = lazy(() => import('../pages/auth/AuthPage'));
const ProductsPage = lazy(() => import('../pages/products/ProductsPage'));
const RecipesPage = lazy(() => import('../pages/recipes/RecipesPage'));
const NotFound = lazy(() => import('../pages/notfound/NotFound'));

const PrivateRoute = ({children}: {children: JSX.Element}) => {
    const checkAuth = useAuthStore((state) => state.checkAuth);
    const [isTokenValid, setIsTokenValid] = React.useState<boolean | null>(null);

    React.useEffect(() => {
        const verifyToken = async () => {
            try {
                const isValid = await checkAuth();
                setIsTokenValid(isValid);
            } catch (err) {
                setIsTokenValid(false);
                console.error(err);
            }
          };
      
          verifyToken();
    }, [checkAuth])
    
    if (isTokenValid === null) {
        return <Loader size="xl" variant="dots" className="mx-auto mt-20" />;
    }
    
    return isTokenValid ? children : <Navigate to="/auth" replace />;
}

export const AppRouter= () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loader size="xl" variant="dots" className="mx-auto mt-20" />}>
                <Routes>
                    <Route path="/auth" element={<AuthPage />}></Route>

                    <Route path="/products" element={<PrivateRoute><ProductsPage /></PrivateRoute>}></Route>
                    <Route path="/recipes" element={<PrivateRoute><RecipesPage /></PrivateRoute>}></Route>
                    {/* <Route path="/planner"></Route> */}
                    {/* <Route path="/diary"></Route>e */}

                    <Route path="/notFound" element={<NotFound />}></Route>
                    <Route path="*" element={<Navigate to="/notFound" replace/>}></Route>
                    <Route path="/" element={<Navigate to="/products" replace/>}></Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}