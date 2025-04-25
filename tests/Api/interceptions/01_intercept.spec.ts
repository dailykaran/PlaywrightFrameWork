
import test from '@playwright/test'


test(`Monitor the api salesforce`, async ({page})=> {

    await page.goto("https://login.salesforce.com");

    page.on('request',request=>{
        console.log(`<<<--Request-->`,request.url(),request.postData())
      })
      
      page.on('response',response=>{
        console.log(`<<<--Response-->`,response.request().url(),response.status())
      })
    
      await page.fill("#username","dinakaran@company.sandbox")
      await page.fill("#password","123@Testing")
      await page.click("#Login")
      await page.click(".slds-icon-waffle")
})

test(`Abort the api from loading`,async({page})=>{
    await page.route("**/*.{svg,png,jpg}", route=>route.abort())
    await page.goto("https://demoqa.com/")
    //await page.waitForTimeout(9000);
})

test(`Modify the request`,async({page})=>{

    await page.goto("https://login.salesforce.com")    

    await page.route(`**/aura?preloadActions`,async(route,request)=>{
        console.log(await request.allHeaders())
        delete Headers['date']
        
        await route.continue();
        await route.continue({
            headers:{
                   "content-length":""
               },
                postData:{
                    "aura.token":""
                }
        })
        console.log(request.postDataJSON())
        
    })
    
    await page.fill("#username","dinakaran@company.sandbox")
    await page.fill("#password","Test@123")
    await page.click("#Login")
    await page.click(".slds-icon-waffle")
    await page.waitForTimeout(9000);

})


test.only(`Modify the response`,async({page})=>{

    await page.goto("https://login.salesforce.com")    

    await page.route(`**/aura?preloadActions`,async(route,request)=>{
        console.log("print the all headers")
        console.log(await request.allHeaders());
        console.log("print the response at begin")
        console.log(request.response());
        await route.fulfill({
            status: 500,
            headers:{
                   "content-length": "Testing content",
                   "date": "Testing",
               },   
        })

        await page.on('response',response=>{
            const headers= response.allHeaders()
            response.status()            
            console.log('request url, status, headers data');
            console.log(`<<<--Request-->`,response.request().url(),response.status(),headers.then((x)=>{
                console.log(x)}))
            //console.log(response.json());
            //console.log(headers.then(async (x)=>{await console.log(x)}));
          })

    })

    await page.fill("#username","dinakaran@company.sandbox")
    await page.fill("#password","Test@123")
    const newPromise=await Promise.all([
        page.waitForResponse(''),
        page.click("#Login")
    ])
    
    await page.click(".slds-icon-waffle")
})
