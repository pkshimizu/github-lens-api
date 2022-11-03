import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import shortid from "shortid"

class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({
    nullable: false
  })
  createdAt: Date

  @UpdateDateColumn({
    nullable: false
  })
  updatedAt: Date

  @DeleteDateColumn({
    nullable: false
  })
  deletedAt: Date
}

class UidEntity extends BaseEntity {
  @Column({
    nullable: false
  })
  uid: string

  @BeforeInsert()
  generateUid() {
    this.uid = shortid.generate()
  }
}

@Entity()
export class UserEntity extends UidEntity {
  @Column({
    nullable: false
  })
  name: string

  @Column({
    nullable: false
  })
  email: string
}
