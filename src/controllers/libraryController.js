import mongoose from 'mongoose';
import {LibrarySchema} from '../models/libraryModel';

const Library = mongoose.model('library_items',LibrarySchema);

export const addNewItem = (req,res) => {
    // let newItem = new Library(req.body);
    // console.log(req.body);
    // newItem.save((err,item) => {
    //     if(err) {
    //         res.send(err);
    //     }
    //     res.json(item)
    // });
    let newItem = new Library({
        itemName: req.body.itemName,
        itemType: req.body.itemType,
        quantity:req.body.quantity,
        loanPeriod:req.body.loanPeriod
    });
    // Library.findOneAndUpdate({itemName: req.params.itemName}, {$set: {itemName: req.body.itemName,itemType: req.body.itemType,quantity:req.body.quantity}}
    //   , {sort: {_id: -1},    upsert: true  }).exec()
    Library.findOne({"itemName":req.params.itemName})
    .then(result=>{
        console.log(result);
        if(result==null) {
            console.log("Need to save the items to the Database");
            newItem.save().then(result=> {
                console.log(result);
                res.status(200).json({'item':result});
            })
            .catch(error=>{
                res.status(500).json({'message':error});
            })
        }
        else {
            let book_id = result._id;
            
            console.log(`Need to update the items with id ${book_id}`);
            Library.updateOne({_id: book_id}, {$set: {itemName: req.body.itemName,itemType:req.body.itemType,quantity:req.body.quantity,loanPeriod:req.body.loanPeriod}})
            .then(result=>{
                res.status(200).json({'message':'Book already present','item':result});
            })
            .catch(error=>{
                res.status(500).json({"message":`Encountered error while updating ${book_id}`});
            })
            
        }
        
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
    

};

export const fetchItemById = (req,res) => {
    console.log(`Fetching the request by ID ${req.params.itemName}`);
    let id = req.params.itemName;
    Library.find({itemName:id}).exec().then(item=>{
        if(item.length==0) {
            console.log(item);
            res.status(404).json({item:'Please enter a valid item name'});
        }else {
            res.status(200).json({'item':item});
        }
        
    })
    .catch(err=>{
        console.log(err),
        res.status(500).json({error:err});
    });
};

export const fetchItemsByItemType = (req,res) => {
    console.log(`Fetching the request by ID ${req.params.itemType}`);
    let id = req.params.itemType;
    Library.find({itemType:id}).then(item=>{
        if(item.length==0) {
            console.log(item);
            res.status(404).json({item:'Entered item Type doesn\'t exist'});
        }else {
            console.log(`item fetched ${item}`);
           
            res.status(200).json({'item':item});
        }
        
    })
    .catch(err=>{
        console.log(err),
        res.status(500).json({error:err});
    });
};

export const deleteItemById = (req,res)=>{
    let itemName = req.params.itemName;
    console.log(`deleting item ${req.params.itemName}`);
    Library.findOneAndDelete({
        itemName:itemName
    }).exec().then(item=>{
        res.status(200).json({res: `Item ${itemName} deleted succesfully`});
    })
    .catch(err=>{
        console.log(err),
        res.status(500).json({res:'Unable to delete. Please check '});
    });
};
