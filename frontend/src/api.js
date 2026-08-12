const API =
    "http://localhost:5000/api/events";

export const getEvents = () =>
    fetch(API)
        .then(res => res.json());

export const addEvent = data =>
    fetch(API, {
        method: "POST",
        body: data
    }).then(res => res.json());

export const updateEvent =
    (id, data) =>
        fetch(`${API}/${id}`, {
            method: "PUT",
            body: data
        }).then(res => res.json());

export const deleteEvent = id =>
    fetch(`${API}/${id}`, {
        method: "DELETE"
    }).then(res => res.json());