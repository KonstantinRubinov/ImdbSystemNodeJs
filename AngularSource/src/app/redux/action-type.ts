export enum ActionType{
    GetAllUsers,
    GetOneUser,
    AddUser,
    UserLogin,
    UserLogOut,
    UpdateUser,
    DeleteUser,
    
    LoginError,
    SignUpError,
    IsLoggedIn,
    NeedSignIn,
    
    GetImdbMovies,
    GetImdbMoviesError,
    GetImdbMovie,
    GetImdbMovieError,
    UpdateImdbMovie,
    UpdateImdbMovieError,




    
    GetFavoriteMovies,
    GetFavoriteMoviesError,
    GetFavoriteMovie,
    GetFavoriteMovieError,

    UpdateFavoriteMovie,
    UpdateFavoriteMovieError,

    DeleteFavoriteMovie,
    DeleteFavoriteMovieError,
    
    AddMovieToFavorite,
    AddMovieToFavoriteError,
    AddMovieFromFavorite,
    AddMovieFromFavoriteError,

    SetPlace,
    SetCompName
}