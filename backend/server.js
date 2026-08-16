require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const eventRoutes = require("./routes/events");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);

app.use(
    "/api/events",
    eventRoutes
);

const PORT = process.env.PORT || 5001;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB connected");

        app.listen(PORT, () => {
            console.log(
                `Server running on ${PORT}`
            );
        });

    })
    .catch(err => {

        console.log(
            "MongoDB error:",
            err.message
        );

    });