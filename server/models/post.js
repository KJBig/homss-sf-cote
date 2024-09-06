import { DataTypes, Model } from 'sequelize';

export default class Post extends Model {
    static init(sequelize) {
        return super.init(
            {
                postId: {
                    type: DataTypes.BIGINT,
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false
                },
                title: {
                    type: DataTypes.STRING(255),
                    allowNull: false
                },
                imageUrl: {
                    type: DataTypes.TEXT,
                    allowNull: false
                },
                problemUrl: {
                    type: DataTypes.TEXT,
                    allowNull: false
                }
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: "Post",
                tableName: "post",
                paranoid: false,
                charset: 'utf8',
                collate: 'utf8_general_ci'
            }
        );
    }

    static associate(db) {
        db.Post.belongsTo(db.Member, { foreignKey: "memberId", sourceKey: "memberId" });
    }

}