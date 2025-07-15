// // import statements
// import express from "express";
// import pool from "../db.js"; // make sure db.js uses `export default pool`
// import multer from "multer";

// // create router and multer config
// const router = express.Router();
// const upload = multer({ dest: "uploads/" });

// router.post("/", upload.none(), async (req, res) => {
//   const {
//     eventName,
//     date,
//     time,
//     location,
//     description,
//     stalls,
//     tags,
//     faqs,
//     tickets,
//   } = req.body;

//   try {
//     const result = await pool.query(
//       `INSERT INTO events 
//        (event_name, date, time, location, description, stalls, tags, faqs, tickets)
//        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
//        RETURNING *`,
//       [
//         eventName,
//         date,
//         time,
//         location,
//         description,
//         stalls,
//         tags,
//         faqs,
//         JSON.stringify(tickets),
//       ]
//     );

//     res.status(201).json({ event: result.rows[0] });
//   } catch (err) {
//     console.error("Error inserting event:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // export in ES module style
// export default router;



