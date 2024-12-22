import {test, expect, request, APIRequestContext } from "@playwright/test"

let context: APIRequestContext;
let url = "https://login.salesforce.com/services/oauth2/token"

test.beforeAll(async () => {
    context = await request.newContext({
        //baseURL: url,
        timeout: 30000,
        ignoreHTTPSErrors: true,
        extraHTTPHeaders: {
        //Accept: 'application/json',
        //'Content-Type': 'application/json',
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  });

export async function getBearerToken(): Promise<any> {
   
/*     const payload = {
        "clientID": "3MVG9WVXk15qiz1J6CJCjggObyuHAjc_kV9.Ep5bdrXNTWxNZwA3u8pOIOhdtGRIcL9_nIhFbedSCkXzq2elS",
        "clientSecret": "C1AD2B3466BB86766A01759A9E8F43686F379E4081E6E068E36A7C69FB8A947D",
        "username": "dinakaran@company.sandbox",
        "password": "Testing@123",
        "grantType": "password"
    }; */


    try{
        const generatingToken = await context.post(url, {data: {
            "clientID": "3MVG9WVXk15qiz1J6CJCjggObyuHAjc_kV9.Ep5bdrXNTWxNZwA3u8pOIOhdtGRIcL9_nIhFbedSCkXzq2elS",
            "clientSecret": "C1AD2B3466BB86766A01759A9E8F43686F379E4081E6E068E36A7C69FB8A947D",
            "username": "dinakaran@company.sandbox",
            "password": "Testing@123",
            "grantType": "password"
        }, headers:{
            "Content-Type": "application/x-www-form-urlencoded",
            //'Content-Type': 'application/json',
            //"Connection": "keep-alive"
        }}
    )
        const generatingTokenJson = await generatingToken.json();
        console.log("Inside function " + JSON.stringify(generatingToken));           
        console.log("Inside function " + JSON.stringify(generatingTokenJson))
        /* const accessToken = await generatingTokenJson;
        console.log("Inside function " + accessToken);  
        return accessToken; */
        
    }catch(error){
        console.log('Error appeared when getting the bearer token', error);
        throw error
    }

}

