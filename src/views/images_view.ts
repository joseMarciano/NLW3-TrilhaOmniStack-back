import Image from "../models/Image";

export default {
    render(image: Image){
        const _ = image;
        return {
            id: _.id,
            url: `http://localhost:3333/uploads/${_.path}` // passa o endereço da imagem para ser baixada pelo front
        };
    },
    renderMany(images: Image[]){
        return images.map(image => this.render(image));
    }
}