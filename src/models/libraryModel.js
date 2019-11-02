import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const LibrarySchema = new Schema({
   itemName : {
        type: String,
        required: 'Enter the book name',
        min:3
   },
   itemType :{
        type : String,
        required: 'Enter the book Type',
        min:3
   },
   loanPeriod : {
        type: Number,
        default: 30
   },
   quantity : {
        type: Number,
        // required: 'Please enter the valid quantity of the items',
        min:1,
        default:1
   },
   created_date:{
    type: Date,
    default: Date.now
   }

});
