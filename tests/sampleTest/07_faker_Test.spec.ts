//import { faker } from '@faker-js/faker/locale/en_IN';
import {faker, fakerEN_IN, simpleFaker} from '@faker-js/faker'
import { expect, test } from '@playwright/test';

test(`Testing the faker js file`, async ()=> {

/*  await console.log("faker.internet.username: " + faker.internet.username());
    await console.log("faker.person.firstName: " + faker.person.firstName());
    await console.log("faker.person.lastName: " + faker.person.lastName());
    await console.log("faker.internet.email: " + faker.internet.email());
    await console.log("faker.phone.number: " + faker.phone.number());
    await console.log("faker.location.streetAddress: " + faker.location.streetAddress());

    await console.log("faker.location.city: " + faker.location.city());
    await console.log("faker.date.birthdate: " + faker.date.birthdate());
    await console.log("faker.location.streetAddress: " + faker.location.streetAddress());

    console.log("faker.commerce.price: " + faker.commerce.price());
    console.log("faker.person.prefix('male'): " + faker.person.prefix('male')); */
    
/*  console.log("Get random buildingNumber: "+ faker.location.buildingNumber());
    console.log("Get random street: "+ faker.location.streetAddress());
    
    //console.log("Get random secondaryAddress: "+ faker.location.secondaryAddress());
    console.log("Get random city: "+ faker.location.city());
    console.log("Get random country: "+ faker.location.state());
    console.log("Get random zipCode: "+ faker.location.zipCode()); */
})

test.only('Testing the latest build', async()=>{
    const address = faker.helpers.fake(`${fakerEN_IN.location.streetAddress()} ${fakerEN_IN.location.city()} ${fakerEN_IN.location.state()} ${fakerEN_IN.location.zipCode()} ${"India"}`);
    await console.log( address);

    const address2 = `${fakerEN_IN.location.streetAddress()} ${fakerEN_IN.location.city()} ${fakerEN_IN.location.state()} ${fakerEN_IN.location.zipCode()} ${"India"}`
    await console.log( address2);

    const datenow = `${simpleFaker.date.recent().getDate().toFixed()} `
    console.log(datenow);
    
    console.log(fakerEN_IN.phone.number());
    
    console.log("fakerEN_IN.date.birthdate(): " + fakerEN_IN.date.birthdate());

    //console.log('Testing: ' + fakerEN_IN.date.betweens({from: Date.now(), to: Date.now()}));
    console.log(Date.now())
    
    console.log(new Date().getTime());

    console.log(new Date().valueOf());

    let timestamp = new Date().toTimeString().split(' ')[0]
    //let timestamp = new Date().toUTCString()
    console.log(timestamp);

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); 
    const yyyy = today.getFullYear();

    const date = mm + '/' + dd + '/' + yyyy;
    console.log(date);
    
    console.log(fakerEN_IN.definitions);
    
    
})    
