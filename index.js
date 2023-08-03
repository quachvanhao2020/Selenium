var PORT = 3000;
if(process.argv.length == 3){
    PORT = process.argv[2];
}
const get_driver = require("./driver");
const {app} = require("./http");
(async function main() {
    app.driver = await get_driver();
    app.listen(PORT, () => {console.log(`Port ${PORT}`)});
})();