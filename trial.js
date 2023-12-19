const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const someSchema = Schema({
  name: String,
  roll: { type: Number, required: true },
  age: { type: Number, min: 20, max: 30, required: true },
  joined: { type: Date, Default: Date.now() },
});
const someModel = mongoose.model("someModel", someSchema);
mongoose.set("strictQuery", false);
const mongodb = "mongodb://127.0.0.1/mydb";

async function main() {
    await mongoose.connect(mongodb);
    const instance = new someModel({
        name: "Sawrna Islam",
        roll: 1214,
        age: 23,
    });
    await instance.save();

    console.log(instance.name);
    instance.name = "Swarna Islam";
    await instance.save();

    await someModel.create({ name: "lala", age: 20, roll: 1280 });

    const students = await someModel
        .find(
        {
            name: "Swarna Islam",
        },
        "name age"
        )
        .exec();
    
}

main().catch((err) => {
  console.log(err);
});
