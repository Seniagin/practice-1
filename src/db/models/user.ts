import { Model, Column, Table, Is, AllowNull } from 'sequelize-typescript';

const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,16}$/

@Table
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column
  email!: string;

  @AllowNull(false)
  @Column
  password!: string;

  toJSON() {
    const attributes: any = { ...this.get() };
    delete attributes.password;
    return attributes;
  }
}
