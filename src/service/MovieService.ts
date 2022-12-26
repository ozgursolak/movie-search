import { Service } from "typedi";
import axios from 'axios';

import { Constants } from '../constant/Constant';

@Service()
export class MovieService {

    async getMovies(keyword: string, page:number = 1): Promise<boolean> {
        console.log("DENEME");

        const url = Constants.MOVIE_URL.concat("&").concat(`s="${keyword}"`).concat("&").concat(`page=${page}`);
        console.log(url);
        const response = await axios.get(url, Constants.MOVIE_HEADER);
        
        return response.data.Search.length;
    }
}