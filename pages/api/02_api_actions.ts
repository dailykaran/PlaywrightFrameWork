import { request, test } from "@playwright/test"
    let context:any
    test.beforeAll('', async() => {
        const context = await request.newContext({
            timeout: 30000,
        })
    })
    export async function httpPost(url: string, data: any, headers?: Record<string, string>):Promise<any> {
        const response = await context.post(url, { data, headers });
        return response;
    }

    export async function httpPatch(url: string, data: any, headers?: Record<string, string>):Promise<any> {
        const response = await context.patch(url, { data, headers });
        return response;
    }

