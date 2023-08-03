const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/go',async (req, res) => {
    try {
        const url = req.body.url;
        await app.driver.get(url);
        return res.send();
    } catch (error) {
        res.status(404).send(error.message);
    }
});
app.post('/execute',async (req, res) => {
    try {
        const async = req.body.async;
        const script = req.body.script;
        var rs = false;
        if(async){
            rs = app.driver.executeAsyncScript(script);
        }else{
            rs = app.driver.executeScript(script);
        }
        return res.send(rs);
    } catch (error) {
        res.status(404).send(error.message);
    }
});
app.post('/get',async (req, res) => {
    try {
        var url = req.body.url;
        var rs = await app.driver.executeAsyncScript(function(url) {
            var callback = arguments[arguments.length - 1];
            var xhr = new XMLHttpRequest();
            xhr.open("GET",url,true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    callback(xhr.response);
                }
            };
            xhr.send();
        },url);
        return res.send(rs);
    } catch (error) {
        res.status(404).send(error.message);
    }
});
app.post('/post',async (req, res) => {
    try {
        var url = req.body.url;
        var data = req.body.data;
        var type = req.body.type;
        var rs = await app.driver.executeAsyncScript(function(url,data,type) {
            var callback = arguments[arguments.length - 1];
            var xhr = new XMLHttpRequest();
            xhr.open("POST",url,true);
            xhr.setRequestHeader("Content-Type",type);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    callback(xhr.responseText);
                }
            };
            xhr.send(data);
        },url,data,type);
        return res.send(rs);
    } catch (error) {
        res.status(404).send(error.message);
    }
});
module.exports = {app};