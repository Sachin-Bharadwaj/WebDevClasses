import mongoose, { model, mongo, Schema } from "mongoose";

// create user schema and use models

const userSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true}
})

const contentSchema = new Schema({
    title: {type: String, required: true},
    link: {type: String, required: true},
    type: {type: String},
    userid: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}

});

const linksSchema = new Schema({
    hash: {type: String, required: true},
    userid: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true},
});

export const userModel = model("User", userSchema);
export const contentModel = model("Content", contentSchema);
export const linksModel = model("Links", linksSchema);