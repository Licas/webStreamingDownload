var http = require('http')
var fs   = require('fs')
var rndm = require('rndm')
var util = require('./public/javascript/base64_util.js');
var querystring = require('querystring');
var tmpDir = './tmp';

var rtmp = require('rtmp-download');



http.get(
    'http://www.filmpertutti.co/la-foresta-di-ghiaccio-2014/'
    //'http://speedvideo.net/embed-64ned8pp070c-530x302.html'//'www.filmpertutti.co/kung-fu-panda-holiday-la-festivita-di-kung-fu-panda/'
    , function(res) {
         // Continuously update stream with data
        var body = '';
        res.on('data', function(d) {
            body += d;
            //console.log(body);
        });
    
        res.on('error', function(err) {
            console.log("Error "+err);
        });
        
        res.on('end', function() {

            // Data reception is done, do whatever with it!
            console.log("Done");
            //console.log(body);
            
            var tmpStr = body.substring(body.indexOf('http://speedvideo.net/embed'));
            var link = tmpStr.split("\"")[0];
            
            downloadFromLink(link)

        });
});

function downloadFromLink(link) {
    
    console.log(link)
             
    http.get(link
    , function(res) {
         // Continuously update stream with data
        var body = '';
        res.on('data', function(d) {
            body += d;
            //console.log(body);
        });
    
        res.on('error', function(err) {
            console.log("Error "+err);
        });
        
        res.on('end', function() {
            // Data reception is done, do whatever with it!
            console.log("Done");
            var linkFileStr = 'linkfile =\"';
            
            var tmpStr = body.substring(body.indexOf(linkFileStr));
            tmpStr = tmpStr.substring(linkFileStr.length, tmpStr.indexOf('\";'));
            
            console.log("The encoded link is: " + tmpStr)
            
            //Recupero stringa randomica
            var key = "jwplayer.key";
            var key2 = "<script type=\'text/javascript\'>";
            var randStr = "";
            
            tmpStr = body.substring(body.indexOf(key));
            tmpStr = tmpStr.substring(tmpStr.indexOf(key2));
            tmpStr = tmpStr.substring(tmpStr.indexOf(" = ")+2, tmpStr.indexOf(";"));
            
            randStr = tmpStr;
            console.log("The magic number:"+randStr);
            var decodedlinkfile = util.base64_decode(tmpStr, randStr) + ".flv";
            
            console.log("Decoded link: " + decodedlinkfile);
            
            var jwPlayer = "file: \'http://speedvideo.net/videoplayer/logo.png\',";
            var jwPlayer2 = "link: \'";
            
            tmpStr = body.substring(body.indexOf(jwPlayer)+jwPlayer.length);
            tmpStr = tmpStr.substring(tmpStr.indexOf(jwPlayer2)+jwPlayer2.length);
            tmpStr = tmpStr.substring(0,tmpStr.indexOf("\'"));
            console.log("jw##### "+tmpStr)
            console.log(tmpStr.substring(tmpStr.indexOf("//")+2));
            var config = {
                src: 'rtmp://'+decodedlinkfile,
                target: '/Users/licas/Documents/test.flv',
                onProgress: function(data) {
                    console.log(data);
                },
                onExit: function(data) {},
                onError: function(error) {
                    console.log("Error:"+error);
                }
            };

            rtmp.download(config);
            
            /*http.get(tmpStr,
                function(res) {
                     // Continuously update stream with data
                    var body = '';
                    res.on('data', function(d) {
                        body += d;
                        //console.log(body);
                    });
                     res.on('end', function() {
                    // Data reception is done, do whatever with it!
                        console.log("Done");

                        var formBeg = "<Form method=\"POST\" action=\'";
                        var id = "";
                        var usr_login = "";
                        var op_P = "<input type=\"hidden\" name=\"op\" value=\"";
                        var fname_P = "<input type=\"hidden\" name=\"fname\" value=\"";
                        var hash_P = "<input type=\"hidden\" name=\"hash\" value=\"";
                        var action = getValue(body, formBeg, "\'");
                             id = action.substring(action.lastIndexOf("/")+1);

                        var hash =  getValue(body, hash_P, "\"");      
                        var fname =  getValue(body, fname_P, "\"");      
                        var op =  getValue(body, op_P, "\"");      
                        console.log("Post action:"+action);
                        console.log("Hash:"+hash);
                        console.log("Fname:"+fname);
                        console.log("Op:"+op);
                         console.log("Id:"+id);

                         var postData = querystring.stringify({
                          'action' : action,
                             'hash':hash,
                             'op':op,
                             'fname':fname,
                             'id':id,
                             'referer':'',
                             'usr_login':''
                        });
                         console.log("server "+action.substring(action.indexOf("//")+2,action.lastIndexOf('/')));
                        var options = {
                          hostname: action.substring(action.indexOf("//")+2,action.lastIndexOf('/') ),
                          port: 80,
                          path: action.substring(action.lastIndexOf('/')),
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Content-Length': postData.length
                          }
                        };

                        var req = http.request(options, function(res) {
                            var salt = rndm(16)
                            var filename = tmpDir + '/' + salt + new Date() + '.tmp'

                            console.log('STATUS: ' + res.statusCode);
                            console.log('HEADERS: ' + JSON.stringify(res.headers));
                            res.setEncoding('utf8');
                            
                            res.on('data', function (chunk) {
                                console.log('BODY: ' + chunk);
                                fs.appendFileSync(filename, chunk);
                            });
                        });

                        req.on('error', function(e) {
                          console.log('problem with request: ' + e.message);
                        });

                        // write data to request body
                        req.write(postData);
                        req.end();

                     });
            });*/
            
            //console.log(tmpStr);
            /*
            var salt = rndm(16)
            var filename = tmpDir + '/' + salt + new Date() + '.tmp'

            fs.writeFile(filename, body,function (err) {
                if (err) throw err;
                    console.log('File saved!');
            });
*/
        });
    });

}

function getValue(full, from, lastDelimiter) {
    
    var tmp = full.substring(full.indexOf(from)+from.length);
    tmp = tmp.substring(0,tmp.indexOf(lastDelimiter));
    
    return tmp;
}