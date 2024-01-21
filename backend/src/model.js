import con from "../index.js";


export class model {

    async delete_food(food_id) {

        const client = await con.connect();
        try {
          const queryText = 'SELECT * FROM public.delete_food($1)';
          const queryParams = [food_id];
          await client.query(queryText, queryParams);
        }
        catch (error) {
          console.error("Error:", error);
          throw error;
        }
        finally {
          client.release();
        }
      }
    async delete_order(order_id) {
      const client = await con.connect();
      try {
        const queryText = 'SELECT * FROM public.delete_order($1)';
        const queryParams = [order_id];

        await client.query(queryText, queryParams);
        // You can optionally return something here if needed
      }
      catch (error) {
        console.error("Error:", error);
        throw error;
      }
      finally {
        client.release();
      }
    }


    async complete_order(order_id) {
      const client = await con.connect();
      try {
        const queryText = 'SELECT * FROM public.complete_order($1)';
        const queryParams = [order_id];
  
        await client.query(queryText, queryParams);
        // You can optionally return something here if needed
      }
      catch (error) {
        console.error("Error:", error);
        throw error;
      }
      finally {
        client.release();
      }
    }

async place_order(dish_id, receiver_id) {
    const client = await con.connect();
    try {
        const queryText = 'SELECT * FROM public.place_order($1, $2)';
        const queryParams = [dish_id, receiver_id];

        await client.query(queryText, queryParams);
        // You can optionally return something here if needed
    } catch (error) {
        console.error("Error:", error);
        throw error;
    } finally {
        client.release();
    }
}

  async insert_food(creator_id, address, type, expiry, diet, description, image, name) {
    const client = await con.connect();
    try {
        const queryText = 'SELECT * FROM public.insert_food($1, $2, $3, $4, $5, $6, $7, $8)';
        const queryParams = [creator_id, address, type, expiry, diet, description, image, name];

        await client.query(queryText, queryParams);
        // You can optionally return something here if needed
    } catch (error) {
        console.error("Error:", error);
        throw error;
    } finally {
        client.release();
    }
  }
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

async get_available_items () {
    const client = await con.connect();
    try {
        const queryText = 'SELECT * FROM public.get_available_food()';
        const queryParams = [];

        const { rows } = await client.query(queryText, queryParams);
        return rows;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    } finally {
        client.release();
    }
}


async get_in_progress_orders_by_creator(creator_id) {
    const client = await con.connect();
    try {
        const queryText = 'SELECT * FROM public.get_in_progress_orders_by_creator($1)';
        const queryParams = [creator_id];

        const { rows } = await client.query(queryText, queryParams);
        return rows;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    } finally {
        client.release();
    }
}
async get_completed_orders_by_receiver(receiver_id) {
    const client = await con.connect();
    try {
      const queryText = 'SELECT * FROM public.get_orders_by_receiver($1, $2)';
      const queryParams = [receiver_id, true];

        const { rows } = await client.query(queryText, queryParams);
        return rows;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    } finally {
        client.release();
    }
}

async get_in_progress_orders_by_receiver(receiver_id) {
    const client = await con.connect();
    try {
        const queryText = 'SELECT * FROM public.get_orders_by_receiver($1, $2)';
        const queryParams = [receiver_id, false];

        const { rows } = await client.query(queryText, queryParams);
        return rows;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    } finally {
        client.release();
    }
}

async get_items_by_creator(creator_id) {
    const client = await con.connect();
    try {
        const queryText = 'SELECT * FROM public.get_food_categories_for_user($1)';
        const queryParams = [creator_id];

        const { rows } = await client.query(queryText, queryParams);
        return rows[0].get_food_categories_for_user;
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