//A view é o jeito que eu retorno o objeto de acordo com a necessidade do front, é a mesma coisa que um DTO
import Orphanage from "../models/Orphanage";
import imagesView from "./images_view";


export default {
    render(orphanage: Orphanage){
        const _ = orphanage;
        return {
            id: _.id,
            name: _.name,
            latitude: _.latitude,
            longitude: _.longitude,
            about: _.about,
            instructions: _.instructions,
            opening_hours: _.opening_hours,
            open_on_weekends: _.open_on_weekends,
            images: imagesView.renderMany(_.images)
        };
    },
    renderMany(orphanages: Orphanage[]){
        return orphanages.map(orphanage => this.render(orphanage));
    }
}