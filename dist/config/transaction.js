export const createTransaction = (db) => async (cb) => {
    const client = await db.connect();
    try {
        await client.query("BEGIN");
        const result = await cb(client);
        await client.query("COMMIT");
        return result;
    }
    catch (error) {
        await client.query("ROLLBACK");
        throw error;
    }
    finally {
        client.release();
    }
};
//# sourceMappingURL=transaction.js.map