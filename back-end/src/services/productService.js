import { connection } from '../database/database.js';
import categoryService from '../services/categoryService.js';

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

const mapProduct = async row => {
    return {
        product_id: row.product_id,
        product_name: row.product_name,
        category: (await categoryService.findById(row.category_id)),
        quantity: row.quantity
    };
};

const findAll = async (offset, limit) => {
    try {
        const sql = 'SELECT ?? FROM ?? ORDER BY ?? DESC LIMIT ?, ?';
        const column = ['product_id', 'product_name', 'category_id', 'quantity'];
        const values = [column, 'product', 'product_id', offset, limit];
        const [rows] = await conn.query(sql, values);
        const products = await Promise.all(rows.map(row => mapProduct(row)));
        return products;
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
        const column = ['product_id', 'product_name', 'category_id', 'quantity'];
        const values = [column, 'product', 'product_id', id];
        const [rows] = await conn.query(sql, values);
        return await mapProduct(rows[0]);
    } catch (err) {
        console.error(err);
        return null;
    } finally {
        conn.release();
    }
};

const findByCategoryId = async (categoryId, offset, limit) => {
    try {
        const sql = 'SELECT ?? FROM ?? WHERE ?? = ? LIMIT ?, ?';
        const column = ['product_id', 'product_name', 'category_id', 'quantity'];
        const values = [column, 'product', 'category_id', categoryId, offset, limit];
        console.log(conn.format(sql, values));
        const [rows] = await conn.query(sql, values);
        const products = await Promise.all(rows.map(row => mapProduct(row)));
        return products;
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