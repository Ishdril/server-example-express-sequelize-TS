import {
  Association,
  HasManyAddAssociationMixin,
  HasManyCreateAssociationMixin,
  Model,
  Optional,
  DataTypes,
} from 'sequelize';
import { Message } from './Message';
import { sequelize } from './index';

interface IUserAttributes {
  id: number;
  first_name: string;
  last_name: string;
}

interface IUserCreationAttributes extends Optional<IUserAttributes, 'id'> {}

export class User
  extends Model<IUserAttributes, IUserCreationAttributes>
  implements IUserAttributes
{
  public id!: number;
  public first_name!: string;
  public last_name!: string;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  public addMessage!: HasManyAddAssociationMixin<Message, number>;
  public createMessage!: HasManyCreateAssociationMixin<Message>;

  public readonly messages?: Message[];

  public static associations: {
    messages: Association<User, Message>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    last_name: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
  },
  {
    tableName: 'users',
    sequelize,
  }
);

User.hasMany(Message, {
  sourceKey: 'id',
  foreignKey: 'ownerId',
  as: 'messages',
});
