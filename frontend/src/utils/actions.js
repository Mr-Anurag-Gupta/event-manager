import { json, redirect } from "react-router-dom";

export default class Actions {
  static async createOrUpdateEvent({ request, params }) {
    let formData = await request.formData();

    let event = {
      title: formData.get("title"),
      image: formData.get("image"),
      date: formData.get("date"),
      description: formData.get("description"),
    };

    let url = "http://localhost:8080/events";
    if (request.method.toLowerCase() === "patch") {
      url = `http://localhost:8080/events/${params.eventId}`;
      console.log(`URL: ${url}`);
    }

    console.log(`method: ${params.eventId}`);
    let res = await fetch(url, {
      method: request.method,
      body: JSON.stringify(event),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw res; // can send custom data using json() utility

    if (res.status === 422) {
      return res;
    }

    return redirect("/events");
  }

  static async deleteEvent({ request, params }) {
    let res = await fetch(`http://localhost:8080/events/${params.eventId}`, {
      method: request.method,
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
}
