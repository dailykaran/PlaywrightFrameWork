import { Page } from "@playwright/test"

declare module '@playwright/test' {
    interface Page{
        delayedFill: (iframeselector: string, selector: string, value: string)=> Promise<void>;

        clickAndDelay: (selector: string)=> Promise<void>;
    }
}