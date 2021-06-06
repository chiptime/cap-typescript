import { ODataRequest } from "../types/odata";
import { ApplicationService } from "../types/service";

console.log('hola');
module.exports = async function (this: ApplicationService) {
    const { Task } = this.entities;

    this.before('CREATE', Task, (req: ODataRequest) => {
        console.log('Desde TASK CREATE');
    });

}