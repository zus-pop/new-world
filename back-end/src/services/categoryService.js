import { connection } from "../database/database.js";

const conn = await connection.getConnection();

const findAll = async () => {
    try {
        const sql = 'SELECT ?? FROM ??';
        const column = ['category_id', 'category_name'];
        const values = [column, 'category'];
        const [categories] = await conn.query(sql, values);
        return categories;
    } catch (err) {
        console.error(err);
        return null;
    } finally {
        conn.release();
    }
};

const findById = async id => {
    try {
        const sql = 'SELECT ?? FROM ?? WHERE ?? = ?';
        const column = ['category_id', 'category_name'];
        const values = [column, 'category', 'category_id', id];
        const [categories] = await conn.query(sql, values);
        return categories[0];
    } catch (err) {
        console.err(err);
        return null;
    } finally {
        conn.release();
    }
};

export default {
    findAll,
    findById
};