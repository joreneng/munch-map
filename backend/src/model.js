import con from "../index.js";


export class model {
    async getStudentsByGuardian(id) {
        const client = await con.connect();
        try {
          return new Promise((resolve, reject) => {
            client.query("SELECT * FROM get_students_by_guardian($1)", [id], (error, results) => {
              if (error) {
                console.error("Error:", error);
                reject(error);
              } else {
                console.log(results.rows);
                resolve(results.rows);
              }
            });
          });
        } catch (err) {
          console.log(err);
        } finally {
          client.release();
        }
      }
}