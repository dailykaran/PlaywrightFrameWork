import { test, expect} from "@playwright/test";
import { getBearerToken } from "../../pages/api/01_get_bearer_tokens";
import { httpPost, httpPatch} from "../../pages/api/02_api_actions";

test.describe("API testing with playwright request", async()=>{
        let token: any
        let instUrl:any;
        let id:any;
        
        test.beforeAll(`Generating bearer token`, async () => {
                const responseJson = await getBearerToken();   
                token = responseJson.access_token;
                instUrl = responseJson.instance_url;
        })

        test(`Create a new Lead`, async ()=>{
                const leadURL = `${instUrl}/services/data/v61.0/sobjects/Lead`;

                const lead = await httpPost(leadURL, {
                        data:{
                               "Salutation": "Mr",
                               "LastName": "52TestUser",
                               "Company": "TestCloud52"
                        },
                        headers:{
                                "Authorization": `Bearer ${token}`,
                                "Content-Type": "application/json"
                        }
                })
                const lead_response = await lead.json();
                id = await lead_response.id;
                expect(lead_response.status()).toBe(201);

        })

})