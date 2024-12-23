import { NextApiRequest, NextApiResponse } from "next";
import mysql, { ResultSetHeader } from "mysql2/promise";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "schedule",
    });
  
    if (req.method === "GET") {
      // Fetch all events
      try {
        const [rows] = await db.query("SELECT * FROM events");
        res.status(200).json(rows);
      } catch (error) {
        res.status(500).json({ message: "Error fetching events", error });
      } finally {
        await db.end();
      }
    } else if (req.method === "POST") {
      // Add a new event
      const { title, description, start, end } = req.body;
  
      if (!title || !description || !start || !end) {
        res.status(400).json({ message: "All fields are required" });
        return;
      }
  
      try {
        const [result] = await db.query<ResultSetHeader>(
          "INSERT INTO events (title, description, start, end) VALUES (?, ?, ?, ?)",
          [title, description, start, end]
        );
        res.status(201).json({ message: "Event added successfully", id: result.insertId });
      } catch (error) {
        res.status(500).json({ message: "Error adding event", error });
      } finally {
        await db.end();
      }
    } else if (req.method === "DELETE") {
      // Delete an event
      const { id } = req.body;
  
      if (!id) {
        res.status(400).json({ message: "Event ID is required" });
        return;
      }
  
      try {
        const [result] = await db.query<ResultSetHeader>("DELETE FROM events WHERE id = ?", [id]);
        if (result.affectedRows === 0) {
          res.status(404).json({ message: "Event not found" });
        } else {
          res.status(200).json({ message: "Event deleted successfully" });
        }
      } catch (error) {
        res.status(500).json({ message: "Error deleting event", error });
      } finally {
        await db.end();
      }
    } else {
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  