import {test, expect, request, APIRequestContext } from "@playwright/test"

export async function getBearerToken(): Promise<any> {
    const url = "https://login.salesforce.com/services/oauth2/token"
    const payload = new URLSearchParams({
        clientID: "3MVG9WVXk15qiz1J6CJCjggObyuHAjc_kV9.Ep5bdrXNTWxNZwA3u8pOIOhdtGRIcL9_nIhFbedSCkXzq2elS",
        clientSecret: "C1AD2B3466BB86766A01759A9E8F43686F379E4081E6E068E36A7C69FB8A947D",
        username: "dinakaran@company.sandbox",
        password: "Testing@123",
        grantType: "password"
    });

    (async () => {
        // Create a context that will issue http requests.
        const context = await request.newContext({
          baseURL: url,
        });
  

    try{
        const generatingToken = await context.post(payload.toString(),{
            headers:{
                "Content-Type": "application/x-www-form-urlencoded",
                "Connection": "keep-alive"
            },            
        })
        return generatingToken;
    }catch(error){
        console.log('Error appeared when getting the bearer token', error);
        throw error
    }
    })
}