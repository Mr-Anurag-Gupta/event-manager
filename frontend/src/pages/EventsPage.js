import EventsList from "../components/EventsList";
import { useLoaderData } from "react-router-dom";

function EventsPage() {
  const { events } = useLoaderData();
  console.log(events);

  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;
