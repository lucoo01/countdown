$(document).ready(function() {

	const { ipcRenderer } = require('electron');
	var ipc = ipcRenderer;
    $(document).on('keydown',function(e){
        var ctrlKey  = e.ctrlKey;
        var shiftKey = e.shiftKey;
        var keyCode  = e.keyCode;

        //console.log(keyCode);
        var next = {};
        if(ctrlKey && keyCode == 81){ // ctrl + Q 81
            next = $(".ClassyCountdownDemo.zindex100").next();
            if(next.length > 0){
                $(".ClassyCountdownDemo").removeClass("zindex100");
                next.addClass("zindex100");
            }else{
                $(".ClassyCountdownDemo").removeClass("zindex100");
                $($(".ClassyCountdownDemo").get(0)).addClass("zindex100");
            }

        }

        if(keyCode == 122){ // F11
            // 切换全屏
            // win.setFullScreen(flag)
            ipc.send('setfullscreen', {});
            return;
        }

        if(ctrlKey && keyCode == 87){ // ctrl + w 关闭软件
            ipc.sendSync('quit-app');
            return;
        }

        if(ctrlKey && shiftKey && keyCode == 87 ){ // ctrl+ shift + w
            // 关闭软件
            ipc.sendSync('quit-app');
            return;
        }


        if(ctrlKey && shiftKey && keyCode == 67 ){ // ctrl+ shift +c
            // 窗口居中
            ipc.send('wincenter', {});
            return;
        }


        if(ctrlKey && keyCode == 82){ // ctrl+r
            // 刷新
            ipc.send('winreload', {});
            return;
        }

        if(ctrlKey && shiftKey && keyCode == 221){ // ctrl + shift + ']'号
            var webFrame = require('electron').webFrame;
            var curZoomFactor = webFrame.getZoomFactor();

            // 放大
            if(curZoomFactor < 2){
              webFrame.setZoomFactor(curZoomFactor+0.2);
            }
            return;
        }

        if(ctrlKey && shiftKey && keyCode == 219){ // ctrl + shift + '['号
            // 缩小
            // win.minimize()
            var webFrame = require('electron').webFrame;
            var curZoomFactor = webFrame.getZoomFactor();
            if(curZoomFactor > 0.5){
              webFrame.setZoomFactor(curZoomFactor-0.2);
            }
            return;
        }


        if(ctrlKey && (keyCode == 48 || keyCode == 96 )){ // ctrl+ '0'号
            // 还原
            var webFrame = require('electron').webFrame;
            webFrame.setZoomFactor(1.0);
            return;
        }
        

    });

    $('#countdown15').ClassyCountdown({
        theme: "flat-colors",
        clocktype: 'yearRemainDay',
        labelsOptions: {
            lang: {
                days: 'LDay',
            },
            style: 'font-size:0.5em; text-transform:uppercase;'
        },
        //showtype:['D','S'],
        //end: $.now() + 10000
    });

    $('#countdown16').ClassyCountdown({
        theme: "flat-colors-wide",
        //end: $.now() + 10000
    });

    $('#countdown17').ClassyCountdown({
        theme: "flat-colors-very-wide",
        //end: $.now() + 10000
    });

    $('#countdown18').ClassyCountdown({
        theme: "flat-colors-black",
        //end: $.now() + 10000
    });

    $('#countdown1').ClassyCountdown({
        theme: "white",
        //end: $.now() + 645600
    });
    $('#countdown5').ClassyCountdown({
        theme: "white",
        //end: $.now() + 10000
    });

    $('#countdown6').ClassyCountdown({
        theme: "white-wide",
        //end: $.now() + 10000
    });

    $('#countdown7').ClassyCountdown({
        theme: "white-very-wide",
        //end: $.now() + 10000
    });

    $('#countdown8').ClassyCountdown({
        theme: "white-black",
        //end: $.now() + 10000
    });

    $('#countdown11').ClassyCountdown({
        theme: "black",
        style: {
            secondsElement: {
                gauge: {
                    fgColor: "#F00"
                }
            }
        },
        //end: $.now() + 10000
    });

    $('#countdown12').ClassyCountdown({
        theme: "black-wide",
        labels: false,
        //end: $.now() + 10000
    });

    $('#countdown13').ClassyCountdown({
        theme: "black-very-wide",
        labelsOptions: {
            lang: {
                days: 'D',
                hours: 'H',
                minutes: 'M',
                seconds: 'S'
            },
            style: 'font-size:0.5em; text-transform:uppercase;'
        },
        //end: $.now() + 10000
    });

    $('#countdown14').ClassyCountdown({
        theme: "black-black",
        labelsOptions: {
            style: 'font-size:0.5em; text-transform:uppercase;'
        },
        //end: $.now() + 10000
    });

    
    


    


    
});

