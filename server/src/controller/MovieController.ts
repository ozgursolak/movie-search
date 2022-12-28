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
    const response = await this.movieService.getMovies(keyword, page);
    return response;
  }
}