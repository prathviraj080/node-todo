var configValues = require('./config');

module.exports = {
    getDbConnectionString: function(){
        return "mongodb://"+configValues.uname + ":" + configValues.pwd + "@ds155191.mlab.com:55191/nodetodo-prathvi";
    }
}