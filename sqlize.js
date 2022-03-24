
const data = require("./data.json")

const { Sequelize, DataTypes, Model } = require('sequelize');
const { ListFormat } = require("typescript");


const sequelize = new Sequelize('postgres://postgres:123456@0.0.0.0:5432/disneyDB') // Example for postgres


const queryInterface = sequelize.getQueryInterface();

async function initTables() {
    async function initTable(properties, name) {
        console.log("Creating Table ", name);
        await queryInterface.createTable(name, properties)

    }
    async function insertData(dataArr, model) {
        console.log("Len:", dataArr.length);
        let promises = []
        for (const elem of dataArr) {
            promises.push(model.findOrCreate(elem))
        }

        


        await Promise.all(promises)
        


    }
    const charProperties = {
        ID: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true

        },
        name: {
            type: DataTypes.STRING(200)
        },
        image: {
            type: DataTypes.STRING(3000)

        },
        age: {
            type: DataTypes.INTEGER.UNSIGNED
        },
        weitgh: {
            type: DataTypes.DOUBLE
        },

        history: {
            type: DataTypes.TEXT
        },

    }

    const genProperties = {

        ID: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(200)
        },
        image: {
            type: DataTypes.STRING(3000)
        },

    }
    const movProperties = {

        ID: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING(200)
        },
        image: {
            type: DataTypes.STRING(3000)
        },
        creation_date: {
            type: DataTypes.DATE
        },
        rating: {
            type: DataTypes.FLOAT,
            validate: {
                min: 0.0,
                max: 5.0,
            }
        },

    }

    const tableprops = {
        sequelize, freezeTableName: true,
    }
    const Character = sequelize.define("Character", charProperties, tableprops)
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    console.log(Character === sequelize.models.Character);
    const Genre = sequelize.define("Genre", genProperties, tableprops)
    const Movies_Series = sequelize.define("Movies_Series", movProperties, tableprops)



    //Movies_Series.belongsToMany(Genre ,{through:'Movie_Genre'})
    //Genre.belongsToMany(Movies_Series ,{through:'Movie_Genre'})

    Character.belongsToMany(Movies_Series, { through: 'Character_Movies' })
    Movies_Series.belongsToMany(Character, { through: 'Character_Movies' })

    //Character.belongsToMany(Character ,{through:'Associated_Characters'})


    await sequelize.sync({ force: true });

    insertData(data.characterArr, Character)
    insertData(data.genreArr, Genre)
    insertData(data.movieArr, Movies_Series)

    const result = await Character.findOne({
        where: { name: 'Simba' }
    });
    console.log(result);

}




initTables()
