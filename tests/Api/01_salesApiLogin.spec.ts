

import {test, expect} from "@playwright/test"
import { writeFileSync } from 'fs';


test.describe.configure({ mode: 'serial' });

    let accessToken:any;
    let instUrl:any;
    let id:any;

    test.only('Generate the access token Salesforce', async({request, page}) => {
        const url = "https://login.salesforce.com/services/oauth2/token"
        const clientID = "3MVG9WVXk15qiz1J6CJCjggObyuHAjc_kV9.Ep5bdrXNTWxNZwA3u8pOIOhdtGRIcL9_nIhFbedSCkXzq2elS"
        const clientSecret = "C1AD2B3466BB86766A01759A9E8F43686F379E4081E6E068E36A7C69FB8A947D"
        const username = "dinakaran@company.sandbox"
        const password = "Testing@123"
        const grantType = "password"


        const generatingToken = await request.post(url, {
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",
                "Connection": "keep-alive"
            },
            form:{
                "grant_type":grantType,
                "client_id":clientID,
                "client_secret":clientSecret,
                "username":username,
                "password":password
            }
        })


        const generatingTokenJson = await generatingToken.json();
        //console.log(generatingToken);

        accessToken = await generatingTokenJson.access_token;
        console.log(accessToken);

        instUrl = await generatingTokenJson.instance_url;
        console.log(instUrl);  

        const apiStatusCode = generatingToken.status();
        console.log("Post the status code: "+ apiStatusCode);
        expect(apiStatusCode, "expecting api status code to be 200").toBe(200);  

    })

    test("Create a new Lead", async({request})=>{
        const leadURL = `${instUrl}/services/data/v61.0/sobjects/Lead`;
        const lead = await request.post(leadURL, {
            headers:{
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            data:{
                "Salutation": "Mr",
                "LastName": "52TestUser",
                "Company": "TestCloud52"
            }
        })


        const lead_response = await lead.json();
        console.log(lead_response);

        id = await lead_response.id;
        console.log(id);
        expect(lead.ok()).toBeTruthy();
        expect(lead.status()).toBe(201);
   
    })

    test("Lead updated by patch", async({request})=>{
        const leadURL = `${instUrl}/services/data/v61.0/sobjects/Lead/${id}`;
        const lead = await request.patch(leadURL, 
            {
            headers:{
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            data:{
                "Title": "TestCloud"
            }
        })

        /* const responseBody =  await lead.text();
        console.log(responseBody); */
        expect(lead.status()).toBe(204);
        console.log(lead.statusText());
        
    })


    test("Login with Auth0", async({request, page})=>{
        const loginURL = `${instUrl}/aura?preloadActions`;
        const login = await request.post(loginURL, {
            headers:{
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            data:{
                "username": "dinakaran@company.sandbox",
                "password": "Testing"
            }
        })
        const login_response = await login.json();
        console.log(login_response);
        //expect(login_response.status()).toBe(200);
    })

    /* test.use({storageState: "../../AuthStorage/sales_login_storage.json"})
    test("login in salesforce for Lead user", async({page}) => {    
        await page.waitForTimeout(1000);
        //await page.goto(`${instUrl}/lightning/setup/SetupOneHome/home`);
        
        await console.log(`${instUrl}/lightning/setup/SetupOneHome/home`);
        await page.waitForTimeout(9000);
        await expect(page).toHaveURL(/.*salesforce/);
    }) */

