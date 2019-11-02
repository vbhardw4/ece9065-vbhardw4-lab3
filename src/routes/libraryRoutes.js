import { fetchAllItems, addNewItem, fetchItemById, deleteItemById, updateItemById, fetchItemsByItemType } from '../controllers/libraryController';
import Joi from 'joi';


export const routes = (app) => {

    //To get list of all the availbale items in the DB
    app.route('/items')
    .get((req,res,next)=> {
        //middlerware
        console.log(`Request from :${req.originalUrl}`);
        console.log(`Request type :${req.method}`);     
        next();
    },(req,res) => {
        console.log('Showing the items');
        fetchAllItems(req,res);
       // pollForNewItems(req,res);
    })
        
    app.route('/item/:itemName')

    .get((req,res,next)=> {
        //middlerware
        console.log(`Request parameter got in the GET request is ${req.params.itemName}`);
        console.log(`Request from :${req.originalUrl}`);
        console.log(`Request type :${req.method}`);
        next();
    },(req,res) => {
        console.log('Fetching the particular item id');
        fetchItemById(req,res);
    })

    .post((req,res,next)=> {
        //middlerware
        // console.log("joiValidationResults are : "+joiValidationResults);
        console.log(`Request parameter got in the POST request is ${req.params.itemName}`);
        console.log(`Request from :${req.originalUrl}`);
        console.log(`Request type :${req.method}`);
        // password must be at least 5 chars long

        next();
    },(req,res) => {
        let val= null;
        
        const joiSchema = Joi.object().keys({
            'itemName' : Joi.string().trim().required(),
            'itemType' : Joi.string().trim().required(),
            'quantity' : Joi.number().integer().min(1),
            'loanPeriod' : Joi.number().integer().min(1)
        });
        Joi.validate(req.body,joiSchema,(err,results)=>{
            if(err) {
                val=err;
                console.log('Inside err');
                console.log(err);
        
            }
            else {
                console.log(`Showing JOi results ${results}`);
                console.log(results);
            }
        });
            if(val) {
                console.log('Validation results has error'+val);
                res.status(500).send({'error':val});
            }
            else{
                console.log('validation results are empty');
                console.log('Updating byid calling');
                updateItemById(req,res);
            }
            
        //}
    })

    .put((req,res,next)=> {
        //middlerware
        console.log(`Request parameter got in the PUT request is ${req.params.itemName}`);
        //console.log(req);
        console.log(`Request from :${req.originalUrl}`);
        console.log(`Request type :${req.method}`);
        
        next();
    },(req,res) => {
        let val= null;
        const joiSchema = Joi.object().keys({
            'itemName' : Joi.string().trim().required(),
            'itemType' : Joi.string().trim().required(),
            'quantity' : Joi.number().integer().min(1),
            'loanPeriod' : Joi.number().integer().min(1)
        });
        Joi.validate(req.body,joiSchema,(err,results)=>{
            if(err) {
                val=err;
                console.log('Inside err');
                console.log(err);
        
            }
            else {
                console.log(`Showing JOi results ${results}`);
                console.log(results);
            }
        });
        if(val !==null) { 
            console.log('Validation results has error'+`${val}`);
            res.status(500).send({'error':val});
        }
        else {
            console.log('Saving the items');
            addNewItem(req,res);
        }
        
    })

    .delete((req,res,next)=> {
        //middlerware
        console.log(`Request parameter got in the DELETE request is ${req.params.itemName}`);
        console.log(`Request from :${req.originalUrl}`);
        console.log(`Request type :${req.method}`);
        
        next();
    },(req,res) => {
        console.log('Saving the items');
        deleteItemById(req,res);
    })

    app.route('/item/itemType/:itemType')
    .get((req,res,next)=> {
        //middlerware
        console.log(`Request parameter got in the GET request for fetching particular itemType elements is ${req.params.itemType}`);
        console.log(`Request from :${req.originalUrl}`);
        console.log(`Request type :${req.method}`);
        next();
    },(req,res) => {
        console.log('Fetching the particular item id');
        fetchItemsByItemType(req,res);
    })
}