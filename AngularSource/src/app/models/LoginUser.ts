import { LogService } from '../services/log.service';

export class LoginUser {
    // private logger: LogService = new LogService();

    // private _userNickName: string;
    // private _userPassword: string;
    // private _userImdbPass: string;
    // private _userPicture: string;

    public constructor(
        public userNickName: string="",
        public userPassword: string="",
        public userImdbPass: string="",
        public userPicture: string=""
    ) {
        // this.userNickName = userNickName;
        // this.userPassword = userPassword;
        // this.userImdbPass = userImdbPass;
        // this.userPicture = userPicture;
     }

    // get userNickName():string{
    //     this.logger.debug("get userNickName: ", this._userNickName);
    //     return this._userNickName;
    // }

    // set userNickName(val){
    //     this._userNickName=val;
    //     this.logger.debug("set userNickName: ", this._userNickName);
    // }

    // get userPassword():string{
    //     this.logger.debug("get userPassword: ", this._userPassword);
    //     return this._userPassword;
    // }

    // set userPassword(val){
    //     this._userPassword=val;
    //     this.logger.debug("set userPassword: ", this._userPassword);
    // }

    // get userImdbPass():string{
    //     this.logger.debug("get userImdbPass: ", this._userImdbPass);
    //     return this._userImdbPass;
    // }

    // set userImdbPass(val){
    //     this._userImdbPass=val;
    //     this.logger.debug("set userImdbPass: ", this._userImdbPass);
    // }

    // get userPicture():string{
    //     this.logger.debug("get userPicture: ", this._userPicture);
    //     return this._userPicture;
    // }

    // set userPicture(val){
    //     this._userPicture=val;
    //     this.logger.debug("set userPicture: ", this._userPicture);
    // }
}