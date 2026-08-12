import { useState } from "react";

import EventForm
    from "./EventForm";

function EventCard({
    event,
    remove,
    refresh
}) {

    const [edit, setEdit] =
        useState(false);


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
            border-gray-200
            rounded-lg
            p-5
            mb-4
            shadow-sm
        ">


            <div className="mb-4">

                <h3 className="
                    text-lg
                    font-bold
                    text-blue-800
                ">
                    {event.eventName}
                </h3>

                <p className="
                    text-sm
                    text-green-700
                ">
                    {event.eventType}
                </p>

            </div>


            <div className="
                grid
                md:grid-cols-2
                gap-2
                text-sm
                mb-4
            ">

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

                <p>
                    <b>Facilities:</b>{" "}
                    {event.facilities?.join(
                        ", "
                    )}
                </p>

            </div>


            {event.description && (

                <p className="
                    text-gray-600
                    mb-4
                ">
                    {event.description}
                </p>

            )}


            <button
                className="
                    bg-yellow-500
                    hover:bg-yellow-600
                    text-white
                    px-4
                    py-2
                    rounded
                    mr-2
                "
                onClick={() =>
                    setEdit(true)
                }
            >
                Edit
            </button>


            <button
                className="
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    px-4
                    py-2
                    rounded
                "
                onClick={() =>
                    remove(event._id)
                }
            >
                Delete
            </button>

        </div>

    );

}

export default EventCard;