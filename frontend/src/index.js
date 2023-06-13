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
import loaders, { deferredEventsPageLoader } from "./utils/loaders";
import ErrorPage from "./pages/ErrorPage";
import Actions from "./utils/actions";
import NewsletterPage from "./pages/NewsletterPage";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <ErrorPage />,
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
                action: Actions.createOrUpdateEvent,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: Actions.createOrUpdateEvent,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: Actions.signUpNewsletter,
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
