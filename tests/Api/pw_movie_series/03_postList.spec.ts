import {test, expect} from '@playwright/test'


const baseURL_API = "https://movies-tmdb-mock.azurewebsites.net"
test.describe('filter the movie list.', () => {

    test('Create a new list', async ({ request }) => {
         
        let response =  await request.post(`${baseURL_API}/4/list`, {
            data:{
                name: 'GBU',
                description: 'The switch the place',
                public: false,
            },
        });
        await expect(response).toBeOK();
        const { id } = await response.json();
        expect(typeof id).toBe('string');
        expect(id).not.toHaveLength(0);
        console.log(JSON.stringify( await response.json())); // print the list id number as string

          // add items to it
        response = await request.post(`${baseURL_API}/4/list/${id}/items`, {
            data: {
                items: [
                {
                    media_type: 'movie',
                    media_id: 'tt5779228', 
                },
                {
                    media_type: 'movie',
                    media_id: 'tt18259086',
                },
            ],
        },
    });
    await expect(response).toBeOK();
/*     const responseJson1 = await response.json();
    console.log(await responseJson1); */

    response = await request.get(`${baseURL_API}/4/list/${id}`);
    await expect(response).toBeOK();
    const responseJson = await response.json();
    console.log(await responseJson);
    
    expect(await responseJson).toMatchObject(
        expect.objectContaining({
            id: expect.any(String),
            name: 'GBU',
            description: 'The switch the place',
            public: false,
            //created_by: { id: expect.any(String) }, // this object returned an empty value.
            movies: ['tt5779228', 'tt18259086'],
            page: 1,
            total_pages: 1,
            total_results: 2,
            results: [
              expect.objectContaining({ title: 'The Garfield Movie' }),
              expect.objectContaining({ title: 'Sonic the Hedgehog 3' }),
            ],
          }
        ),
    )

})

})
