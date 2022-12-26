import { Service } from "typedi";
import axios from 'axios';

import { constants } from '../constant/Constant';
import {addCache, existsInCache, getFromCache} from '../cache/Cache';
@Service()
export class MovieService {

    async getMovies(keyword: string, page:number = 1): Promise<Array<object>> {
        console.log("DENEME");
        const key = constants.KEY_PREFIX.concat(keyword);
        
        if (existsInCache(key))
        {
            return getFromCache(key);
        } 
        else
        {
            const url = constants.MOVIE_URL.concat("&").concat(`s="${keyword}"`).concat("&").concat(`page=${page}`);
            
            const response = await axios.get(url, constants.MOVIE_HEADER);
            const data = response.data.Search;
            
            addCache(key, data);
            
            return data;
        }
    }
}