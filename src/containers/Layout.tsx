import React, { useContext, Suspense, useEffect, lazy } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import routes, { InternalRoute } from "../routes";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Main from "./Main";
import ThemedSuspense from "../components/ThemedSuspense";
import { SidebarContext } from "../context/SidebarContext";

const Page404 = lazy(() => import("../pages/404"));

const Layout: React.FunctionComponent = () => {
    const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);
    let location = useLocation();

    useEffect(() => {
        closeSidebar();
    }, [location]);

    return (
        <div
            className={`flex h-screen bg-gray-50 dark:bg-gray-900 ${
                isSidebarOpen && "overflow-hidden"
            }`}
        >
            <Sidebar />

            <div className="flex flex-col flex-1 w-full">
                <Header />
                <Main>
                    <Suspense fallback={<ThemedSuspense />}>
                        <Switch>
                            {routes.map((route: InternalRoute, i: number) => {
                                return route.component ? (
                                    <Route
                                        key={i}
                                        exact={true}
                                        path={`/app${route.path}`}
                                        render={(props: any) => (
                                            <route.component {...props} />
                                        )}
                                    />
                                ) : null;
                            })}
                            <Redirect exact from="/app" to="/app/dashboard" />
                            <Route component={Page404} />
                        </Switch>
                    </Suspense>
                </Main>
            </div>
        </div>
    );
};

export default Layout;
