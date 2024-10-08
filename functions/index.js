/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();
const db = admin.firestore();

exports.countBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const count = snapshot.size;

      res.status(200).send({count});
    } catch (error) {
      console.error("Error counting books:", error.message);
      res.status(500).send("Error counting books");
    }
  });
});

exports.addBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const {isbn, name} = req.body;
      console.log("Received request body:", req.body);
      const upperName = name.toUpperCase();
      console.log("upperName:", upperName);
      const newBook = await db.collection("books").add({
        name: upperName,
        isbn,
      });
      res.status(200).send({newBook});
    } catch (error) {
      console.error("Error adding book: ", error);
      res.status(500).send("Error adding books");
    }
  });
});

exports.getBooks = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const booksCollection = admin.firestore().collection("books");
      const snapshot = await booksCollection.get();
      const books = snapshot.docs.map((doc) => doc.data());

      res.status(200).send({books});
    } catch (error) {
      console.error("Error getting books:", error.message);
      res.status(500).send("Error getting books");
    }
  });
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
