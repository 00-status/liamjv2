import { useRouteError } from "react-router-dom";

export function ErrorBoundary() {
    let error = useRouteError();
    console.log(error);
    // Uncaught ReferenceError: path is not defined
    return <div>Dang!</div>;
  }
