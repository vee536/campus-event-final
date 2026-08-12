import { useState } from "react";

import {
    addEvent,
    updateEvent
} from "../api";


function EventForm({ event, done }) {

    const empty = {

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

        facilities: [],

        website: "",
        description: "",
        poster: null

    };


    const [form, setForm] =
        useState(event || empty);


    const change = e => {

        setForm({
            ...form,
            [e.target.name]:
                e.target.value
        });

    };


    const facilityChange = e => {

        const {
            value,
            checked
        } = e.target;


        setForm({

            ...form,

            facilities: checked

                ? [
                    ...form.facilities,
                    value
                ]

                : form.facilities.filter(
                    item => item !== value
                )

        });

    };


    const submit = async e => {

        e.preventDefault();


        const phone =
            form.phone.replace(
                /\D/g,
                ""
            );


        

        if (
            !form.eventName.trim() ||
            !form.resourcePerson.trim() ||
            !form.maxParticipants ||
            !form.registrationStatus ||
            !form.email.trim() ||
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


      

        if (
            form.password.length < 6
        ) {

            return alert(
                "Password must contain at least 6 characters"
            );

        }


        

        if (
            Number(form.maxParticipants) <= 0
        ) {

            return alert(
                "Maximum participants must be greater than 0"
            );

        }


        

        if (
            form.facilities.length === 0
        ) {

            return alert(
                "Select at least one facility"
            );

        }


       

        const data =
            new FormData();


        data.append(
            "eventName",
            form.eventName
        );


        data.append(
            "resourcePerson",
            form.resourcePerson
        );


        data.append(
            "maxParticipants",
            form.maxParticipants
        );


        data.append(
            "registrationStatus",
            form.registrationStatus
        );


        data.append(
            "email",
            form.email
        );


        data.append(
            "phone",
            phone
        );


        data.append(
            "password",
            form.password
        );


        data.append(
            "eventDate",
            form.eventDate
        );


        data.append(
            "eventType",
            form.eventType
        );


        data.append(
            "venue",
            form.venue
        );


        data.append(
            "facilities",
            JSON.stringify(
                form.facilities
            )
        );


        data.append(
            "website",
            form.website
        );


        data.append(
            "description",
            form.description
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


    return (

        <form
            onSubmit={submit}
            className="
                bg-white
                border
                border-gray-200
                rounded-xl
                shadow-sm
                p-6
                mb-8
            "
        >

            {/* HEADING */}

            <div className="mb-6">

                <h2 className="
                    text-2xl
                    font-bold
                    text-blue-800
                    mb-1
                ">

                    {event
                        ? "Edit Event"
                        : "Create Campus Event"}

                </h2>


                <p className="
                    text-gray-500
                    text-sm
                ">

                    Enter the event details below.
                    Fields marked with * are required.

                </p>

            </div>


            {/* event details for the program */}

            <fieldset className="
                border
                border-blue-200
                rounded-lg
                p-5
                mb-6
            ">

                <legend className="
                    px-3
                    text-blue-700
                    font-bold
                ">

                    Event Details

                </legend>


                <div className="
                    grid
                    md:grid-cols-2
                    gap-5
                ">


                    {/* EVENT NAME */}

                    <div>

                        <label className="
                            block
                            font-semibold
                            mb-2
                        ">

                            Event Name *

                        </label>


                        <input
                            className="
                                border
                                rounded-md
                                p-2.5
                                w-full
                            "
                            type="text"
                            name="eventName"
                            placeholder="Enter event name"
                            value={form.eventName}
                            onChange={change}
                        />

                    </div>


                    {/* resoure person */}

                    <div>

                        <label className="
                            block
                            font-semibold
                            mb-2
                        ">

                            Resource Person *

                        </label>


                        <input
                            className="
                                border
                                rounded-md
                                p-2.5
                                w-full
                            "
                            type="text"
                            name="resourcePerson"
                            placeholder="Enter resource person"
                            value={form.resourcePerson}
                            onChange={change}
                        />

                    </div>


                    {/* participants */}

                    <div>

                        <label className="
                            block
                            font-semibold
                            mb-2
                        ">

                            Maximum Participants *

                        </label>


                        <input
                            className="
                                border
                                rounded-md
                                p-2.5
                                w-full
                            "
                            type="number"
                            name="maxParticipants"
                            placeholder="Enter maximum number"
                            min="1"
                            value={
                                form.maxParticipants
                            }
                            onChange={change}
                        />

                    </div>


                    {/* registration status */}

                    <div>

                        <label className="
                            block
                            font-semibold
                            mb-2
                        ">

                            Registration Status *

                        </label>


                        <select
                            className="
                                border
                                rounded-md
                                p-2.5
                                w-full
                            "
                            name="registrationStatus"
                            value={
                                form.registrationStatus
                            }
                            onChange={change}
                        >

                            <option value="">
                                Select Status
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


                    {/* EMAIL */}

                    <div>

                        <label className="
                            block
                            font-semibold
                            mb-2
                        ">

                            Organizer Email *

                        </label>


                        <input
                            className="
                                border
                                rounded-md
                                p-2.5
                                w-full
                            "
                            type="email"
                            name="email"
                            placeholder="organizer@gmail.com"
                            value={form.email}
                            onChange={change}
                        />

                    </div>


                    {/* phone num */}

                    <div>

                        <label className="
                            block
                            font-semibold
                            mb-2
                        ">

                            Contact Number *

                        </label>


                        <input
                            className="
                                border
                                rounded-md
                                p-2.5
                                w-full
                            "
                            type="tel"
                            name="phone"
                            placeholder="10 digit number"
                            value={form.phone}
                            onChange={change}
                            maxLength="10"
                        />

                    </div>


                    {/* password */}

                    <div>

                        <label className="
                            block
                            font-semibold
                            mb-2
                        ">

                            Organizer Password *

                        </label>


                        <input
                            className="
                                border
                                rounded-md
                                p-2.5
                                w-full
                            "
                            type="password"
                            name="password"
                            placeholder="Minimum 6 characters"
                            value={form.password}
                            onChange={change}
                        />

                    </div>


                    {/* date */}

                    <div>

                        <label className="
                            block
                            font-semibold
                            mb-2
                        ">

                            Event Date *

                        </label>


                        <input
                            className="
                                border
                                rounded-md
                                p-2.5
                                w-full
                            "
                            type="date"
                            name="eventDate"
                            value={form.eventDate}
                            onChange={change}
                        />

                    </div>

                </div>

            </fieldset>


            {/* EVENT CATEGORY */}

            <fieldset className="
                border
                border-green-200
                rounded-lg
                p-5
                mb-6
            ">

                <legend className="
                    px-3
                    text-green-700
                    font-bold
                ">

                    Event Category

                </legend>


                {/* EVENT TYPE */}

                <div className="mb-6">

                    <p className="
                        font-semibold
                        mb-3
                    ">

                        Event Type *

                    </p>


                    <div className="
                        flex
                        flex-wrap
                        gap-6
                    ">


                        <label className="
                            flex
                            items-center
                            gap-2
                        ">

                            <input
                                type="radio"
                                name="eventType"
                                value="Technical"
                                checked={
                                    form.eventType ===
                                    "Technical"
                                }
                                onChange={change}
                            />

                            Technical

                        </label>


                        <label className="
                            flex
                            items-center
                            gap-2
                        ">

                            <input
                                type="radio"
                                name="eventType"
                                value="Cultural"
                                checked={
                                    form.eventType ===
                                    "Cultural"
                                }
                                onChange={change}
                            />

                            Cultural

                        </label>


                        <label className="
                            flex
                            items-center
                            gap-2
                        ">

                            <input
                                type="radio"
                                name="eventType"
                                value="Sports"
                                checked={
                                    form.eventType ===
                                    "Sports"
                                }
                                onChange={change}
                            />

                            Sports

                        </label>

                    </div>

                </div>


                {/* VENUE */}

                <div className="mb-6">

                    <label className="
                        block
                        font-semibold
                        mb-2
                    ">

                        Venue *

                    </label>


                    <select
                        className="
                            border
                            rounded-md
                            p-2.5
                            w-full
                        "
                        name="venue"
                        value={form.venue}
                        onChange={change}
                    >

                        <option value="">
                            Select Venue
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

                </div>


            {/* ADDITIONAL DETAILS */}

            <fieldset className="
                border
                border-purple-200
                rounded-lg
                p-5
                mb-6
            ">

                <legend className="
                    px-3
                    text-purple-700
                    font-bold
                ">

                    Additional Details

                </legend>


                {/* WEBSITE */}

                <div className="mb-5">

                    <label className="
                        block
                        font-semibold
                        mb-2
                    ">

                        Event Website

                    </label>


                    <input
                        className="
                            border
                            rounded-md
                            p-2.5
                            w-full
                        "
                        type="url"
                        name="website"
                        placeholder="https://example.com"
                        value={form.website}
                        onChange={change}
                    />

                </div>


                {/* POSTER */}

                <div className="mb-5">

                    <label className="
                        block
                        font-semibold
                        mb-2
                    ">

                        Event Poster

                    </label>


                    <input
                        className="
                            border
                            rounded-md
                            p-2
                            w-full
                        "
                        type="file"
                        accept="image/*"
                        onChange={e =>
                            setForm({
                                ...form,
                                poster:
                                    e.target.files[0]
                            })
                        }
                    />

                </div>


                {/* DESCRIPTION */}

                <div>

                    <label className="
                        block
                        font-semibold
                        mb-2
                    ">

                        Event Description

                    </label>


                    <textarea
                        className="
                            border
                            rounded-md
                            p-2.5
                            w-full
                        "
                        rows="4"
                        name="description"
                        placeholder="Describe the event..."
                        value={form.description}
                        onChange={change}
                    />

                </div>

            </fieldset>


            {/* BUTTON */}

            <button
                type="submit"
                className="
                    bg-blue-700
                    hover:bg-blue-800
                    text-white
                    font-semibold
                    px-6
                    py-2.5
                    rounded-md
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