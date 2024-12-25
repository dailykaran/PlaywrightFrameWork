import { test, expect} from "@playwright/test";
import { getBearerToken } from "../../pages/api/01_get_bearer_tokens";
import { readJsonfile } from '../../dataUtilities/jsonUtils'
import { httpPost, httpPatch, httpDelete, httpGet} from "../../pages/api/02_api_actions";

test.describe.configure({ mode: 'serial' });
test.describe("API testing with playwright request", async()=>{
        let token: any
        let instUrl:any;
        let id:any;
        let jsonData: any;
        
        test.beforeAll(`Generating bearer token`, async () => {
                const responseJson = await getBearerToken();   
                token = responseJson.access_token;
                instUrl = responseJson.instance_url;

                //accessing the api data from json file
                jsonData = await readJsonfile('./data/apidatas.json');
        })

        test(`Create a new Lead`, async ()=>{
                const leadURL = `${instUrl}/${jsonData.URL}/Lead`;
                console.log("leadURL:  "+ leadURL);
                
                const lead = await httpPost(`${leadURL}`,
                        {
                               Salutation: jsonData.Salutation,
                               LastName: jsonData.LastName,
                               Company: jsonData.Company,
                        },
                        {
                                "Authorization": `Bearer ${token}`,
                                "Content-Type": "application/json"
                        }
                )
                const lead_response = await lead.json();
                id = await lead_response.id;
                //console.log("lead " + JSON.stringify(lead_response));
                console.log("response " + JSON.stringify(lead_response));
                console.log("id: "+ JSON.stringify(id));
                expect(lead.ok()).toBeTruthy();
                expect(lead.status()).toBe(201);
        })

        test(`lead updated by patch`, async()=> {
                const leadURL = `${instUrl}/${jsonData.URL}/Lead/${id}`;
                const leadPatch = await httpPatch(`${leadURL}`,
                       {
                                Title: jsonData.Title,
                       },
                       {
                               "Authorization": `Bearer ${token}`,
                               "Content-Type": "application/json"
                        },
                )
                const responseBody =  await leadPatch;
                //console.log(JSON.stringify(responseBody));
                expect(leadPatch.status()).toBe(204);
                console.log("leadPatch status" + leadPatch.statusText());                        
        })

        test(`Get details from a lead by GET`, async()=> {
                const leadURL = `${instUrl}/${jsonData.URL}/Lead/${id}`;
                const leadGet = await httpGet(`${leadURL}`, 
                        {
                                "Authorization": `Bearer ${token}`,
                                "Content-Type": "application/json"
                        },
                );
                const responseBody =  await leadGet;
                //console.log(JSON.stringify(responseBody));
                expect(leadGet.status()).toBe(200);
                console.log("leadGet status" + leadGet.statusText());                        
        });

        test('api request to delete record', async({request})=>{
                const leadURL = `${instUrl}/${jsonData.URL}/Lead/${id}`;
                const leadDelete = await httpDelete(`${leadURL}`,
                        {
                                "Authorization": `Bearer ${token}`,
                                "Content-Type": "application/json"
                        },
                )
                //console.log(leadDelete);
                console.log(leadDelete.status());
                expect(leadDelete.status()).toBe(204);
                expect(leadDelete.statusText()).toBe('No Content');
        })
})
