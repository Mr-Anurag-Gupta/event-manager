import { json, redirect } from "react-router-dom";
import localStorageService from "../services/LocalStorageService";
import urlService from "../services/URLService";

export default class Actions {
  static async createOrUpdateEvent({ request, params }) {
    let formData = await request.formData();

    let event = {
      title: formData.get("title"),
      image: formData.get("image"),
      date: formData.get("date"),
      description: formData.get("description"),
    };

    let url = urlService.getEventsUrl();
    if (request.method.toLowerCase() === "patch") {
      url = `${url}/${params.eventId}`;
    }

    let res = await fetch(url, {
      method: request.method,
      body: JSON.stringify(event),
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorageService.load("token"),
      },
    });

    if (!res.ok) throw res;

    if (res.status === 422) {
      return res;
    }

    return redirect("/events");
  }

  static async deleteEvent({ request, params }) {
    let url = `${urlService.getEventsUrl()}/${params.eventId}`;
    let res = await fetch(url, {
      method: request.method,
      headers: {
        authorization: "Bearer " + localStorageService.load("token"),
      },
    });

    if (!res.ok) {
      throw json({ message: "Could not delete the event." }, { status: 500 });
    }

    return redirect("/events");
  }

  static async signUpNewsletter({ request }) {
    const data = await request.formData();
    const email = data.get("email");

    // send to backend newsletter server ...
    console.log(email);
    return { message: "Signup successful!" };
  }

  static async loginOrSignup({ request }) {
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get("mode") || "login";
    if (mode !== "login" && mode !== "signup") {
      throw json({ message: "Unsupported mode." }, { status: 422 });
    }

    let formData = await request.formData();
    let user = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    let url = urlService.getBaseUrl() + mode;
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (res.status === 422 || res.status === 401) {
      return res;
    }

    if (!res.ok) {
      throw json({ message: "Could not authenticate user" }, { status: 500 });
    }

    let token = (await res.json()).token;
    localStorageService.save("token", token);

    let expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorageService.save("expiration", expiration.toISOString());

    return redirect("/");
  }

  static async logout() {
    localStorageService.remove("token");
    localStorageService.remove("expiration");
    return redirect("/");
  }
}
