export const environment = {
  production: true,
  hasTranslations:false,
  translationLanguage: "English",
  core:true,
  getMovieByTitle: ''
};

export const baseUrl="http://localhost:49270/";
export const mainUrl=baseUrl + "api/";
export const moviesUrl = mainUrl + "movies/";
export const usersUrl = mainUrl+"users/";
export const loginUrl=usersUrl+"check/";

export const imdbTitle=moviesUrl+"imdbTitle/";
export const imdbWord=moviesUrl+"imdbWord/";
export const imdbId=moviesUrl+"imdbId/";

export const favoriteTitle=moviesUrl+"favoriteTitle/";
export const favoriteWord=moviesUrl+"favoriteWord/";
export const favoriteId=moviesUrl+"favoriteId/";







export const apiKey="d474551d";
export const example="http://www.omdbapi.com/?i=tt3896198&apikey=d474551d";