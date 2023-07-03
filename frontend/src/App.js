// Challenge / Exercise

import { useEffect } from "react";
import { useLoaderData, useSubmit } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import helpers from "./utils/Helpers";

function App() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    let duration = helpers.getTokenDuration();
    if (duration <= 0) {
      submit(null, { action: "/logout", method: "POST" });
    }

    setTimeout(() => {
      console.log(
        "%c setting timeout.",
        "background-color: rgba(255, 0, 0, 0.6);color:red"
      );
      submit(null, { action: "/logout", method: "POST" });
    }, duration);
  }, [token, submit]);

  return (
    <>
      <MainLayout />
    </>
  );
}

export default App;
