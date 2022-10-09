import React, { useEffect } from "react";
import style from "./App.module.scss";
import Head from "./components/Head/Head";
import store from "./state/store";

function App() {
    useEffect(() => {
        store.loadPosts();
    });
    return (
        <div className={style.app__wrapper}>
            <Head />
        </div>
    );
}

export default App;
