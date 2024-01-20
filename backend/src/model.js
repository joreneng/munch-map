import con from "../index.js";


export class model {
  async signup(firstname, lastname, email, password) {
    const client = await con.connect();
    try {
        const queryText = 'SELECT * FROM public.signup_user($1, $2, $3, $4)';
        const queryParams = [firstname, lastname, email, password];

        await client.query(queryText, queryParams);
        // You can optionally return something here if needed
    } catch (error) {
        console.error("Error:", error);
        throw error;
    } finally {
        client.release();
    }
}

async login(email, password) {
    const client = await con.connect();
    try {
        const queryText = 'SELECT * FROM public.login_user($1, $2)';
        const queryParams = [email, password];

        const { rows } = await client.query(queryText, queryParams);
        return rows[0];
    } catch (error) {
        console.error("Error:", error);
        throw error;
    } finally {
        client.release();
    }
  }
}