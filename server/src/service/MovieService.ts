import axios from 'axios';
import { Service } from "typedi";

import { constants } from '../constant/Constant';
import { addCache, existsInCache, getFromCache } from '../cache/Cache';
import { MovieResponse } from "../model/response/MovieResponse";

@Service()
export class MovieService {

    async getMovies(keyword: string, page:number = 1): Promise<MovieResponse> {
        const key = constants.KEY_PREFIX.concat(keyword);
        let movies: Array<object> = null;
        let errorMessage: string = null;
        if (existsInCache(key))
        {
            movies = getFromCache(key);
        } 
        else
        {
            const url = constants.MOVIE_URL.concat("&").concat(`s="${keyword}"`).concat("&").concat(`page=${page}`);
            try
            {
                const response = await axios.get(url, constants.MOVIE_HEADER);
                movies = response.data.Search || [];
                
                addCache(key, movies);
            }
            catch(error)
            {
                console.info(`Error in getMovies ${JSON.stringify(error)}`);
                errorMessage = error.message;
            }

            return this.serializeResponseForClient(movies, errorMessage);
        }
    }

    serializeResponseForClient(movies: Array<object>, errorMessage: string): MovieResponse
    {
        const response = new MovieResponse();

        if(errorMessage != null)
        {
            response.is_success = false;
            response.message = errorMessage;
        }
        else
        {
            response.is_success = true;
            response.movies = movies;
        }
        

        return response;
    }
}