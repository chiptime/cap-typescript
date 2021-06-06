import { ODataRequest } from "../../types/odata";
import { ApplicationService } from "../../types/service";

module.exports = async function (this: ApplicationService) {
    const { User } = this.entities;

    this.before('CREATE', User, (req: ODataRequest) => {
        console.log('Desde USER create');
    });

}