const db = require('../database');

exports.createParticipation = async (req, res) => {
    const { user_id, event_id, participation_date, hours_volunteered, role } = req.body;
    try {
        const [result] = await db.query(
            `INSERT INTO VolunteerParticipation (user_id, event_id, participation_date, hours_volunteered, role) 
             VALUES (?, ?, ?, ?, ?)`,
            [user_id, event_id, participation_date, hours_volunteered, role]
        );
        res.status(201).json({ message: 'Participation record created', participation_id: result.insertId });
    } catch (error) {
        console.error("Error creating participation record:", error.message);
        res.status(500).json({ error: 'Database error occurred while creating participation record.' });
    }
};

exports.getAllParticipationRecords = async (req, res) => {
    try {
        const [rows] = await db.query(`SELECT * FROM VolunteerParticipation`);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error retrieving participation records:", error.message);
        res.status(500).json({ error: 'Database error occurred while retrieving records.' });
    }
};

exports.getParticipationByUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query(`SELECT * FROM VolunteerParticipation WHERE user_id = ?`, [id]);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error retrieving participation records by user ID:", error.message);
        res.status(500).json({ error: 'Database error occurred while retrieving the record.' });
    }
};

exports.updateParticipation = async (req, res) => {
    const { id } = req.params;
    const { hours_volunteered, role } = req.body;
    try {
        const [result] = await db.query(
            `UPDATE VolunteerParticipation SET hours_volunteered = ?, role = ? WHERE participation_id = ?`,
            [hours_volunteered, role, id]
        );
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Participation record updated.' });
        } else {
            res.status(404).json({ error: 'Participation record not found.' });
        }
    } catch (error) {
        console.error("Error updating participation record:", error.message);
        res.status(500).json({ error: 'Database error occurred while updating the record.' });
    }
};

exports.deleteParticipation = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query(`DELETE FROM VolunteerParticipation WHERE participation_id = ?`, [id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Participation record deleted.' });
        } else {
            res.status(404).json({ error: 'Participation record not found.' });
        }
    } catch (error) {
        console.error("Error deleting participation record:", error.message);
        res.status(500).json({ error: 'Database error occurred while deleting the record.' });
    }
};
