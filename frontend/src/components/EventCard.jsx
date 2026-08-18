import { useState } from "react";
import EventForm from "./EventForm";

function EventCard({
    event,
    remove,
    refresh
}) {

    const [edit, setEdit] = useState(false);

    if (edit) {

        return (
            <EventForm
                event={event}
                done={() => {
                    setEdit(false);
                    refresh();
                }}
            />
        );

    }

    return (

        <div className="
            bg-white
            border
            rounded-lg
            p-5
            mb-4
            shadow-sm
        ">

            <h3 className="
                text-lg
                font-bold
                text-blue-800
            ">
                {event.eventName}
            </h3>

            <p className="
                text-green-700
                mb-4
            ">
                {event.eventType}
            </p>

            <p>
                <b>Resource Person:</b>{" "}
                {event.resourcePerson}
            </p>

            <p>
                <b>Maximum Participants:</b>{" "}
                {event.maxParticipants}
            </p>

            <p>
                <b>Registration:</b>{" "}
                {event.registrationStatus}
            </p>

            <p>
                <b>Date:</b>{" "}
                {new Date(
                    event.eventDate
                ).toLocaleDateString()}
            </p>

            <p>
                <b>Venue:</b>{" "}
                {event.venue}
            </p>

            <p>
                <b>Email:</b>{" "}
                {event.email}
            </p>

            <p>
                <b>Phone:</b>{" "}
                {event.phone}
            </p>

            {event.description && (
                <p className="mt-3">
                    {event.description}
                </p>
            )}

            <div className="mt-4">

                <button
                    className="
                        bg-blue-300
                        text-white
                        px-4
                        py-2
                        rounded
                        mr-2
                    "
                    onClick={() => setEdit(true)}
                >
                    Edit
                </button>

                <button
                    className="
                        bg-green-500
                        text-white
                        px-4
                        py-2
                        rounded
                    "
                    onClick={() => remove(event._id)}
                >
                    Delete
                </button>

            </div>

        </div>
    );
}

export default EventCard;