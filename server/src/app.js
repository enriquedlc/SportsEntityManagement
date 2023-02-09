import { runServer, stopServer } from './server/server.mjs'
const startApplication = () => {
    runServer()
}
const stopApplication = () => {
    console.log('\nReceived kill signal, shutting down...');
    stopServer()
    process.exit(0)
}

process.on('SIGINT', () => { stopApplication() });
process.on('SIGTERM', () => { startApplication() });
process.on('exit', () => console.log('Exiting Express server'));

startApplication()