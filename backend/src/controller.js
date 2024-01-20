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

  getAvailableItems() {
      return this.model.get_available_items()
          .then((response) => {
              return response;
          })
          .catch((err) => {
              console.error(err);
              throw err; // Rethrow the error to be caught in the route handler
          });
  }

  getInProgressOrdersByCreator(creator_id) {
      return this.model.get_in_progress_orders_by_creator(creator_id)
          .then((response) => {
              return response;
          })
          .catch((err) => {
              console.error(err);
              throw err; // Rethrow the error to be caught in the route handler
          });
  }

  getCompletedOrdersByReceiver(receiver_id) {
      return this.model.get_completed_orders_by_receiver(receiver_id)
          .then((response) => {
              return response;
          })
          .catch((err) => {
              console.error(err);
              throw err; // Rethrow the error to be caught in the route handler
          });
  }

  getInProgressOrdersByReceiver(receiver_id) {
      return this.model.get_in_progress_orders_by_receiver(receiver_id)
          .then((response) => {
              return response;
          })
          .catch((err) => {
              console.error(err);
              throw err; // Rethrow the error to be caught in the route handler
          });
  }

  getCategoriesByCreator(creator_id) {
      return this.model.get_items_by_creator(creator_id)
          .then((response) => {
              return response;
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