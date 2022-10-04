import React, { useEffect, useState } from "react";
import AdminAuth from "./AdminAuth";
import AdminPostForm from "./AdminPostForm";
import AdminEditPanel from "./AdminEditPanel";
import store from "../../state/store";

const AdminPanel = () => {
    const [isLogedIn, setIsLogedIn] = useState<Boolean>(false);
    useEffect(() => {
        store.loadPosts();
    });
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
