import { DataTypes, Model } from 'sequelize';

export default class Member extends Model {
    static init(sequelize) {
        return super.init(
            {
                memberId: {
                    type: DataTypes.BIGINT,
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false
                },
                nickname: {
                    type: DataTypes.TEXT,
                    allowNull: false
                },
                password: {
                    type: DataTypes.TEXT,
                    allowNull: false
                }
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: "Member",
                tableName: "member",
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci'
            }
        );
    }

    static associate(db) {
        db.Member.hasMany(db.Post, { foreignKey: "memberId", sourceKey: "memberId", onDelete: 'CASCADE' });
    }

}