import { fetchAllItems} from '../controllers/libraryController';



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
       
                updateItemById(req,res);
       
            
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
            console.log('Saving the items');
            addNewItem(req,res);
       
        
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
