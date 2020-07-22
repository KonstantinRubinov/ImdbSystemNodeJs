import { User } from '../models/User';
import { Movie } from '../models/Movie';
import { LoginUser } from '../models/LoginUser';

export class Store{
    public user:User;
    public loginUser:LoginUser;
    public loginError:string;
    public signUpError:string;
    public isLoggedIn=false;

    public needSignIn=false;
    public socialLogged=false;
    
    public imdbMovies:Movie[]=[];
    public imdbMoviesError:string;
    public updateImdbMoviesError:string;

    public favoriteMovies:Movie[]=[];
    public favoriteMoviesError:string;
    public updatefavoriteMoviesError:string;
    public addfavoriteMoviesError:string;
    public deletefavoriteMoviesError:string;

    public movie:Movie=new Movie();
    public movieError:string;

    public place:string;

    public compName:string;
}