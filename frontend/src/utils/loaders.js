import { json } from "react-router-dom";

class Loaders {
  async eventsPageLoader({ request, params }) {
    const response = await fetch("http://localhost:8080/events");

    if (!response.ok) {
      // throw new Response(
      //   JSON.stringify({ message: "Could not fetch events." }),
      //   {
      //     status: response.status,
      //   }
      // );
      // Instead we can `json()` provided by react router to simplify the code.
      // It creates a Response object for you internally.
      throw json(
        { message: "Could not fetch events." },
        { status: response.status }
      );
    }

    // const { events } = await response.json();
    // return new Response(JSON.stringify(events), {
    //   status: response.status,
    //   headers: { "Content-Type": "application/json; utf-8" },
    // });
    return response;
  }

  async eventDetailPageLoader({ request, params }) {
    const response = await fetch(
      `http://localhost:8080/events/${params.eventId}`
    );

    if (response.status === 404) {
      // throw new Response(
      //   JSON.stringify({ message: "The event detail is not found." }),
      //   {
      //     status: 404,
      //   }
      // );
      throw json(
        { message: "The event detail is not found." },
        { status: 404 }
      );
    }

    if (!response.ok) {
      // throw new Response(JSON.stringify({ message: "Bad Request" }), {
      //   status: response.status,
      // });
      throw json({ message: "Bad Request" }, { status: response.status });
    }

    // const { event } = await response.json();
    // return new Response(JSON.stringify(event), {
    //   status: 200,
    //   headers: { "Content-Type": "application/json; utf-8" },
    // });
    return response;
  }
}

const loaders = new Loaders();
export default loaders;
