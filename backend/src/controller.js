import { model } from "./model.js";

export default class controller {
    constructor() {
        this.model = new model();
    }

    getStudentsByGuardian(id) {
        return this.model.getStudentsByGuardian(id).then((response) => {
          return response;
        }
        ).catch((err) => {
          console.log(err);
          // return err;
        });
      }


}