// $('#countdown2').ClassyCountdown({
//     end: '1388468325',
//     now: '1378441323',
//     labels: true,
//     style: {
//         element: "",
//         textResponsive: .5,
//         days: {
//             gauge: {
//                 thickness: .01,
//                 bgColor: "rgba(0,0,0,0.05)",
//                 fgColor: "#1abc9c"
//             },
//             textCSS: 'font-family:\'Open Sans\'; font-size:25px; font-weight:300; color:#34495e;'
//         },
//         hours: {
//             gauge: {
//                 thickness: .01,
//                 bgColor: "rgba(0,0,0,0.05)",
//                 fgColor: "#2980b9"
//             },
//             textCSS: 'font-family:\'Open Sans\'; font-size:25px; font-weight:300; color:#34495e;'
//         },
//         minutes: {
//             gauge: {
//                 thickness: .01,
//                 bgColor: "rgba(0,0,0,0.05)",
//                 fgColor: "#8e44ad"
//             },
//             textCSS: 'font-family:\'Open Sans\'; font-size:25px; font-weight:300; color:#34495e;'
//         },
//         seconds: {
//             gauge: {
//                 thickness: .01,
//                 bgColor: "rgba(0,0,0,0.05)",
//                 fgColor: "#f39c12"
//             },
//             textCSS: 'font-family:\'Open Sans\'; font-size:25px; font-weight:300; color:#34495e;'
//         }

//     },
//     onEndCallback: function() {
//         console.log("Time out!");
//     }
// });
// 
// 
// $('#countdown4').ClassyCountdown({
//     end: $.now() + 10000,
//     labels: true,
//     style: {
//         element: "",
//         textResponsive: .5,
//         days: {
//             gauge: {
//                 thickness: .03,
//                 bgColor: "rgba(255,255,255,0.05)",
//                 fgColor: "#1abc9c"
//             },
//             textCSS: 'font-family:\'Open Sans\'; font-size:25px; font-weight:300; color:#fff;'
//         },
//         hours: {
//             gauge: {
//                 thickness: .03,
//                 bgColor: "rgba(255,255,255,0.05)",
//                 fgColor: "#2980b9"
//             },
//             textCSS: 'font-family:\'Open Sans\'; font-size:25px; font-weight:300; color:#fff;'
//         },
//         minutes: {
//             gauge: {
//                 thickness: .03,
//                 bgColor: "rgba(255,255,255,0.05)",
//                 fgColor: "#8e44ad"
//             },
//             textCSS: 'font-family:\'Open Sans\'; font-size:25px; font-weight:300; color:#fff;'
//         },
//         seconds: {
//             gauge: {
//                 thickness: .03,
//                 bgColor: "rgba(255,255,255,0.05)",
//                 fgColor: "#f39c12"
//             },
//             textCSS: 'font-family:\'Open Sans\'; font-size:25px; font-weight:300; color:#fff;'
//         }

//     },
//     onEndCallback: function() {
//         console.log("Time out!");
//     }
// });
// 
// $('#countdown9').ClassyCountdown({
//     end: '1388468325',
//     now: '1380501323',
//     labels: true,
//     style: {
//         element: "",
//         textResponsive: .5,
//         days: {
//             gauge: {
//                 thickness: .05,
//                 bgColor: "rgba(0,0,0,0)",
//                 fgColor: "#1abc9c",
//                 lineCap: 'round'
//             },
//             textCSS: 'font-family:\'Open Sans\'; font-size:25px; font-weight:300; color:#34495e;'
//         },
//         hours: {
//             gauge: {
//                 thickness: .05,
//                 bgColor: "rgba(0,0,0,0)",
//                 fgColor: "#2980b9",
//                 lineCap: 'round'
//             },
//             textCSS: 'font-family:\'Open Sans\'; font-size:25px; font-weight:300; color:#34495e;'
//         },
//         minutes: {
//             gauge: {
//                 thickness: .05,
//                 bgColor: "rgba(0,0,0,0)",
//                 fgColor: "#8e44ad",
//                 lineCap: 'round'
//             },
//             textCSS: 'font-family:\'Open Sans\'; font-size:25px; font-weight:300; color:#34495e;'
//         },
//         seconds: {
//             gauge: {
//                 thickness: .05,
//                 bgColor: "rgba(0,0,0,0)",
//                 fgColor: "#f39c12",
//                 lineCap: 'round'
//             },
//             textCSS: 'font-family:\'Open Sans\'; font-size:25px; font-weight:300; color:#34495e;'
//         }

