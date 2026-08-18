import {
    useEffect,
    useState
} from "react";

import {
    getEvents,
    deleteEvent
} from "../api";

import EventCard
    from "./EventCard";

function EventList() {

const [events, setEvents] =
useState([]);


const load = async () => {

const data =
await getEvents();

setEvents(data);

};


useEffect(() => {

load();

}, []);


const remove = async id => {

if (
!window.confirm(
    "Delete this event?"
)
) {
return;
}

await deleteEvent(id);

load();

};


return (

<section>

<h2 className="
    text-xl
    font-bold
    text-gray-800
    mb-4
">
    Campus Events
</h2>


{events.length === 0 && (

    <p className="
        text-gray-500
    ">
        No events registered yet.
    </p>

)}


{events.map(event => (

    <EventCard
        key={event._id}
        event={event}
        remove={remove}
        refresh={load}
    />

))}

</section>

);

}

export default EventList;