var fs = require('fs');
var tmpDir = './tmp';
console.log("Called phantom script");
//
//if ( typeof(phantom) !== "undefined" ) {
//    var page = webpage.create();
//    console.log("created page");
//    // Route "console.log()" calls from within the Page context to the main Phantom context (i.e. current "this")
//    page.onConsoleMessage = function(msg) {
//        console.log(msg);
//    };
//    
//    page.onAlert = function(msg) {
//        console.log(msg);
//    };
//    
//    console.log("* Script running in the Phantom context.");
//    console.log("* Script will 'inject' itself in a page...");
//    page.open("http://www.filmpertutti.co/la-foresta-di-ghiaccio-2014/", function(status) {
//        if ( status === "success" ) {
//            console.log(status);
//        }
//        phantom.exit();
//    });
//} else {
//    alert("* Script running in the Page context.");
//}

var page = require('webpage').create();
//var url ='http://www.filmpertutti.co/la-foresta-di-ghiaccio-2014/';
//var url ='http://speedvideo.net/embed-64ned8pp070c-530x302.html';
var url ='http://speedvideo.net/64ned8pp070c';

function onPageReady() {
    var htmlContent = page.evaluate(function () {
        return document.documentElement.outerHTML;
    });

    console.log(htmlContent);

    phantom.exit();
}

page.open(url, function (status) {
//      var res = page.evaluate(function() {
////            return $("#btn_download").click();
////            return $('button[name="imhuman"]').click();
//            return $('form').submit();
//        });
    if (status !== 'success')
        {
          console.log('Unable to access network');
          phantom.exit();
          return;
        }
        else
        {
            function checkReadyState() {
                setTimeout(function () {
                    var readyState = page.evaluate(function () {
                        return document.readyState;
                    });

                    if ("complete" === readyState) {
                        onPageReady();
                    } else {
                        checkReadyState();
                    }
                });
            }
            
            page.includeJs("//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js", function()             {
                            page.evaluate(function() {
                              //  $("button[name=\"imhuman\"").click();
                                $('#btn_download').click();

                            });
                        checkReadyState();
            });
               //            page.includeJs("//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js", function()             {
//                page.evaluate(function() {
//                  //  $("button[name=\"imhuman\"").click();
//                    $('#btn_download').click();
//                
//                });
//                phantom.waitFor(function() {return !page.loading;});
//
//                // Step 2: Click on first panel and wait for it to show
//                page.evaluate(function() { 
//                    console.log('More Stuff: ' + page.content);
//                });
//            });
  
        }
   var res = page.content;
      //  console.log(page.content);
        var salt = "111"
        var filename = tmpDir + '/' + salt + new Date() + '.tmp'

        fs.write(filename, JSON.stringify(res),'w');
        phantom.exit()

    
   
});
