import { json, redirect } from "react-router-dom";

export default class Actions {
  static async createNewEvent({ request, params }) {
    let formData = await request.formData();

    let event = {
      title: formData.get("title"),
      image: formData.get("image"),
      date: formData.get("date"),
      description: formData.get("description"),
    };

    let res = await fetch("http://localhost:8080/events", {
      method: "post",
      body: JSON.stringify(event),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw res; // can send custom data using json() utility

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
}
