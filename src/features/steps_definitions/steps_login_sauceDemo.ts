import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, firefox, Page} from 'playwright';
import { Elements } from '../pages/objectModel';


let browser;
let page: Page
let elements: Elements
let segundos = 1900
const browserName = 'firefox'
const escenario1 = '@agregar-producto'
const escenario2 = '@eliminar-producto'

Before( { timeout: 10000 }, async () => {
    browser = await firefox.launch({ headless: true });
    page = await browser.newPage();
    elements = new Elements(page)
});

Given('que he iniciado sesion en la url tienda SauceDemo {string}', async function (URL: string)  {
    await page.goto(URL)
});

When('ingreso mi usuario {string} y contraseña {string}', async (user: string ,password: string) => {
    elements.loginUser(user, password)
    await page.waitForTimeout(segundos)
    await page.locator('[data-test="login-button"]').click();
});

// Escenario @leer-sheets de excel y google
Then('accedo a los datos parametrizados en Excel', async () => {
    elements.excelSheets()
});

Then('accedo a los datos parametrizados en google sheets', async () => {
    elements.googleSheet()
    
});

Then('mostrar hojas google sheet: Test Cases ejecutados: Login_001 - Team: s13-07-n-node-react', async () => {
    elements.loginSheet()
    
});

After( async () => {
    await page.waitForTimeout(segundos)
});