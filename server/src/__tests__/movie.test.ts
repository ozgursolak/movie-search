
const request = require("supertest");
const nock = require("nock");

import { server } from "../index";
import { constants } from "../constant/Constant";
import * as cacheModule from "../cache/Cache";

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
  const expectedResponse = [
    {
        "Title": "Test Love.",
        "Year": "2011",
        "imdbID": "tt1570728",
        "Type": "movie",
        "Poster": "test Poster"
    }
  ];

  let spyGetFromCache: any;

  beforeEach(() => {
    nock(constants.MOVIE_BASE_URL)
      .persist()
      .get("/")
      .query(true)
      .reply(200, { "Search": expectedResponse});

    spyGetFromCache = jest.spyOn(cacheModule, "getFromCache");
  });

  afterEach(() => {
    server.close();
    nock.cleanAll();
    jest.clearAllMocks();
    spyGetFromCache.mockRestore();
  });

  it("should return movies", async () => {
    
    const response = await request(server).get("/api/movies?keyword=love");
    const result = JSON.parse(response.text);

    expect(response.statusCode).toEqual(200);
    expect(result.movies[0]).toStrictEqual(expectedResponse[0]);
    expect(result.movies[1]).toStrictEqual(expectedResponse[0]);
    expect(result.is_success).toBe(true);
  });

  it("should return false for invalid keyword", async () => {
    const response = await request(server).get("/api/movies?keywor=test");
    const result = JSON.parse(response.text);
    const expectedResult = {
      "is_success": false,
      "message": "Invalid keyword type",
    };
   
    expect(result).toStrictEqual(expectedResult);
  });

  it("should return data from cache", async () => {
    await request(server).get("/api/movies?keyword=test");
    await request(server).get("/api/movies?keyword=test");

    expect(spyGetFromCache).toBeCalledTimes(1);
  });

  it("should not return data from cache", async () => {
    await request(server).get("/api/movies?keyword=test2");

    expect(spyGetFromCache).toBeCalledTimes(0);
  });
});


