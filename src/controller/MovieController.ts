import { Get, JsonController, QueryParam } from "routing-controllers";
import { Inject, Service } from "typedi";

import { MovieService } from '../service/MovieService';


@JsonController()
@Service()
export class MovieController {

  @Inject()
  private movieService: MovieService;

  
  @Get('/movies')
  async getMovies(@QueryParam("keyword") keyword: string, @QueryParam("page") page: number) {
    return await this.movieService.getMovies(keyword, page);
  }
}