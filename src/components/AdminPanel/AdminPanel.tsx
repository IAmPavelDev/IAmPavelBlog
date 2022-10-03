import React, { useState } from "react";
import AdminAuth from "./AdminAuth";
import AdminPostForm from "./AdminPostForm";
import AdminEditPanel from "./AdminEditPanel";

const AdminPanel = () => {
    const [isLogedIn, setIsLogedIn] = useState<Boolean>(false);
    return isLogedIn ? (
        <>
            <AdminPostForm />
            <AdminEditPanel />
        </>
    ) : (
        <AdminAuth loggedIn={() => setIsLogedIn(true)} />
    );
};

export default AdminPanel;
