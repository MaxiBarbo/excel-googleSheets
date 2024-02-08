import * as XLSX from 'xlsx';

interface UserData {
    UserName: string;
    Password: string;
    Role: string;
    ID: number
}

async function accessExcelSheet(excelData: string, num: number): Promise<UserData | null> {
    try {
        const datosObtenidosExcel = XLSX.readFile(excelData);
        const sheetName = datosObtenidosExcel.SheetNames[0];
        const sheet = datosObtenidosExcel.Sheets[sheetName];
        const userData: UserData[] = XLSX.utils.sheet_to_json(sheet);
        console.log('Hoja: ' +sheetName)
        // Ordenar los datos por UserName
        userData.sort((a, b) => a.UserName.localeCompare(b.UserName));
        // Verificar que el índice num esté dentro de los límites
        if (num >= 0 && num < userData.length) {
            return userData[num];
        } else {
            console.error(`Índice ${num} está fuera de los límites.`);
            return null;
        }
    } catch (error) {
        console.error('Error al acceder al archivo Excel:', error);
        return null;
    }
}

export default accessExcelSheet;
