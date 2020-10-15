import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
import Image from './Image';
@Entity('orphanages')
export default class Orphanage{
   
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;
    
    @Column()
    open_on_weekends: boolean;

                    //Tipo do retorno     //dado uma imagem recebida, qual o campo dessa imagem que retorna o relacionamento inverso(mappedBy do java)
    @OneToMany(() =>   Image,           image => image.orphanage, {/* relacionamento bidirecional com images */
        cascade: ['insert','update'] // operação em cascata
    })
    @JoinColumn({name: 'orphanages_id'})
    images: Image[];
}