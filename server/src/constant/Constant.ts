export class constants {
    public static readonly MOVIE_BASE_URL = "http://www.omdbapi.com/";
    public static readonly MOVIE_URL = `${this.MOVIE_BASE_URL}?apikey=620daecb`;
    public static readonly MOVIE_HEADER = {
        "headers": {
            "Accept-Encoding": "application/json"
        },
    };

    public static readonly KEY_PREFIX = "mvid:";
}

