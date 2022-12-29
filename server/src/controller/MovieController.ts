import { Get, JsonController, QueryParam } from "routing-controllers";
import { Inject, Service } from "typedi";

import { MovieResponse } from "../model/response/MovieResponse";
import { MovieService } from '../service/MovieService';

@JsonController()
@Service()
export class MovieController {

  @Inject()
  private movieService: MovieService;

  
  @Get('/movies')
  async getMovies(@QueryParam("keyword") keyword: string, @QueryParam("page") page: number): Promise<MovieResponse>
  {
    let response: MovieResponse;

    if(!keyword || typeof keyword != "string")
    {
      response = new MovieResponse();
      
      response.is_success = false;
      response.message = "Invalid keyword type";
    }
    else
    {
      response = await this.movieService.getMovies(keyword.trim(), page);
    }
    
    return response;
  }
}