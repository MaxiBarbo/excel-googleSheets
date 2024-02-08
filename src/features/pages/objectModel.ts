// login-page.ts
import { Page } from 'playwright';
import accessGoogleSheet from '../../utils/googleSheetAcces';
import accessExcelSheet from '../../utils/excelSheets';

export class Elements {
    public static readonly UsernameInput = '[data-test="username"]';
    public static readonly PasswordInput = '[data-test="password"]';
    public static readonly SubmitButton = 'input[type="submit"]';

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async enterUsername(username: string): Promise<void> {
        await this.page.fill(Elements.UsernameInput, username);
        console.log(`Entering username: ${username}`);
    }

    public async enterPassword(password: string): Promise<void> {
        await this.page.fill(Elements.PasswordInput, password);
        console.log(`Entering password: ${password}`);
    }

    public async clickSubmit(): Promise<void> {
        await this.page.waitForSelector(Elements.SubmitButton);
        await this.page.click(Elements.SubmitButton);
        console.log('Clicking submit button');
    }

    public async loginUser(username: string, password: string): Promise<void> {
        await this.page.waitForSelector(Elements.UsernameInput)
        await this.page.fill(Elements.UsernameInput, username)
        await this.page.waitForSelector(Elements.PasswordInput)
        await this.page.fill(Elements.PasswordInput, password)
    }

    public async excelSheets(){
        let excelData = 'src/templates/dataLogin.xlsx'
        let datauser1 = await accessExcelSheet(excelData,0)
        
        console.log(datauser1)
    }

    public async googleSheet(){
        let sheetName = 'login'
        const spreadsheetId = '1N2_if3nb_-VFPVxs3g3n5j9L1Agtw886CivwWUpO9DM';
        const apiKey = 'AIzaSyBeuLvEvy5QXAiJnq-7YGa1TWTqYsBdJlU';
        const range = `${sheetName}!A1:J38`;
        let userName = await accessGoogleSheet(spreadsheetId, apiKey, range, 1, 0)
        let userPass = await accessGoogleSheet(spreadsheetId, apiKey, range, 1, 1)
    }

    public async loginSheets(fila: number){
        let sheetName = 'Datos Parametrizados en Login'
        const spreadsheetId = '1r32jKngM6Jw_gcJPxGlLL5ZANTZZQ5qWdl6VkUtg6ek';
        const apiKey = 'AIzaSyBeuLvEvy5QXAiJnq-7YGa1TWTqYsBdJlU';
        const range = `${sheetName}!A1:J38`;
            let userId = {
                id: await accessGoogleSheet(spreadsheetId, apiKey, range, fila, 0) ?? '',
                title: await accessGoogleSheet(spreadsheetId, apiKey, range, fila, 3) ?? '',
                email: await accessGoogleSheet(spreadsheetId, apiKey, range, fila, 1) ?? '',
                password: await accessGoogleSheet(spreadsheetId, apiKey, range, fila, 2) ?? '',
                status: await accessGoogleSheet(spreadsheetId, apiKey, range, fila, 5) ?? '',
                resultadoEsperado: await accessGoogleSheet(spreadsheetId, apiKey, range, fila, 4) ?? ''
            }
        return {userId, sheetName}
    }
    // Funcion para acceder a cualquier numero de fila en una hoja de google sheet contenedora con datos de casos de prueba por 'ID'
    public async datosParametrizadosLogin(){
        let id_02 = await this.loginSheets(3)
        console.log(id_02)
    }

    public async getDate(){
        const fechaActual = new Date();
        const horaActual: string = fechaActual.toLocaleTimeString();
        return horaActual
    }

    public async formatDate(){
        const fechaActual = new Date();
        const fechaISO = fechaActual;
        // Parsea la fecha a un objeto Date
        const fecha = new Date(fechaISO);
        // Obtiene los componentes de la fecha y hora
        const dia = fecha.getUTCDate().toString().padStart(2, '0');
        const mes = (fecha.getUTCMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses van de 0 a 11
        const año = fecha.getUTCFullYear();
        const fechaFormateada = `${dia}/${mes}/${año}`;
        return fechaFormateada
    }
}
