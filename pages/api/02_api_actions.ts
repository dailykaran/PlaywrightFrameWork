import { APIRequest, request, test } from "@playwright/test"

let context: any
    test.beforeAll('declare the newcontext for request', async() => {
        context = await request.newContext({
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

    export async function httpGet(url: string, headers?: Record<string, string>) {
        const response = await context.get(url, { headers });
        return response;
    }

    export async function httpDelete(url: string, headers?: Record<string, string>) {
        const response = await context.delete(url, { headers });
        return response;
    }
