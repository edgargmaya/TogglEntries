import { Server } from './server'

async function main() {
    const app = new Server(80);
    await app.listen();
}

/* Main Function To Launch The Server */
main();