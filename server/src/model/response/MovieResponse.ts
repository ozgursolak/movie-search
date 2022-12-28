import { IsArray, IsBoolean, IsNumber, IsString } from "class-validator";

export class MovieResponse {
    
    @IsBoolean()
    is_success: boolean;
    
    @IsString()
    message: string;

    @IsArray()
    movies: Array<object>;
}