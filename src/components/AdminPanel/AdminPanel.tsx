import React, { useState } from "react";
import AdminAuth from "./AdminAuth";
import AdminPostForm from "./AdminPostForm";
const AdminPanel = () => {
    const [isLogedIn, setIsLogedIn] = useState<Boolean>(false);
    return isLogedIn ? <AdminPostForm /> : <AdminAuth loggedIn={() => setIsLogedIn(true)} />;
};

export default AdminPanel;
