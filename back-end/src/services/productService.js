import { connection } from '../database/product.js';

const conn = await connection.getConnection();

const getProductCount = async () => {
    try {
        const sql = 'SELECT COUNT(*) AS Count FROM ??';
        const values = ['product'];
        const [result] = await conn.query(sql, values);
        return result[0].Count;
    } catch (err) {
        console.error(err);
        return 0;
    } finally {
        conn.release();
    }
};

const getProductCountByCategoryId = async (category_id) => {
    try {
        const sql = 'SELECT COUNT(*) AS Count FROM ?? WHERE ?? = ?';
        const values = ['product', 'category_id', category_id];
        const [result] = await conn.query(sql, values);
        return result[0].Count;
    } catch (err) {
        console.error(err);
        return 0;
    } finally {
        conn.release();
    }
};

const findAll = async (offset, limit) => {
    try {
        const sql = 'SELECT * FROM ?? LIMIT ?, ?';
        const values = ['product', offset, limit];
        const [rows] = await conn.query(sql, values);
        return rows;
    } catch (err) {
        console.error(err);
        return null;
    } finally {
        conn.release();
    }
};

const findById = async id => {
    try {
        const sql = 'SELECT * FROM ?? WHERE ?? = ?';
        const values = ['product', 'product_id', id];
        const [rows] = await conn.query(sql, values);
        return rows[0];
    } catch (err) {
        console.error(err);
        return null;
    } finally {
        conn.release();
    }
};

const findByCategoryId = async (categoryId, offset, limit) => {
    try {
        const sql = 'SELECT * FROM ?? WHERE ?? = ? LIMIT ?, ?';
        const values = ['product', 'category_id', categoryId, offset, limit];
        console.log(conn.format(sql, values));
        const [rows] = await conn.query(sql, values);
        return rows;
    } catch (err) {
        return null;
    } finally {
        conn.release();
    }
};

const persist = async product => {
    try {
        console.log(product);
        const sql = 'INSERT INTO ?? SET ?';
        const values = ['product', product];
        console.log(conn.format(sql, values));
        const [rows] = await conn.query(sql, values);
        return rows;
    } catch (err) {
        console.error(err);
        return null;
    } finally {
        conn.release();
    }
};

const update = async (id, product) => {
    try {
        const sql = 'UPDATE ?? SET ? WHERE ?? = ?';
        const values = ['product', product, 'product_id', id];
        console.log(conn.format(sql, values));
        const [rows] = await conn.query(sql, values);
        return rows;
    } catch (err) {
        console.error(err);
        return null;
    } finally {
        conn.release();
    }
};

const remove = async id => {
    try {
        const sql = 'DELETE FROM ?? WHERE ?? = ?';
        const values = ['product', 'product_id', id];
        console.log(conn.format(sql, values));
        const [rows] = await conn.query(sql, values);
        return rows;
    } catch (err) {
        console.error(err);
        return null;
    } finally {
        conn.release();
    }
};

export default {
    findAll,
    findById,
    findByCategoryId,
    persist,
    update,
    remove,
    getProductCount,
    getProductCountByCategoryId
};