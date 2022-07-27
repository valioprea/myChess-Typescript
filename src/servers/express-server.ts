import express, { Express } from "express";
import path from "path";


export class ExpressServer {

    private port: number;
    private app: Express;
    private path: string;

    constructor( port: number, path: string){
        this.path = path;
        this.port = port;
        this.app = express();
        this.route();
        this.configExpress();
    }

    public start(): any{
        return this.app.listen(this.port, () => {
            console.log("Server is serving on 3000, master!")
        });
    }

    private route() {
        this.app.get("/home", (req,res) => {
            res.render("homePage")
        })
        
        this.app.get("/play", (req,res) => {
            res.render("playPage")
        })
    }

    private configExpress() {
        // console.log(__dirname)
        this.app.use('/static', express.static(path.join(this.path, 'public')))
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(this.path, './views'));
    }
}