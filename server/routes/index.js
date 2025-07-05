const router = require("express").Router();

router.use("/auth", require("./authRoutes"));
router.use("/events", require("./eventRouters"));
router.use("/users", require("./userRouters"));

module.exports = router;