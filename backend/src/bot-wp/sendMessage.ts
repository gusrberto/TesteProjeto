import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';

let client: Client | null = null;

const credsPath = '/backend/src/bot-wp/creds';  // Caminho absoluto definido diretamente

async function createClient(): Promise<Client> {
    if (client) return client;

    return new Promise<Client>((resolve, reject) => {
        client = new Client({
            authStrategy: new LocalAuth({
                dataPath: credsPath,
            }),
            puppeteer: {
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            }
        });
        console.log('Salvando credenciais em:', credsPath);
        client.on('qr', (qr: string) => {
            qrcode.generate(qr, { small: true }, (code: string) => {
                console.log('QR Code gerado:\n', code);
            });
        });

        client.on('ready', () => {
            resolve(client!);
        });

        client.on('auth_failure', (msg: any) => {
            reject(new Error('Falha na autenticação: ' + msg));
        });

        client.on('disconnected', (reason: any) => {
            console.log('Cliente desconectado:', reason);
            client = null; // Cliente precisa ser reiniciado após desconexão
        });

        client.initialize();
    });
}

// Função que será executada na inicialização do servidor
(async () => {
    try {
        await createClient();
        console.log('Cliente WhatsApp conectado e pronto para uso!');
    } catch (error: unknown) {
        if (error instanceof Error)
            console.error('Erro ao conectar ao WhatsApp:', error.message);
        else
            console.error('Erro desconhecido ao conectar ao WhatsApp');
    }
})();

export async function sendMessage(number: string, message: string): Promise<void> {
    try {
        const client = await createClient();
        const chatId = `55${number}@c.us`;
        
        await client.sendMessage(chatId, message);
        console.log('Mensagem enviada!');
    } catch (err) {
        console.error('Erro ao enviar a mensagem:', err);
    }
}