import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function PageTitle() {
    const location = useLocation();

    useEffect(() => {
        const titles = {
            "/": "Home | TodoDin",
            "/about": "About | TodoDin",
            "/contact": "Contact | TodoDin",
            "/login": "Login | TodoDin",
            "/register": "Register | TodoDin",
            "/dashboard": "Dashboard | TodoDin",
            "/todo-list": "Todo List | TodoDin",
            "/todo-list-detail": "Todo List Detail | TodoDin",
            "/setting": "Setting | TodoDin",
            "/plans": "Plans | TodoDin",
            "/premium": "Premium | TodoDin",
        };

        document.title = titles[location.pathname] || "TodoDin";
    }, [location]);

    return null;
};

export default PageTitle;