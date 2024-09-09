import { DataTypes, Model } from 'sequelize';

export default class Request extends Model {
    static init(sequelize) {
        return super.init(
            {
                requestId: {
                    type: DataTypes.BIGINT,
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false
                },
                content: {
                    type: DataTypes.TEXT,
                    allowNull: false
                }
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: "Request",
                tableName: "reuqest",
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci'
            }
        );
    }

    static associate(db) {
        db.Request.belongsTo(db.Member, { foreignKey: "memberId", sourceKey: "memberId" });
    }

}