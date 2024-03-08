process.on('exit', code => {
    console.log('Antes de terminar el proceso:', code);    
})
process.on('uncaughtException', exception => {
    console.log('Atrapa un error no controlado', exception);    
})
process.on('Message', code => {
    console.log('');    
})