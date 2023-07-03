import { defer, json, redirect } from "react-router-dom";
import localStorageService from "../services/LocalStorageService";
import helpers from "./Helpers";

class Loaders {
  async eventsPageLoader() {
    const response = await fetch("http://localhost:8080/events");

    if (!response.ok) {
      throw json(
        { message: "Could not fetch events." },
        { status: response.status }
      );
    }

    const { events } = await response.json();
    return events;
  }

  async eventDetailPageLoader({ request, params }) {
    const response = await fetch(
      `http://localhost:8080/events/${params.eventId}`
    );

    if (response.status === 404) {
      throw json(
        { message: "The event detail is not found." },
        { status: 404 }
      );
    }

    if (!response.ok) {
      throw json({ message: "Bad Request" }, { status: response.status });
    }

    return response;
  }

  async tokenLoader({ request }) {
    let isAuthUrl = new URL(request.url).pathname
      .split("/")
      .findIndex((p) => p === "auth");
    let token = localStorageService.load("token");

    // Return if the url is auth url.
    if (isAuthUrl !== -1) {
      return token;
    }

    // Check if token even exist in the localstorage.
    if (!token) {
      return redirect("/auth?mode=login");
    }

    // Validate if token is expired.
    let tokenDuration = helpers.getTokenDuration();
    if (tokenDuration <= 0) {
      return redirect("/auth?mode=login");
    }

    return token;
  }

  async checkAuthLoader() {
    let token = localStorageService.load("token");
    if (!token) {
      return redirect("/auth?mode=login");
    }
    return token;
  }
}

const loaders = new Loaders();
export default loaders;

export async function deferredEventsPageLoader() {
  return defer({ events: loaders.eventsPageLoader() });
}
