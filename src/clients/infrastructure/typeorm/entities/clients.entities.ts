import {
  ClientsModel,
  StatusPermission,
} from "@/clients/domain/models/clients.model";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("clients")
export class Client implements ClientsModel {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  username: string;

  @Column("text")
  password: string;

  @Column({ type: "enum", enum: StatusPermission, default: StatusPermission.CLIENT })
  roles: StatusPermission;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
