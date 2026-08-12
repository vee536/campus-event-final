const express = require("express");

const router = express.Router();

const Event =
    require("../models/Event");

const upload =
    require("../middleware/upload");


router.post(
    "/",
    upload.single("poster"),
    async (req, res) => {

        try {

            const data = req.body;

            data.facilities =
                data.facilities
                    ? JSON.parse(
                        data.facilities
                    )
                    : [];

            if (req.file) {
                data.poster =
                    req.file.filename;
            }

            const event =
                await Event.create(data);

            res.status(201).json(event);

        } catch (err) {

            res.status(400).json({
                error: err.message
            });

        }
    }
);


router.get(
    "/",
    async (req, res) => {

        try {

            const events =
                await Event.find();

            res.json(events);

        } catch (err) {

            res.status(500).json({
                error: err.message
            });

        }
    }
);


router.get(
    "/:id",
    async (req, res) => {

        try {

            const event =
                await Event.findById(
                    req.params.id
                );

            if (!event) {

                return res.status(404).json({
                    error: "Event not found"
                });

            }

            res.json(event);

        } catch (err) {

            res.status(404).json({
                error: "Event not found"
            });

        }
    }
);



router.put(
    "/:id",
    upload.single("poster"),
    async (req, res) => {

        try {

            const data = req.body;

            data.facilities =
                data.facilities
                    ? JSON.parse(
                        data.facilities
                    )
                    : [];

            if (req.file) {
                data.poster =
                    req.file.filename;
            }

            const event =
                await Event.findByIdAndUpdate(
                    req.params.id,
                    data,
                    { new: true }
                );

            if (!event) {

                return res.status(404).json({
                    error: "Event not found"
                });

            }

            res.json(event);

        } catch (err) {

            res.status(400).json({
                error: err.message
            });

        }
    }
);



router.delete(
    "/:id",
    async (req, res) => {

        try {

            const event =
                await Event.findByIdAndDelete(
                    req.params.id
                );

            if (!event) {

                return res.status(404).json({
                    error: "Event not found"
                });

            }

            res.json({
                message:
                    "Event deleted successfully"
            });

        } catch (err) {

            res.status(500).json({
                error: err.message
            });

        }
    }
);


module.exports = router;