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
        
}