import { LogService } from '../services/log.service';

export class Movie {
    // private logger: LogService = new LogService();
    
    // private _imdbID: string;
    // private _title: string;
    // private _plot: string;
    // private _website: string;
    // private _rated: string;
    // private _seen: boolean;
    // private _poster: string;
    // private _userID: string;
    // private _year:number;
        
    public constructor(
        public imdbID?: string,
        public title?: string,
        public plot?: string,
        public website?: string,
        public rated?: string,
        public seen?: boolean,
        public poster?: string,
        public userID?: string,
        public year?:number
    ) { 
        // this.imdbID = imdbID;
        // this.title = title;
        // this.plot = plot;
        // this.website = website;
        // this.rated = rated;
        // this.seen = seen;
        // this.poster = poster;
        // this.userID = userID;
        // this.year = year;
    }

    // get imdbID():string{
    //     this.logger.debug("get imdbID: ", this._imdbID);
    //     return this._imdbID;
    // }

    // set imdbID(val){
    //     this._imdbID=val;
    //     this.logger.debug("set imdbID: ", this._imdbID);
    // }

    // get title():string{
    //     this.logger.debug("get title: ", this._title);
    //     return this._title;
    // }

    // set title(val){
    //     this._title=val;
    //     this.logger.debug("set title: ", this._title);
    // }

    // get plot():string{
    //     this.logger.debug("get plot: ", this._plot);
    //     return this._plot;
    // }

    // set plot(val){
    //     this._plot=val;
    //     this.logger.debug("set plot: ", this._plot);
    // }

    // get website():string{
    //     this.logger.debug("get website: ", this._website);
    //     return this._website;
    // }

    // set website(val){
    //     this._website=val;
    //     this.logger.debug("set website: ", this._website);
    // }
    
    // get rated():string{
    //     this.logger.debug("get rated: ", this._rated);
    //     return this._rated;
    // }

    // set rated(val){
    //     this._rated=val;
    //     this.logger.debug("set rated: ", this._rated);
    // }

    // get seen():boolean{
    //     this.logger.debug("get seen: ", this._seen);
    //     return this._seen;
    // }

    // set seen(val){
    //     this._seen=val;
    //     this.logger.debug("set seen: ", this._seen);
    // }

    // get poster():string{
    //     this.logger.debug("get poster: ", this._poster);
    //     return this._poster;
    // }

    // set poster(val){
    //     this._poster=val;
    //     this.logger.debug("set poster: ", this._poster);
    // }

    // get userID():string{
    //     this.logger.debug("get userID: ", this._userID);
    //     return this._userID;
    // }

    // set userID(val){
    //     this._userID=val;
    //     this.logger.debug("set userID: ", this._userID);
    // }

    // get year():number{
    //     this.logger.debug("get year: ", this._year);
    //     return this._year;
    // }

    // set year(val){
    //     this._year=val;
    //     this.logger.debug("set year: ", this._year);
    // }
}