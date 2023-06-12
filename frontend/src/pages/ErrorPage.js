import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";
import MainNavigation from "../components/MainNavigation";

export default function ErrorPage() {
  const error = useRouteError();
  let title = "An error occurred.";
  let message = "Something went wrong.";

  if (error.data) {
    if (error.error) {
      title = "Bad Request";
      message = error.error.message;
    } else if (error.status === 404) {
      title = "Not Found";
      message = error.data.message;
    }
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}
