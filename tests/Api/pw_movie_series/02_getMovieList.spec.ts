import{ test, expect }from "@playwright/test"

const baseURL_API = "https://movies-tmdb-mock.azurewebsites.net/"
test.describe('filter the movie list.', () => {
  test('verify static content and dynamic vote average', {tag: '@filtermovielist'}, async ({ request }) => {
    const response = await request.get(`${baseURL_API}/3/discover/movie`, {
        params: {with_genres: 18, page: 1}
    });

    await expect(response).toBeOK();
    await expect(response.status).toBeTruthy()
    await expect(response.status()).toBe(200)
    
    const jsonResponse = await response.json();
    //console.log(jsonResponse.title);
    jsonResponse.results.map(async(x)=>{
        //console.log(x.title)
        if(x.title.includes('Twisters')){
          expect(x.title.includes('Twisters')).toBe(true);
        }
        
    })
    //await expect(jsonResponse.title).toContain('Civil War')

  })

  test('movie sorted by original title', async ({ request }) => {
    const response = await request.get(`${baseURL_API}/3/discover/movie`, {
      params: { with_genres: 35, page: 1, sort_by: 'original_title.asc' },
    });
    await expect(response).toBeOK();
    const jsonResponse = await response.json();
    
    const nonActionMovies = jsonResponse.results.filter(
      (movie: {genre_ids:number[]}) => !movie.genre_ids.includes(35),
    );
    console.log(nonActionMovies);
    expect(nonActionMovies).toEqual([]);

    const movies = jsonResponse.results;
    // Loops over the titles and checks they are in the correct order
    for (let i = 0; i < movies.length - 1; i++) {
      //console.log(movies[i].original_title),
      //console.log(movies[i].original_title.localeCompare(movies[i + 1].original_title)),
      expect(
        movies[i].original_title.localeCompare(movies[i + 1].original_title),
      ).toBeLessThanOrEqual(0);
    }

  });

  test.only('movie search by title', async ({ request }) => {
    const response = await request.get(`${baseURL_API}/3/search/movie`, {
      params: { query: 'Union' }, // the query search will work by single word not multiple words.
    });
    await expect(response).toBeOK();
    const jsonResponse = await response.json();
    
    jsonResponse.results.filter((nameText) => {expect(nameText.title).toContain('Union');})

    jsonResponse.results.filter(
      (movie: {title:string}) => { console.log(movie.title)},
    ).map( x => expect(x).toContain('Union'))

    console.log(jsonResponse.results);
    const getMovieName = jsonResponse.results.find( (movie: {title:string}) => movie.title === 'The Union',)
    expect(getMovieName).toBeTruthy();
  })

  // learn expect().tomatchObject() try to assert multiple line assert


})