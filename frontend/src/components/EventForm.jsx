import { useState } from "react";
import { addEvent, updateEvent } from "../api";

const emptyForm = {
    eventName: "",
    resourcePerson: "",
    maxParticipants: "",
    registrationStatus: "",
    email: "",
    phone: "",
    password: "",
    eventDate: "",
    eventType: "",
    venue: "",
    poster: null
};

function EventForm({ event, done }) {

    const [form, setForm] = useState(
        event
            ? {
                ...emptyForm,
                ...event,
                eventDate: event.eventDate
                    ? event.eventDate.slice(0, 10)
                    : ""
            }
            : emptyForm
    );

    const change = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const submit = async (e) => {

        e.preventDefault();

        const phone =
            form.phone.replace(/\D/g, "");

        if (
            !form.eventName ||
            !form.resourcePerson ||
            !form.maxParticipants ||
            !form.registrationStatus ||
            !form.email ||
            !phone ||
            !form.password ||
            !form.eventDate ||
            !form.eventType ||
            !form.venue
        ) {
            return alert(
                "Please fill all required fields"
            );
        }

        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(form.email)
        ) {
            return alert(
                "Enter a valid email"
            );
        }

        if (phone.length !== 10) {
            return alert(
                "Phone number must contain 10 digits"
            );
        }

        if (form.password.length < 6) {
            return alert(
                "Password must contain at least 6 characters"
            );
        }

        if (Number(form.maxParticipants) <= 0) {
            return alert(
                "Maximum participants must be greater than 0"
            );
        }

        const data = new FormData();

        Object.entries(form).forEach(
            ([key, value]) => {

                if (
                    key !== "poster" &&
                    key !== "_id"
                ) {
                    data.append(key, value);
                }

            }
        );

        if (form.poster) {
            data.append(
                "poster",
                form.poster
            );
        }

        if (event) {

            await updateEvent(
                event._id,
                data
            );

            alert(
                "Event updated successfully"
            );

        } else {

            await addEvent(data);

            alert(
                "Event created successfully"
            );
        }

        if (done) {
            done();
        } else {
            window.location.reload();
        }
    };

    const inputClass =
        "w-full border rounded-md p-2 mt-1";

    return (

        <form
            onSubmit={submit}
            className="
                bg-white
                p-6
                rounded-lg
                shadow
                mb-8
            "
        >

            <h2 className="
                text-2xl
                font-bold
                text-blue-800
                mb-5
            ">
                {event
                    ? "Edit Event"
                    : "Create Campus Event"}
            </h2>




            <fieldset className="
                border
                rounded-lg
                p-4
                mb-5
            ">

                <legend className="
                    font-bold
                    px-2
                    text-blue-700
                ">
                    Event Details
                </legend>


                <div className="
                    grid
                    md:grid-cols-2
                    gap-4
                ">

                    <div>
                        <label>
                            Event Name *
                        </label>

                        <input
                            className={inputClass}
                            type="text"
                            name="eventName"
                            value={form.eventName}
                            onChange={change}
                        />
                    </div>


                    <div>
                        <label>
                            Resource Person *
                        </label>

                        <input
                            className={inputClass}
                            type="text"
                            name="resourcePerson"
                            value={
                                form.resourcePerson
                            }
                            onChange={change}
                        />
                    </div>


                    <div>
                        <label>
                            Maximum Participants *
                        </label>

                        <input
                            className={inputClass}
                            type="number"
                            name="maxParticipants"
                            min="1"
                            value={
                                form.maxParticipants
                            }
                            onChange={change}
                        />
                    </div>


                    <div>
                        <label>
                            Registration Status *
                        </label>

                        <select
                            className={inputClass}
                            name="registrationStatus"
                            value={
                                form.registrationStatus
                            }
                            onChange={change}
                        >

                            <option value="">
                                Select
                            </option>

                            <option value="Open">
                                Open
                            </option>

                            <option value="Closed">
                                Closed
                            </option>

                            <option value="Full">
                                Full
                            </option>

                        </select>
                    </div>


                    <div>
                        <label>
                            Email *
                        </label>

                        <input
                            className={inputClass}
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={change}
                        />
                    </div>


                    <div>
                        <label>
                            Phone *
                        </label>

                        <input
                            className={inputClass}
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={change}
                            maxLength="10"
                        />
                    </div>


                    <div>
                        <label>
                            Password *
                        </label>

                        <input
                            className={inputClass}
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={change}
                        />
                    </div>


                    <div>
                        <label>
                            Event Date *
                        </label>

                        <input
                            className={inputClass}
                            type="date"
                            name="eventDate"
                            value={form.eventDate}
                            onChange={change}
                        />
                    </div>

                </div>

            </fieldset>



            <fieldset className="
                border
                rounded-lg
                p-4
                mb-5
            ">

                <legend className="
                    font-bold
                    px-2
                    text-green-700
                ">
                    Event Category
                </legend>


                <p className="font-semibold mb-2">
                    Event Type *
                </p>


                <div className="
                    flex
                    gap-6
                    mb-5
                ">

                    {[
                        "Technical",
                        "Cultural",
                        "Sports"
                    ].map(type => (

                        <label
                            key={type}
                            className="
                                flex
                                gap-2
                                items-center
                            "
                        >

                            <input
                                type="radio"
                                name="eventType"
                                value={type}
                                checked={
                                    form.eventType ===
                                    type
                                }
                                onChange={change}
                            />

                            {type}

                        </label>

                    ))}

                </div>


                <label className="
                    font-semibold
                ">
                    Venue *
                </label>


                <select
                    className={inputClass}
                    name="venue"
                    value={form.venue}
                    onChange={change}
                >

                    <option value="">
                        Select venue
                    </option>

                    <option value="Auditorium">
                        Main Auditorium
                    </option>

                    <option value="Seminar Hall">
                        Seminar Hall
                    </option>

                    <option value="Ground">
                        College Ground
                    </option>

                    <option value="Lab">
                        Computer Lab
                    </option>

                </select>


                <label className="
                    block
                    font-semibold
                    mt-5
                ">
                    Event Poster
                </label>


                <input
                    className="mt-2"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setForm({
                            ...form,
                            poster:
                                e.target.files[0]
                        })
                    }
                />

            </fieldset>


            <button
                type="submit"
                className="
                    bg-pink-600
                    hover:bg-pink-700
                    text-white
                    px-5
                    py-2
                    rounded
                "
            >
                {event
                    ? "Update Event"
                    : "Create Event"}
            </button>

        </form>
    );
}

export default EventForm;