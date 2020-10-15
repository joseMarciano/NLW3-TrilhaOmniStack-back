import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602723029190 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name:'images',
        columns:[
          {
            name:'id',
            type:'integer',
            unsigned:true,
            isPrimary:true,
            isGenerated:true,
            generationStrategy:'increment'
          },
          {
            name:'path',
            type:'varchar'
          },
          {
            name:'orphanages_id',
            type:'integer'
          }
        ],
        foreignKeys:[
          {
            name: 'ImageOrphanage',
            columnNames: ['orphanages_id'],
            referencedTableName: 'orphanages', //qual a tabela que a entidade atual esta se relacionando
            referencedColumnNames:['id'], // qual a coluna usada na tabela de orfanatos para referenciar a foreign key
            onUpdate:'CASCADE',
            onDelete:'CASCADE',
          }
        ]
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images');
    }

}
