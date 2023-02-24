import React, { useEffect } from "react";
import { withProviders } from "./providers";

import { Routing } from "pages";

const App = () => {
  // useEffect(() => {
  //   return () => localStorage.removeItem("sessionAuth");
  // })

  return <div className="app">{<Routing />}</div>;
};

export default withProviders(App);
