import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventsDetailPage";
import NewEventPage from "./pages/NewEventPage";
import EditEventPage from "./pages/EditEventPage";
import EventsLayout from "./layouts/EventsLayout";
import loaders, { deferredEventsPageLoader } from "./utils/Loaders";
import ErrorPage from "./pages/ErrorPage";
import Actions from "./utils/Actions";
import NewsletterPage from "./pages/NewsletterPage";
import AuthenticationPage from "./pages/AuthenticationPage";

const router = createBrowserRouter([
  {
    path: "",
    id: "root",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: loaders.tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: deferredEventsPageLoader,
          },
          {
            id: "event-detail",
            path: ":eventId",
            loader: loaders.eventDetailPageLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: Actions.deleteEvent,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                loader: loaders.checkAuthLoader,
                action: Actions.createOrUpdateEvent,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            loader: loaders.checkAuthLoader,
            action: Actions.createOrUpdateEvent,
          },
        ],
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: Actions.loginOrSignup,
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: Actions.signUpNewsletter,
      },
      {
        path: "logout",
        action: Actions.logout,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
