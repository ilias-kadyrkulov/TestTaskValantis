import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { routes } from './nav.data'

export const Navigation = () => {
    return (
        <Router>
            <Routes>
                {routes.map((route, routeIndex) => (
                    <Route
                        key={routeIndex}
                        path={route.path}
                        element={route.element}
                    >
                        {route.children &&
                            route.children.map((child, childIndex) => (
                                <Route
                                    key={childIndex}
                                    path={child.path}
                                    element={child.element}
                                />
                            ))}
                    </Route>
                ))}
            </Routes>
        </Router>
    )
}
