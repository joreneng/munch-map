import { model } from "./model.js";

export default class controller {
    constructor() {
        this.model = new model();
    }

    signup(firstname, lastname, email, password) {
      return this.model.signup(firstname, lastname, email, password)
          .then(() => {
              // Success, no need to return anything
          })
          .catch((err) => {
              console.error(err);
              throw err; // Rethrow the error to be caught in the route handler
          });
  }

  login(email, password) {
      return this.model.login(email, password)
          .then((response) => {
              return response;
          })
          .catch((err) => {
              console.error(err);
              throw err; // Rethrow the error to be caught in the route handler
          });
  }

  

}