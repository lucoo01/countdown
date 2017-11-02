/*!
 * jQuery ClassyCountdown
 * www.class.pm
 *
 * Written by Marius Stanciu - Sergiu <marius@class.pm>
 * Licensed under the MIT license www.class.pm/LICENSE-MIT
 * Version 1.0.0
 *
 */

(function($) {
    $.fn.ClassyCountdown = function(options, callback) {
        var element = $(this);
        var DaysLeft, HoursLeft, MinutesLeft, SecondsLeft;
        var sday = false,shour = false, sminute = false, ssecond = false;
        var secondsLeft;
        var isFired = false;
        var settings = {
            end: undefined,
            now: $.now(),
            showtype:['D','H','M','S'],
            timecs:10000,
            labels: true,
            clocktype:'djs',
            labelsOptions: {
                lang: {
                    days: 'Days',
                    hours: 'Hours',
                    minutes: 'Minutes',
                    seconds: 'Seconds'
                },
                style: 'font-size: 0.5em;'
            },
            style: {
                element: '',
                labels: false,
                textResponsive: 0.5,
                days: {
                    gauge: {
                        thickness: 0.02,
                        bgColor: 'rgba(0, 0, 0, 0)',
                        fgColor: 'rgba(0, 0, 0, 1)',
                        lineCap: 'butt'
                    },
                    textCSS: ''
                },
                hours: {
                    gauge: {
                        thickness: 0.02,
                        bgColor: 'rgba(0, 0, 0, 0)',
                        fgColor: 'rgba(0, 0, 0, 1)',
                        lineCap: 'butt'
                    },
                    textCSS: ''
                },
                minutes: {
                    gauge: {
                        thickness: 0.02,
                        bgColor: 'rgba(0, 0, 0, 0)',
                        fgColor: 'rgba(0, 0, 0, 1)',
                        lineCap: 'butt'
                    },
                    textCSS: ''
                },
                seconds: {
                    gauge: {
                        thickness: 0.02,
                        bgColor: 'rgba(0, 0, 0, 0)',
                        fgColor: 'rgba(0, 0, 0, 1)',
                        lineCap: 'butt'
                    },
                    textCSS: ''
                }
            },
            onEndCallback: function() {
            }
        };
        if (options.theme) {
            settings = $.extend(true, settings, getPreset(options.theme));
        }
        settings = $.extend(true, settings, options);

        if(typeof options.showtype != 'undefined'){
            settings.showtype = options.showtype;
        }

        if(typeof options.clocktype != 'undefined' && settings.clocktype == 'yearRemainDay'){
            settings.showtype = ['D'];
        }

        if($.inArray('D', settings.showtype) > -1){
            sday = true;
        }

        if($.inArray('H', settings.showtype) > -1){
            shour = true;
        }

        if($.inArray('M', settings.showtype) > -1){
            sminute = true;
        }

        if($.inArray('S', settings.showtype) > -1){
            ssecond = true;
        }

        prepare();
        doTick();
        setInterval(doTick, 1000);
        doResponsive();

        var curDate = new Date();
        var fYear = curDate.getFullYear();
        var fMonth = curDate.getMonth();
        var fDay = curDate.getDay();

        //console.log("一年中剩下:",yearRemainDay(fYear, fMonth, fDay));

        function isLeapYr(yr) {

            //判断闰年
            return (yr % 4 === 0 && yr % 100 !== 0) || (yr % 100 === 0 && yr % 400 === 0);

        }

        function yearDays(y, m, d) {

            var mdays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            var mSum = 0;
            var sum = 0;

            //如果是闰年的话，那么2月份就应该有29天
            isLeapYr(y) ? mdays[1] = 29 : mdays[1];

            //计算该月份之前的总天数，比如m=3，那么就计算1和2月的总天数
            for (var i = 0; i < m - 1; i++) {
                mSum += mdays[i];
            }

            //加上当月天数
            sum = mSum + d;

            return sum;
        }

        function yearRemainDay(y, m, d){ // 剩下几天
            var yd = yearDays(y, m, d);
            return isLeapYr(y) ? (366 - yd) : (365 - yd);
        }
        
        function prepare() {
            
            var dayStr =  '<div class="ClassyCountdown-days">' +
                                '<input type="text" />' +
                                '<span class="ClassyCountdown-value"><div></div><span></span></span>' +
                            '</div>';
            var hourStr = '<div class="ClassyCountdown-hours">' +
                                '<input type="text" />' +
                                '<span class="ClassyCountdown-value"><div></div><span></span></span>' +
                            '</div>';
            var minuteStr = '<div class="ClassyCountdown-minutes">' +
                                '<input type="text" />' +
                                '<span class="ClassyCountdown-value"><div></div><span></span></span>' +
                            '</div>';
            var secondStr = '<div class="ClassyCountdown-seconds">' +
                                '<input type="text" />' +
                                '<span class="ClassyCountdown-value"><div></div><span></span></span>' +
                            '</div>';

            var appendStr = '<div class="ClassyCountdown-wrapper">';

            if(sday){
                appendStr += dayStr;
            }

            if(shour){
                appendStr += hourStr;
            }

            if(sminute){
                appendStr += minuteStr;
            }

            if(ssecond){
                appendStr += secondStr;
            }

            appendStr += '</div>';

            element.append(appendStr);

            sday && element.find('.ClassyCountdown-days input').knob($.extend({
                width: '100%',
                displayInput: false,
                readOnly: true,
                max: 365
            }, settings.style.days.gauge));

            shour && element.find('.ClassyCountdown-hours input').knob($.extend({
                width: '100%',
                displayInput: false,
                readOnly: true,
                max: 24
            }, settings.style.hours.gauge));

            sminute && element.find('.ClassyCountdown-minutes input').knob($.extend({
                width: '100%',
                displayInput: false,
                readOnly: true,
                max: 60
            }, settings.style.minutes.gauge));

            ssecond && element.find('.ClassyCountdown-seconds input').knob($.extend({
                width: '100%',
                displayInput: false,
                readOnly: true,
                max: 60
            }, settings.style.seconds.gauge));

            element.find('.ClassyCountdown-wrapper > div').attr("style", settings.style.element);

            sday && element.find('.ClassyCountdown-days .ClassyCountdown-value').attr('style', settings.style.days.textCSS);

            shour && element.find('.ClassyCountdown-hours .ClassyCountdown-value').attr('style', settings.style.hours.textCSS);

            sminute && element.find('.ClassyCountdown-minutes .ClassyCountdown-value').attr('style', settings.style.minutes.textCSS);

            ssecond && element.find('.ClassyCountdown-seconds .ClassyCountdown-value').attr('style', settings.style.seconds.textCSS);
            
            element.find('.ClassyCountdown-value').each(function() {
                $(this).css('margin-top', Math.floor(0 - (parseInt($(this).height()) / 2)) + 'px');
            });

            if (settings.labels) {
                sday && element.find(".ClassyCountdown-days .ClassyCountdown-value > span").html(settings.labelsOptions.lang.days);
                shour && element.find(".ClassyCountdown-hours .ClassyCountdown-value > span").html(settings.labelsOptions.lang.hours);
                sminute && element.find(".ClassyCountdown-minutes .ClassyCountdown-value > span").html(settings.labelsOptions.lang.minutes);
                ssecond && element.find(".ClassyCountdown-seconds .ClassyCountdown-value > span").html(settings.labelsOptions.lang.seconds);
                element.find(".ClassyCountdown-value > span").attr("style", settings.labelsOptions.style);
            }

            // 终点秒数 3800908800
            //secondsLeft = settings.end - settings.now;
            //secondsLeft = settings.timecs;
            secondsLeft = (3800908800000 - Date.parse(new Date()))/1000;
            // console.log('end',settings.end);
            // console.log('now',settings.now);
            // console.log(secondsLeft);
            secondsToDHMS();
        }
        
        function secondsToDHMS() {
            DaysLeft = Math.floor(secondsLeft / 86400);
            HoursLeft = Math.floor((secondsLeft % 86400) / 3600);
            MinutesLeft = Math.floor(((secondsLeft % 86400) % 3600) / 60);
            SecondsLeft = Math.floor((((secondsLeft % 86400) % 3600) % 60) % 60);
        }

        function secondsToDHMS() {
            DaysLeft = Math.floor(secondsLeft / 86400);
            HoursLeft = Math.floor((secondsLeft % 86400) / 3600);
            MinutesLeft = Math.floor(((secondsLeft % 86400) % 3600) / 60);
            SecondsLeft = Math.floor((((secondsLeft % 86400) % 3600) % 60) % 60);
        }

       



        function doTick() {
            secondsLeft--;
            secondsToDHMS();
            if (secondsLeft <= 0) {
                if (!isFired) {
                    isFired = true;
                    settings.onEndCallback();
                }
                DaysLeft = 0;
                HoursLeft = 0;
                MinutesLeft = 0;
                SecondsLeft = 0;
            }
            var curDate = new Date();
            var fYear = curDate.getFullYear();
            var fMonth = curDate.getMonth();
            var fDay = curDate.getDay();
            var yrd, yearallday = 365;

            if(settings.clocktype == 'yearRemainDay'){
                yrd = yearRemainDay(fYear, fMonth, fDay);
                yearallday = isLeapYr(fYear) ? 366 : 365;
                sday && element.find('.ClassyCountdown-days input').val(yearallday - yrd).trigger('change');
                sday && element.find('.ClassyCountdown-days .ClassyCountdown-value > div').html(yrd);
            }else{

                sday && element.find('.ClassyCountdown-days input').val(365 - DaysLeft).trigger('change');
                shour && element.find('.ClassyCountdown-hours input').val(24 - HoursLeft).trigger('change');
                sminute && element.find('.ClassyCountdown-minutes input').val(60 - MinutesLeft).trigger('change');
                ssecond && element.find('.ClassyCountdown-seconds input').val(60 - SecondsLeft).trigger('change');
                sday && element.find('.ClassyCountdown-days .ClassyCountdown-value > div').html(DaysLeft);
                shour && element.find('.ClassyCountdown-hours .ClassyCountdown-value > div').html(HoursLeft);
                sminute && element.find('.ClassyCountdown-minutes .ClassyCountdown-value > div').html(MinutesLeft);
                ssecond && element.find('.ClassyCountdown-seconds .ClassyCountdown-value > div').html(SecondsLeft);
            }
        }
        
        function doResponsive() {
            element.find('.ClassyCountdown-wrapper > div').each(function() {
                $(this).css('height', $(this).width() + 'px');
            });
            if (settings.style.textResponsive) {
                element.find('.ClassyCountdown-value').css('font-size', Math.floor(element.find('> div').eq(0).width() * settings.style.textResponsive / 10) + 'px');
                element.find('.ClassyCountdown-value').each(function() {
                    $(this).css('margin-top', Math.floor(0 - (parseInt($(this).height()) / 2)) + 'px');
                });
            }
            $(window).trigger('resize');
            $(window).resize($.throttle(50, onResize));
        }

        function onResize() {
            element.find('.ClassyCountdown-wrapper > div').each(function() {
                $(this).css('height', $(this).width() + 'px');
            });
            if (settings.style.textResponsive) {
                element.find('.ClassyCountdown-value').css('font-size', Math.floor(element.find('> div').eq(0).width() * settings.style.textResponsive / 10) + 'px');
            }
            element.find('.ClassyCountdown-value').each(function() {
                $(this).css("margin-top", Math.floor(0 - (parseInt($(this).height()) / 2)) + 'px');
            });
            sday && element.find('.ClassyCountdown-days input').trigger('change');
            shour && element.find('.ClassyCountdown-hours input').trigger('change');
            sminute && element.find('.ClassyCountdown-minutes input').trigger('change');
            ssecond && element.find('.ClassyCountdown-seconds input').trigger('change');
        }
        
        function getPreset(theme) {
            switch (theme) {
                case 'flat-colors':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#1abc9c"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#2980b9"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#8e44ad"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#f39c12"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            }
                        }
                    };
                case 'flat-colors-wide':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#1abc9c"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#2980b9"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#8e44ad"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#f39c12"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            }
                        }
                    };
                case 'flat-colors-very-wide':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.12,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#1abc9c"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.12,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#2980b9"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.12,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#8e44ad"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.12,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#f39c12"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            }
                        }
                    };
                case 'flat-colors-black':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#1abc9c",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#2980b9",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#8e44ad", lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#f39c12",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            }
                        }
                    };
                case 'black':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.01,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            }
                        }
                    };
                case 'black-wide':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            }
                        }
                    };
                case 'black-very-wide':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.17,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.17,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.17,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.17,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            }
                        }
                    };
                case 'black-black':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(0,0,0,0.05)",
                                    fgColor: "#222",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#34495e;'
                            }
                        }
                    };
                case 'white':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.03,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            }
                        }
                    };
                case 'white-wide':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.06,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.06,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.06,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.06,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            }
                        }
                    };
                case 'white-very-wide':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.16,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.16,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.16,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.16,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff"
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            }
                        }
                    };
                case 'white-black':
                    return {
                        labels: true,
                        style: {
                            element: '',
                            textResponsive: 0.5,
                            days: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            hours: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            minutes: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            },
                            seconds: {
                                gauge: {
                                    thickness: 0.25,
                                    bgColor: "rgba(255,255,255,0.05)",
                                    fgColor: "#fff",
                                    lineCap: 'round'
                                },
                                textCSS: 'font-family:\'Open Sans\';font-weight:300;color:#fff;'
                            }
                        }
                    };
            }
        }
    };
})(jQuery);