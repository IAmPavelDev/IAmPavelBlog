import React, { useEffect, useState } from "react";
import AdminAuth from "./AdminAuth";
// import AdminPostForm from "./AdminPostForm";
import AdminEditPanel from "./AdminEditPanel/AdminEditPanel";
import store from "../../state/store";
import AdminCreateForm from "./AdminCreateForm/AdminCreateForm";

const AdminPanel = () => {
    const [isLogedIn, setIsLogedIn] = useState<Boolean>(false);
    useEffect(() => {
        store.loadPosts();
    });
    return isLogedIn ? (
        <>
            <AdminCreateForm />
            <AdminEditPanel />
        </>
    ) : (
        <AdminAuth loggedIn={() => setIsLogedIn(true)} />
    );
};

export default AdminPanel;
