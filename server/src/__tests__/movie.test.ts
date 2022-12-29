import { server } from "../index";
import { constants } from "../constant/Constant";

const request = require("supertest");
const nock = require("nock");

describe("Health Check Test Suites", () => {
  
  afterEach(() => {
    server.close();
  });

  it("should returns status code 200 if app is up and running", async () => {
    const res = await request(server)
      .get("/health");

    expect(res.statusCode).toEqual(200);
  });
});

describe("Movies Test Suites", () => {
  const expectedResposnse = [
    {
        "Title": "Test Love.",
        "Year": "2011",
        "imdbID": "tt1570728",
        "Type": "movie",
        "Poster": "test Poster"
    },
  ];

  beforeEach(() => {
    nock(constants.MOVIE_URL)
      .get('/')
      .query(true)
      .reply(200, { "Search": expectedResposnse});
  });

  afterEach(() => {
    server.close();
    nock.cleanAll();
  });

  it("should return movies", async () => {
    
    const response = await request(server).get("/movies?keyword=love");
    const result = JSON.parse(response.text);

    expect(response.statusCode).toEqual(200);
    expect(result.movies).toStrictEqual(expectedResposnse);
    expect(result.is_success).toBe(true);
  });

  it("should return false for invalid keyword", async () => {
    const response = await request(server).get("/movies?keywor=test");
    const result = JSON.parse(response.text);
    const expectedResult = {
      "is_success": false,
      "message": "Invalid keyword type",
    };
   
    expect(result).toStrictEqual(expectedResult);
  });
});