//     },
//     onEndCallback: function() {
//         console.log("Time out!");
//     }
// });


// $('#countdown10').ClassyCountdown({
//     end: '1397468325',
//     now: '1388471324',
//     labels: true,
//     labelsOptions: {
//         lang: {
//             days: 'D',
//             hours: 'H',
//             minutes: 'M',
//             seconds: 'S'
//         },
//         style: 'font-size:0.5em; text-transform:uppercase;'
//     },
//     style: {
//         element: "",
//         textResponsive: .5,
//         days: {
//             gauge: {
//                 thickness: .02,
//                 bgColor: "rgba(255,255,255,0.1)",
//                 fgColor: "rgba(255,255,255,1)",
//                 lineCap: 'round'
//             },
//             textCSS: 'font-family:\'Open Sans\'; font-size:25px; font-weight:300; color:rgba(255,255,255,0.7);'
//         },
//         hours: {
//             gauge: {
//                 thickness: .02,
//                 bgColor: "rgba(255,255,255,0.1)",
//                 fgColor: "rgba(255,255,255,1)",
//                 lineCap: 'round'
//             },
//             textCSS: 'font-family:\'Open Sans\'; font-size:25px; font-weight:300; color:rgba(255,255,255,0.7);'
//         },
//         minutes: {
//             gauge: {
//                 thickness: .02,
//                 bgColor: "rgba(255,255,255,0.1)",
//                 fgColor: "rgba(255,255,255,1)",
//                 lineCap: 'round'
//             },
//             textCSS: 'font-family:\'Open Sans\'; font-size:25px; font-weight:300; color:rgba(255,255,255,0.7);'
//         },
//         seconds: {
//             gauge: {
//                 thickness: .02,
//                 bgColor: "rgba(255,255,255,0.1)",
//                 fgColor: "rgba(255,255,255,1)",
//                 lineCap: 'round'
//             },
//             textCSS: 'font-family:\'Open Sans\'; font-size:25px; font-weight:300; color:rgba(255,255,255,0.7);'
//         },
//     },
//     onEndCallback: function() {
//         console.log("Time out!");
//     }
// });
// 
// $('#countdown3').ClassyCountdown({
//     end: '1390868325',
//     now: '1388461323',
//     labels: true,
//     labelsOptions: {
//         lang: {
//             days: 'Zile',
//             hours: 'Ore',
//             minutes: 'Minute',
//             seconds: 'Secunde'
//         },
//         style: 'font-size:0.5em; text-transform:uppercase;'
//     },
//     style: {
//         element: "",
//         textResponsive: .5,
//         days: {
//             gauge: {
//                 thickness: .2,
//                 bgColor: "rgba(255,255,255,0.2)",
//                 fgColor: "rgb(241, 196, 15)"
//             },
//             textCSS: 'font-family:\'Open Sans\'; font-size:25px; font-weight:300; color:rgba(255,255,255,0.7);'
//         },
//         hours: {
//             gauge: {
//                 thickness: .2,
//                 bgColor: "rgba(255,255,255,0.2)",
//                 fgColor: "rgb(241, 196, 15)"
//             },
//             textCSS: 'font-family:\'Open Sans\'; font-size:25px; font-weight:300; color:rgba(255,255,255,0.7);'
//         },
//         minutes: {
//             gauge: {
//                 thickness: .2,
//                 bgColor: "rgba(255,255,255,0.2)",
//                 fgColor: "rgb(241, 196, 15)"
//             },
//             textCSS: 'font-family:\'Open Sans\'; font-size:25px; font-weight:300; color:rgba(255,255,255,0.7);'
//         },
//         seconds: {
//             gauge: {
//                 thickness: .2,
//                 bgColor: "rgba(255,255,255,0.2)",
//                 fgColor: "rgb(241, 196, 15)"
//             },
//             textCSS: 'font-family:\'Open Sans\'; font-size:25px; font-weight:300; color:rgba(255,255,255,0.7);'
//         }

//     },
//     onEndCallback: function() {
//         console.log("Time out!");
//     }
// });