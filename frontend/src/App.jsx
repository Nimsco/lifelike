import React, { useState, useEffect } from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

const App = () => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        const handleLocationChange = () => {
            setCurrentPath(window.location.pathname);
        };

        window.addEventListener("popstate", handleLocationChange);
        return () =>
            window.removeEventListener("popstate", handleLocationChange);
    }, []);

    // Simple routing based on URL path
    if (currentPath === "/register") {
        return <Register />;
    }

    return <Login />;
};

export default App;
