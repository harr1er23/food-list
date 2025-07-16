import React, { lazy, Suspense, type JSX } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Loader } from "@mantine/core";

const AuthPage = lazy(() => import('../pages/auth/AuthPage'));
const DatabasePage = lazy(() => import('../pages/database/DatabasePage'));
const RecipesPage = lazy(() => import('../pages/recipes/RecipesPage'));
const NotFound = lazy(() => import('../pages/notfound/NotFound'));

const PrivateRoute = ({children}: {children: JSX.Element}) => {
    const [isTokenValid, setIsTokenValid] = React.useState<boolean | null>(true);
    
    return isTokenValid ? children : <Navigate to="/auth" replace />;
}

export const AppRouter= () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loader size="xl" variant="dots" className="mx-auto mt-20" />}>
                <Routes>
                    <Route path="/auth" element={<AuthPage />}></Route>

                    <Route path="/database" element={<PrivateRoute><DatabasePage /></PrivateRoute>}></Route>
                    <Route path="/recipes" element={<PrivateRoute><RecipesPage /></PrivateRoute>}></Route>
                    {/* <Route path="/planner"></Route> */}
                    {/* <Route path="/diary"></Route>e */}

                    <Route path="/notFound" element={<NotFound />}></Route>
                    <Route path="*" element={<Navigate to="/notFound" replace/>}></Route>
                    <Route path="/" element={<Navigate to="/database" replace/>}></Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}