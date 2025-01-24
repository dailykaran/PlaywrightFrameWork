import { request, test, APIRequestContext } from "@playwright/test"

export async function getBearerToken(): Promise<any>{

    const context = await request.newContext({
        timeout: 30000,
    })

    try{
        let accessToken:any;
        let instUrl:any;
        let generatingTokenJson: any

        await test.step(`Try to get the bearer token`, async() => {
            
        const url = "https://login.salesforce.com/services/oauth2/token"
        const clientID = "3MVG9WVXk15qiz1J6CJCjggObyuHAjc_kV9.Ep5bdrXNTWxNZwA3u8pOIOhdtGRIcL9_nIhFbedSCkXzq2elS"
        const clientSecret = "C1AD2B3466BB86766A01759A9E8F43686F379E4081E6E068E36A7C69FB8A947D"
        const username = "dinakaran@company.sandbox"
        const password = "123@Testing"
        const grantType = "password"


        const generatingToken = await context.post(url, {
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

        generatingTokenJson = await generatingToken.json();

        accessToken = await generatingTokenJson.access_token;
        //console.log(accessToken);

        instUrl = await generatingTokenJson.instance_url;
        //console.log(instUrl); 
        
        })
        return generatingTokenJson
    }catch(error){
        console.log('Error appeared when getting the bearer token', error);
        throw error
    }
   
}
