import { Get, JsonController, QueryParam, Res, HttpCode } from "routing-controllers";
import { Inject, Service } from "typedi";
import { StatusCode } from "status-code-enum";

import { MovieResponse } from "../model/response/MovieResponse";
import { MovieService } from '../service/MovieService';

@JsonController()
@Service()
export class MovieController {

  @Inject()
  private movieService: MovieService;

  
  @Get('/movies')
  async getMovies(@QueryParam("keyword") keyword: string, @Res() response: any): Promise<MovieResponse>
  {
    let result: MovieResponse;

    if(!keyword || typeof keyword != "string")
    {
      result = new MovieResponse();
      
      result.is_success = false;
      result.message = "Invalid keyword type";

      response.status(StatusCode.ClientErrorBadRequest);
    }
    else
    {
      result = await this.movieService.getMovies(keyword.trim());

      if(!result.is_success)
      {
        response.status(StatusCode.ServerErrorInternal);
      }

      response.status(StatusCode.SuccessOK);
    }

    return response.send(result);
  }
}