/******************** STATE-LEVEL GRAPHICS ********************/
var smallChartHeight = 170;
//var chartSpreadsheetID = '1LbgEc_fJasdCwRpfkHSMyXYXx3V5szrJSbfJcCNl2fQ/2';
//var url = "https://spreadsheets.google.com/feeds/list/" + chartSpreadsheetID + "/public/full?alt=json";
//var tab2Data = "./data/api_tab_2.json";

//$.getJSON(tab2Data, function(data) {
//var sheetJson = data;

$(document).ready(function() {
    var sheetID = '1LbgEc_fJasdCwRpfkHSMyXYXx3V5szrJSbfJcCNl2fQ';
    var tabID = 600334154;
    Papa.parse('https://docs.google.com/spreadsheets/d/' + sheetID + '/export?format=csv&id=' + sheetID + '&gid=' + tabID, {
        download: true,
        header: true,
        complete: function(results) {
            var sheetJson = results.data;

            var displayTotalCases = Number(sheetJson[0]['total cases']);
            var displayRelatedDeaths = Number(sheetJson[0]['total related deaths']);
            var displayCovidDeaths = Number(sheetJson[0]['total covid deaths']);
            var displayTotalHospitalizations = Number(sheetJson[0]['total hospitalizations']);
            document.getElementById('updated-time').innerHTML = sheetJson[0]['updated'];
            document.getElementById('total-cases').innerHTML = displayTotalCases.toLocaleString();
            document.getElementById('total-related-deaths').innerHTML = displayRelatedDeaths.toLocaleString();
            document.getElementById('total-covid-deaths').innerHTML = displayCovidDeaths.toLocaleString();
            document.getElementById('total-hospitalizations').innerHTML = displayTotalHospitalizations.toLocaleString();

            // var notHospitalizationsArrayLength = sheetJson.length - 1;
            // var hospitalizationsArrayLength = sheetJson.length;
            // var allData = sheetJson.slice(0, -1);
            // var recentData = sheetJson.slice(-90, notHospitalizationsArrayLength); // Get last 90 days of data for all charts except current hospitalizations
            // var recentHospitalizationsData = sheetJson.slice(-90);

            // var casesAverageArray = [];
            // for (var i = 0; i < sheetJson.length; i++) {
            //     casesAverageArray.push(
            //         sheetJson[i].reported daily cases average
            //     )
            // };
            // casesAverageArray = casesAverageArray.map(function(each_element) {
            //     return parseInt(each_element).toFixed(1);
            // });

            /// DAILY CASES CHART
            var dailyCasesChart = c3.generate({
                bindto: '#daily-chart',
                size: {
                    height: 175
                    //width: 800
                },
                data: {
                    json: sheetJson,
                    keys: {
                        x: 'date',
                        value: ['onset daily cases', 'reported daily cases average']
                    },
                    names: {
                        'onset daily cases': 'Cases by illness onset date',
                        'reported daily cases average': 'Average cases by reported date'
                    },
                    types: {
                        'onset daily cases': 'bar',
                        'reported daily cases average': 'line'
                    },
                    colors: {
                        'onset daily cases': 'rgba(8,81,156,.4)',
                        'reported daily cases average': 'rgba(8,81,156,1)'
                    },
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            rotate: 0,
                            multiline: false,
                            culling: true
                        },
                        padding: {
                            right: 2
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format(',')
                        }
                    }
                },
                bar: {
                    width: {
                        ratio: .65
                    }
                },
                regions: [
                    { axis: 'x', start: 54, end: 85, class: 'region1' }
                ],
                grid: {
                    x: {
                        show: true
                    },
                    y: {
                        show: true
                    }
                },
                point: {
                    r: 0
                }
            });

            /// DAILY DEATHS CHART
            var dailyDeathsChart = c3.generate({
                bindto: '#daily-deaths-chart',
                size: {
                    height: 175
                },
                data: {
                    json: sheetJson,
                    keys: {
                        x: 'date',
                        value: ['death certificate daily deaths', 'reported daily deaths average']
                    },
                    names: {
                        'death certificate daily deaths': 'Deaths by death certificate date',
                        'reported daily deaths average': 'Average deaths by reported date'
                    },
                    types: {
                        'death certificate daily deaths': 'bar',
                        'reported daily deaths average': 'line'
                    },
                    colors: {
                        'death certificate daily deaths': 'rgba(165,15,21,.4)',
                        'reported daily deaths average': 'rgba(165,15,21,1)'
                    },
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            rotate: 0,
                            multiline: false,
                            culling: true
                        },
                        padding: {
                            right: 2
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format(',')
                        }
                    }
                },
                bar: {
                    width: {
                        ratio: .65
                    }
                },
                regions: [
                    { axis: 'x', start: 54, end: 85, class: 'region1' }
                ],
                grid: {
                    x: {
                        show: true
                    },
                    y: {
                        show: true
                    }
                },
                point: {
                    r: 0
                }
            });

            /// DAILY CUMULATIVE HOSPITALIZATIONS CHART
            var dailyHospitalizationsChart = c3.generate({
                bindto: '#daily-hospitalizations-chart',
                size: {
                    height: 175
                },
                data: {
                    json: sheetJson,
                    keys: {
                        x: 'date',
                        value: ['onset daily hospitalizations', 'reported daily hospitalizations average']
                    },
                    names: {
                        'onset daily hospitalizations': 'Hospitalizations by illness onset date',
                        'reported daily hospitalizations average': 'Average hospitalizations by reported date'
                    },
                    types: {
                        'onset daily hospitalizations': 'bar',
                        'reported daily hospitalizations average': 'line'
                    },
                    colors: {
                        'onset daily hospitalizations': 'rgba(254,178,76,.4)',
                        'reported daily hospitalizations average': 'rgba(254,178,76,1)'
                    },
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            rotate: 0,
                            multiline: false,
                            culling: true
                        },
                        padding: {
                            right: 2
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format(',')
                        }
                    }
                },
                bar: {
                    width: {
                        ratio: .65
                    }
                },
                regions: [
                    { axis: 'x', start: 54, end: 85, class: 'region1' }
                ],
                grid: {
                    x: {
                        show: true
                    },
                    y: {
                        show: true
                    }
                },
                point: {
                    r: 0
                }
            });

            /***** SMALL AT A GLANCE CHARTS *****/

            var recentData = sheetJson.slice(-90); // last 90 days of data

            /// SMALL DAILY CASES CHART    
            var dailyCasesChartSmall = c3.generate({
                bindto: '#daily-cases-chart-small',
                size: {
                    height: smallChartHeight
                    //width: 800
                },
                padding: {
                    left: 35
                },
                data: {
                    json: recentData,
                    keys: {
                        x: 'date',
                        value: ['reported daily cases average']
                    },
                    names: {
                        'reported daily cases average': 'Cases'
                    },
                    type: 'line',
                    colors: {
                        'reported daily cases average': 'rgba(8,81,156,1)'
                    },
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            count: 2
                        },
                        padding: {
                            right: 13
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format(','),
                        },
                        show: true,
                        min: 0
                    }
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: false
                    }
                },
                legend: {
                    show: false
                },
                tooltip: {
                    show: true
                },
                point: {
                    r: 0
                }
            });



            /// SMALL DAILY DEATHS CHART
            var dailyDeathsChartSmall = c3.generate({
                bindto: '#daily-deaths-chart-small',
                size: {
                    height: smallChartHeight
                },
                padding: {
                    left: 26
                },
                data: {
                    json: recentData,
                    keys: {
                        x: 'date',
                        value: ['reported daily deaths average']
                    },
                    names: {
                        'reported daily deaths average': 'Deaths'
                    },
                    type: 'line',
                    colors: {
                        'reported daily deaths average': 'rgba(165,15,21,1)'
                    },
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            count: 2
                        },
                        padding: {
                            right: 13
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format(',')
                        },
                        show: true,
                        min: 0
                    }
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: false
                    }
                },
                legend: {
                    show: false
                },
                point: {
                    r: 0
                }
            });

            /// MOBILE - SMALL DAILY CASES CHART    
            var dailyCasesChartSmall = c3.generate({
                bindto: '#daily-cases-chart-small-mobile',
                size: {
                    height: smallChartHeight
                    //width: 800
                },
                padding: {
                    left: 35
                },
                data: {
                    json: recentData,
                    keys: {
                        x: 'date',
                        value: ['reported daily cases average']
                    },
                    names: {
                        'reported daily cases average': 'Cases'
                    },
                    type: 'line',
                    colors: {
                        'reported daily cases average': 'rgba(8,81,156,1)'
                    },
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            count: 2
                        },
                        padding: {
                            right: 13
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format(','),
                        },
                        show: true,
                        min: 0
                    }
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: false
                    }
                },
                legend: {
                    show: false
                },
                tooltip: {
                    show: true
                },
                point: {
                    r: 0
                }
            });

            /// MOBILE - SMALL DAILY DEATHS CHART
            var dailyDeathsChartSmall = c3.generate({
                bindto: '#daily-deaths-chart-small-mobile',
                size: {
                    height: smallChartHeight
                },
                padding: {
                    left: 26
                },
                data: {
                    json: recentData,
                    keys: {
                        x: 'date',
                        value: ['reported daily deaths average']
                    },
                    names: {
                        'reported daily deaths average': 'Deaths'
                    },
                    type: 'line',
                    colors: {
                        'reported daily deaths average': 'rgba(165,15,21,1)'
                    },
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            count: 2
                        },
                        padding: {
                            right: 13
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format(',')
                        },
                        show: true,
                        min: 0
                    }
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: false
                    }
                },
                legend: {
                    show: false
                },
                point: {
                    r: 0
                }
            });

            $('#daily-cases-chart-small').find('.c3-circle:last').css({ r: 3 });
            $('#daily-deaths-chart-small').find('.c3-circle:last').css({ r: 3 });
            $('#daily-cases-chart-small-mobile').find('.c3-circle:last').css({ r: 3 });
            $('#daily-deaths-chart-small-mobile').find('.c3-circle:last').css({ r: 3 });

        }
    })
});

/// PEOPLE CURRENTLY HOSPITALIZED CHARTS
//var chartSpreadsheetID = '1LbgEc_fJasdCwRpfkHSMyXYXx3V5szrJSbfJcCNl2fQ/8';
//var url = "https://spreadsheets.google.com/feeds/list/" + chartSpreadsheetID + "/public/full?alt=json";
//var tab8Data = "./data/api_tab_8.json";

//$.getJSON(tab8Data, function(data) {
//var sheetJson = data;

$(document).ready(function() {
    var sheetID = '1LbgEc_fJasdCwRpfkHSMyXYXx3V5szrJSbfJcCNl2fQ';
    var tabID = 1101748345;
    Papa.parse('https://docs.google.com/spreadsheets/d/' + sheetID + '/export?format=csv&id=' + sheetID + '&gid=' + tabID, {
        download: true,
        header: true,
        complete: function(results) {
            var sheetJson = results.data;

            var smallChartHeight = 170;
            var recentData = sheetJson.slice(-91); // last 90 days of data
            var recentDataHospitalizations = sheetJson.slice(-14);

            /// SMALL HOSPITALIZATIONS CHART
            var currentHospitalizationsChartSmall = c3.generate({
                bindto: '#current-hospitalizations-chart-small',
                size: {
                    height: smallChartHeight
                },
                padding: {
                    left: 35
                },
                data: {
                    json: recentDataHospitalizations,
                    keys: {
                        x: 'date',
                        value: ['confirmed cases hospitalized']
                    },
                    names: {
                        'confirmed cases hospitalized': 'Hospitalized'
                    },
                    type: 'line',
                    colors: {
                        'confirmed cases hospitalized': 'rgba(255,138,74,.8)'

                    }
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            count: 2
                        },
                        padding: {
                            right: 13
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format(',')
                        },
                        show: true,
                        min: 0
                    }
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: false
                    }
                },
                legend: {
                    show: false
                },
                point: {
                    r: 0
                }
            });

            /// MOBILE - SMALL HOSPITALIZATIONS CHART
            var currentHospitalizationsChartSmall = c3.generate({
                bindto: '#current-hospitalizations-chart-small-mobile',
                size: {
                    height: smallChartHeight
                },
                padding: {
                    left: 26
                },
                data: {
                    json: recentDataHospitalizations,
                    keys: {
                        x: 'date',
                        value: ['confirmed cases hospitalized']
                    },
                    names: {
                        'confirmed cases hospitalized': 'Hospitalized'
                    },
                    type: 'line',
                    colors: {
                        'confirmed cases hospitalized': 'rgba(255,138,74,.8)'

                    }
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            count: 2
                        },
                        padding: {
                            right: 13
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format(',')
                        },
                        show: true,
                        min: 0
                    }
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: false
                    }
                },
                legend: {
                    show: false
                },
                point: {
                    r: 0
                }
            });

            /// CURRENT PEOPLE HOSPITALIZED CHART
            var currentHospitalizationsChart = c3.generate({
                bindto: '#current-hospitalizations-chart',
                size: {
                    height: 250
                },
                data: {
                    json: sheetJson,
                    keys: {
                        x: 'date',
                        value: ['confirmed cases hospitalized'/*, 'suspected cases hospitalized'*/]
                    },
                    names: {
                        'confirmed cases hospitalized': 'Confirmed cases',
                        // 'suspected cases hospitalized': 'Suspected cases'
                    },
                    type: 'bar',
                    groups: [
                        ['confirmed cases hospitalized'/*, 'suspected cases hospitalized'*/]
                    ],
                    colors: {
                        'confirmed cases hospitalized': 'rgba(255,138,74,.8)',
                        // 'suspected cases hospitalized': 'rgba(255,138,74,.3)'

                    },
                    order: null
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            rotate: 0,
                            multiline: false,
                            culling: true
                        },
                        padding: {
                            right: 2
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format(',')
                        }
                    }
                },
                bar: {
                    width: {
                        ratio: .65
                    }
                },
                grid: {
                    x: {
                        show: true
                    },
                    y: {
                        show: true
                    }
                }
            });
            $('#current-hospitalizations-chart-small').find('.c3-circle:last').css({ r: 3 });
            $('#current-hospitalizations-chart-small-mobile').find('.c3-circle:last').css({ r: 3 });
        }
    })
});

/// DAILY TESTS/POSITIVITY CHARTS

//var chartSpreadsheetID = '1LbgEc_fJasdCwRpfkHSMyXYXx3V5szrJSbfJcCNl2fQ/6';
//var url = "https://spreadsheets.google.com/feeds/list/" + chartSpreadsheetID + "/public/full?alt=json";
//var tab6Data = "./data/api_tab_6.json";

//$.getJSON(tab6Data, function(data) {
//var sheetJson = data;

$(document).ready(function() {
    var sheetID = '1LbgEc_fJasdCwRpfkHSMyXYXx3V5szrJSbfJcCNl2fQ';
    var tabID = 448679738;
    Papa.parse('https://docs.google.com/spreadsheets/d/' + sheetID + '/export?format=csv&id=' + sheetID + '&gid=' + tabID, {
        download: true,
        header: true,
        complete: function(results) {
            var sheetJson = results.data;

            var recentData = sheetJson.slice(-90); // last 90 days of data

            /// SMALL TESTING CHART
            var testingRateChartSmall = c3.generate({
                bindto: '#testing-rate-chart-small',
                size: {
                    height: smallChartHeight
                },
                padding: {
                    left: 26
                },
                data: {
                    json: recentData,
                    keys: {
                        x: 'date',
                        value: ['testing rate average']
                    },
                    names: {
                        'testing rate average': 'Tests'
                    },
                    type: 'line',
                    colors: {
                        'testing rate average': 'rgba(0,0,0,.3)'
                    },
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            count: 2
                        },
                        padding: {
                            right: 13
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format(',')
                        },
                        show: true,
                        min: 0
                    }
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: false
                    }
                },
                legend: {
                    show: false
                },
                point: {
                    r: 0
                }
            });

            /// SMALL POSITIVITY CHART
            var positivityRateChartSmall = c3.generate({
                bindto: '#positivity-rate-chart-small',
                size: {
                    height: smallChartHeight
                },
                padding: {
                    left: 35
                },
                data: {
                    json: recentData,
                    keys: {
                        x: 'date',
                        value: ['percent positive average']
                    },
                    names: {
                        'percent positive average': 'Positive'
                    },
                    type: 'line',
                    colors: {
                        'percent positive average': 'rgba(0,0,0,1)'
                    },
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            count: 2
                        },
                        padding: {
                            right: 14
                        }
                    },
                    y: {
                        tick: {
                            format: (function(d) { return d + "%"; }),
                            // values: [0, 2, 4, 6, 8, 10]
                        },
                        show: true,
                        min: 0
                    }
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: false
                    }
                },
                legend: {
                    show: false
                },
                point: {
                    r: 0
                }
            });

            /// MOBILE - SMALL TESTING CHART
            var testingRateChartSmall = c3.generate({
                bindto: '#testing-rate-chart-small-mobile',
                size: {
                    height: smallChartHeight
                },
                padding: {
                    left: 26
                },
                data: {
                    json: recentData,
                    keys: {
                        x: 'date',
                        value: ['testing rate average']
                    },
                    names: {
                        'testing rate average': 'Tests'
                    },
                    type: 'line',
                    colors: {
                        'testing rate average': 'rgba(0,0,0,.3)'
                    },
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            count: 2
                        },
                        padding: {
                            right: 13
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format(',')
                        },
                        show: true,
                        min: 0
                    }
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: false
                    }
                },
                legend: {
                    show: false
                },
                point: {
                    r: 0
                }
            });

            /// MOBILE - SMALL POSITIVITY CHART
            var positivityRateChartSmall = c3.generate({
                bindto: '#positivity-rate-chart-small-mobile',
                size: {
                    height: smallChartHeight
                },
                padding: {
                    left: 35
                },
                data: {
                    json: recentData,
                    keys: {
                        x: 'date',
                        value: ['percent positive average']
                    },
                    names: {
                        'percent positive average': 'Positive'
                    },
                    type: 'line',
                    colors: {
                        'percent positive average': 'rgba(0,0,0,1)'
                    },
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            count: 2
                        },
                        padding: {
                            right: 13
                        }
                    },
                    y: {
                        tick: {
                            format: (function(d) { return d + "%"; }),
                            // values: [0, 2, 4, 6, 8, 10]
                        },
                        show: true,
                        min: 0
                    }
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: false
                    }
                },
                legend: {
                    show: false
                },
                point: {
                    r: 0
                }
            });

            $('#testing-rate-chart-small').find('.c3-circle:last').css({ r: 3 });
            $('#positivity-rate-chart-small').find('.c3-circle:last').css({ r: 3 });
            $('#testing-rate-chart-small-mobile').find('.c3-circle:last').css({ r: 3 });
            $('#positivity-rate-chart-small-mobile').find('.c3-circle:last').css({ r: 3 });

            // DAILY TESTS AND POSITIVITY CHARTS
            var dailyTestsChart = c3.generate({
                bindto: '#daily-tests-chart',
                size: {
                    height: 250
                },
                data: {
                    json: sheetJson,
                    keys: {
                        x: 'date',
                        value: ['testing rate average', 'percent positive average']
                    },
                    names: {
                        'testing rate average': 'Average tests per 100,000 people',
                        'percent positive average': 'Average positive tests'
                    },
                    types: {
                        'testing rate average': 'bar',
                        'percent positive average': 'line'
                    },
                    colors: {
                        'testing rate average': 'rgba(0,0,0,.2)',
                        'percent positive average': 'rgba(0,0,0,1)'
                    },
                    axes: {
                        'testing rate average': 'y',
                        'percent positive average': 'y2'
                    }
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            rotate: 0,
                            multiline: false,
                            culling: true
                        },
                        padding: {
                            right: 2
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format(',')
                        },
                        label: {
                            text: 'Bars: Tests per 100,000',
                            position: 'outer-middle'
                        }
                    },
                    y2: {
                        show: true,
                        tick: {
                            format: function(value) {
                                //return d3.format('%')(value / 100)
                                return (value) + '%'
                            }
                        },
                        label: {
                            text: 'Line: Positive tests',
                            position: 'outer-middle'
                        }
                    }
                },
                bar: {
                    width: {
                        ratio: .65
                    }
                },
                grid: {
                    x: {
                        show: true
                    },
                    y: {
                        show: true
                    }
                },
                point: {
                    r: 0
                }
            })
        }
    })
});

/// RACE CHARTS
//var chartSpreadsheetID = '1LbgEc_fJasdCwRpfkHSMyXYXx3V5szrJSbfJcCNl2fQ/4';
//var url = "https://spreadsheets.google.com/feeds/list/" + chartSpreadsheetID + "/public/full?alt=json";
//var tab4Data = "./data/api_tab_4.json";

//$.getJSON(tab4Data, function(data) {
//var sheetJson = data;

$(document).ready(function() {
    var sheetID = '1LbgEc_fJasdCwRpfkHSMyXYXx3V5szrJSbfJcCNl2fQ';
    var tabID = 1385984408;
    Papa.parse('https://docs.google.com/spreadsheets/d/' + sheetID + '/export?format=csv&id=' + sheetID + '&gid=' + tabID, {
        download: true,
        header: true,
        complete: function(results) {
            var sheetJson = results.data;

            var ageChart = c3.generate({
                bindto: '#race-chart',
                size: {
                    height: 650
                },
                data: {
                    json: sheetJson,
                    keys: {
                        x: 'race',
                        value: ['cases', 'population', 'deaths']
                    },
                    type: 'bar',
                    names: {
                        'cases': 'Cases',
                        'deaths': 'Deaths',
                        'population': 'Population',
                    },
                    colors: {
                        'cases': 'rgba(8,81,156,.5)',
                        'deaths': 'rgba(165,15,21,.5)',
                        'population': 'rgba(0,0,0,.5)'
                    },
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            rotate: 0,
                            multiline: true
                        }
                    },
                    y: {
                        tick: {
                            format: function(value) {
                                return d3.format('.1%')(value / 100)
                            }
                        }
                    },
                    rotated: true
                },
                grid: {
                    x: {
                        show: true
                    },
                    y: {
                        show: true
                    }
                }
            })
        }
    })
});

/// AGE CHARTS
//var chartSpreadsheetID = '1LbgEc_fJasdCwRpfkHSMyXYXx3V5szrJSbfJcCNl2fQ/5';
//var url = "https://spreadsheets.google.com/feeds/list/" + chartSpreadsheetID + "/public/full?alt=json";
//var tab5Data = "./data/api_tab_5.json";

/// AGE RAW NUMBERS CHART
//$.getJSON(tab5Data, function(data) {
//var sheetJson = data;

$(document).ready(function() {
    var sheetID = '1LbgEc_fJasdCwRpfkHSMyXYXx3V5szrJSbfJcCNl2fQ';
    var tabID = 1724478318;
    Papa.parse('https://docs.google.com/spreadsheets/d/' + sheetID + '/export?format=csv&id=' + sheetID + '&gid=' + tabID, {
        download: true,
        header: true,
        complete: function(results) {
            var sheetJson = results.data;

            var ageChart = c3.generate({
                bindto: '#age-chart',
                size: {
                    height: 250
                },
                data: {
                    json: sheetJson,
                    keys: {
                        x: 'age',
                        value: ['not hospitalized', 'hospitalized', 'deaths']
                    },
                    type: 'bar',
                    names: {
                        'not hospitalized': 'Not hospitalized',
                        'hospitalized': 'Hospitalized',
                        'deaths': 'Deaths',
                    },
                    colors: {
                        'not hospitalized': 'rgba(204,204,204,.5)',
                        'hospitalized': 'rgba(254,178,76,.5)',
                        'deaths': 'rgba(165,15,21,.5)'
                    },
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            rotate: 0,
                            multiline: false
                        },
                    },
                    y: {
                        tick: {
                            format: d3.format(',')
                        }
                    }
                },
                grid: {
                    x: {
                        show: true
                    },
                    y: {
                        show: true
                    }
                },
                point: {
                    r: 3
                }
            });

            /// AGE PERCENT CHART
            var ageChart = c3.generate({
                bindto: '#age-pct-chart',
                size: {
                    height: 250
                },
                data: {
                    json: sheetJson,
                    keys: {
                        x: 'age',
                        value: ['not hospitalized pct', 'hospitalized pct', 'deaths pct']
                    },
                    type: 'bar',
                    groups: [
                        ['not hospitalized pct', 'hospitalized pct', 'deaths pct']
                    ],
                    names: {
                        'not hospitalized pct': 'Not hospitalized',
                        'hospitalized pct': 'Hospitalized',
                        'deaths pct': 'Deaths',
                    },
                    colors: {
                        'not hospitalized pct': 'rgba(204,204,204,.5)',
                        'hospitalized pct': 'rgba(254,178,76,.5)',
                        'deaths pct': 'rgba(165,15,21,.5)'
                    },
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            rotate: 0,
                            multiline: false
                        },
                    },
                    y: {
                        tick: {
                            format: d3.format(".1%")
                        },
                        show: true
                    }
                },
                grid: {
                    x: {
                        show: true
                    },
                    y: {
                        show: true
                    }
                },
                point: {
                    r: 3
                }
            })
        }
    })
});

/******************** COUNTY-LEVEL GRAPHICS ********************/

//var countyDataSpreadsheetID = '1LbgEc_fJasdCwRpfkHSMyXYXx3V5szrJSbfJcCNl2fQ/3';
//var url = "https://spreadsheets.google.com/feeds/list/" + countyDataSpreadsheetID + "/public/full?alt=json";
//var tab3Data = "./data/api_tab_3.json";

var caseColor = 'rgba(153,142,195,1)';
var deathColor = 'rgba(241,163,64,1)';

//$.getJSON(tab3Data, function(data) {
//var sheetJson = data;

$(document).ready(function() {
    var sheetID = '1LbgEc_fJasdCwRpfkHSMyXYXx3V5szrJSbfJcCNl2fQ';
    var tabID = 409510484;
    Papa.parse('https://docs.google.com/spreadsheets/d/' + sheetID + '/export?format=csv&id=' + sheetID + '&gid=' + tabID, {
        download: true,
        header: true,
        complete: function(results) {
            var sheetJson = results.data;

            // COUNTY DAILY CASE CHARTS
            var smallChartHeight = 200;
            var yAxisMax = null;
            var lastRow = (sheetJson.length - 1);
            var lastWeekRow = (sheetJson.length - 8);

            var adamsChange = Number(sheetJson[lastRow].adams_daily_cases_average) - Number(sheetJson[lastWeekRow].adams_daily_cases_average);
            var arapahoeChange = Number(sheetJson[lastRow].arapahoe_daily_cases_average) - Number(sheetJson[lastWeekRow].arapahoe_daily_cases_average);
            var boulderChange = Number(sheetJson[lastRow].boulder_daily_cases_average) - Number(sheetJson[lastWeekRow].boulder_daily_cases_average);
            var denverChange = Number(sheetJson[lastRow].denver_daily_cases_average) - Number(sheetJson[lastWeekRow].denver_daily_cases_average);
            var douglasChange = Number(sheetJson[lastRow].douglas_daily_cases_average) - Number(sheetJson[lastWeekRow].douglas_daily_cases_average);
            var elpasoChange = Number(sheetJson[lastRow].el_paso_daily_cases_average) - Number(sheetJson[lastWeekRow].el_paso_daily_cases_average);
            var jeffersonChange = Number(sheetJson[lastRow].jefferson_daily_cases_average) - Number(sheetJson[lastWeekRow].jefferson_daily_cases_average);
            var larimerChange = Number(sheetJson[lastRow].larimer_daily_cases_average) - Number(sheetJson[lastWeekRow].larimer_daily_cases_average);
            var puebloChange = Number(sheetJson[lastRow].pueblo_daily_cases_average) - Number(sheetJson[lastWeekRow].pueblo_daily_cases_average);
            var weldChange = Number(sheetJson[lastRow].weld_daily_cases_average) - Number(sheetJson[lastWeekRow].weld_daily_cases_average);

            // Up triangle if cases have increased, down if decreased
            const changeText = function(x, y) {
                if (x < 0) { document.getElementById(y).innerHTML = '&#9660; <span class="cases-change-number">' + Math.abs(x) + '</span> from a week ago' } else { document.getElementById(y).innerHTML = '&#9650; <span class="cases-change-number">' + Math.abs(x) + '</span> from a week ago' }
            };
            changeText(Math.round(adamsChange), 'adams-change');
            changeText(Math.round(arapahoeChange), 'arapahoe-change');
            changeText(Math.round(boulderChange), 'boulder-change');
            changeText(Math.round(denverChange), 'denver-change');
            changeText(Math.round(douglasChange), 'douglas-change');
            changeText(Math.round(elpasoChange), 'elpaso-change');
            changeText(Math.round(jeffersonChange), 'jefferson-change');
            changeText(Math.round(larimerChange), 'larimer-change');
            changeText(Math.round(puebloChange), 'pueblo-change');
            changeText(Math.round(weldChange), 'weld-change');

            //var recentData = sheetJson.slice(-90); // last 90 days of data

            // ADAMS COUNTY
            var adamsDailyCasesChart = c3.generate({
                bindto: '#adams-daily-cases',
                size: {
                    height: smallChartHeight
                    //width: 800
                },
                padding: {
                    left: 35
                },
                data: {
                    json: sheetJson,
                    keys: {
                        x: 'date',
                        value: ['adams_daily_cases', 'adams_daily_cases_average']
                    },
                    names: {
                        'adams_daily_cases': 'Cases',
                        'adams_daily_cases_average': 'Average'
                    },
                    types: {
                        'adams_daily_cases': 'bar',
                        'adams_daily_cases_average': 'line'
                    },
                    colors: {
                        'adams_daily_cases': 'rgba(8,81,156,.2)',
                        'adams_daily_cases_average': 'rgba(8,81,156,1)'
                    },
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            count: 2
                        },
                        padding: {
                            right: 15
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format(',')
                        },
                        show: true,
                        max: yAxisMax
                    }
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: false
                    }
                },
                legend: {
                    show: true
                },
                tooltip: {
                    show: true
                },
                point: {
                    r: 0
                }
            })

            // ARAPAHOE COUNTY
            var arapahoeDailyCasesChart = c3.generate({
                bindto: '#arapahoe-daily-cases',
                size: {
                    height: smallChartHeight
                    //width: 800
                },
                padding: {
                    left: 35
                },
                data: {
                    json: sheetJson,
                    keys: {
                        x: 'date',
                        value: ['arapahoe_daily_cases', 'arapahoe_daily_cases_average']
                    },
                    names: {
                        'arapahoe_daily_cases': 'Cases',
                        'arapahoe_daily_cases_average': 'Average'
                    },
                    types: {
                        'arapahoe_daily_cases': 'bar',
                        'arapahoe_daily_cases_average': 'line'
                    },
                    colors: {
                        'arapahoe_daily_cases': 'rgba(8,81,156,.2)',
                        'arapahoe_daily_cases_average': 'rgba(8,81,156,1)'
                    },
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            count: 2
                        },
                        padding: {
                            right: 13
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format(','),
                        },
                        show: true,
                        max: yAxisMax
                    }
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: false
                    }
                },
                legend: {
                    show: true
                },
                tooltip: {
                    show: true
                },
                point: {
                    r: 0
                }
            })

            //BOULDER  COUNTY
            var boulderDailyCasesChart = c3.generate({
                bindto: '#boulder-daily-cases',
                size: {
                    height: smallChartHeight
                    //width: 800
                },
                padding: {
                    left: 35
                },
                data: {
                    json: sheetJson,
                    keys: {
                        x: 'date',
                        value: ['boulder_daily_cases', 'boulder_daily_cases_average']
                    },
                    names: {
                        'boulder_daily_cases': 'Cases',
                        'boulder_daily_cases_average': 'Average'
                    },
                    types: {
                        'boulder_daily_cases': 'bar',
                        'boulder_daily_cases_average': 'line'
                    },
                    colors: {
                        'boulder_daily_cases': 'rgba(8,81,156,.2)',
                        'boulder_daily_cases_average': 'rgba(8,81,156,1)'
                    },
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            count: 2
                        },
                        padding: {
                            right: 13
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format(','),
                        },
                        show: true,
                        max: yAxisMax
                    }
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: false
                    }
                },
                legend: {
                    show: true
                },
                tooltip: {
                    show: true
                },
                point: {
                    r: 0
                }
            })

            // DENVER COUNTY
            var denverDailyCasesChart = c3.generate({
                bindto: '#denver-daily-cases',
                size: {
                    height: smallChartHeight
                    //width: 800
                },
                padding: {
                    left: 35
                },
                data: {
                    json: sheetJson,
                    keys: {
                        x: 'date',
                        value: ['denver_daily_cases', 'denver_daily_cases_average']
                    },
                    names: {
                        'denver_daily_cases': 'Cases',
                        'denver_daily_cases_average': 'Average'
                    },
                    types: {
                        'denver_daily_cases': 'bar',
                        'denver_daily_cases_average': 'line'
                    },
                    colors: {
                        'denver_daily_cases': 'rgba(8,81,156,.2)',
                        'denver_daily_cases_average': 'rgba(8,81,156,1)'
                    },
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            count: 2
                        },
                        padding: {
                            right: 13
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format(','),
                        },
                        show: true,
                        max: yAxisMax
                    }
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: false
                    }
                },
                legend: {
                    show: true
                },
                tooltip: {
                    show: true
                },
                point: {
                    r: 0
                }
            })

            // DOUGLAS  COUNTY
            var douglasDailyCasesChart = c3.generate({
                bindto: '#douglas-daily-cases',
                size: {
                    height: smallChartHeight
                    //width: 800
                },
                padding: {
                    left: 35
                },
                data: {
                    json: sheetJson,
                    keys: {
                        x: 'date',
                        value: ['douglas_daily_cases', 'douglas_daily_cases_average']
                    },
                    names: {
                        'douglas_daily_cases': 'Cases',
                        'douglas_daily_cases_average': 'Average'
                    },
                    types: {
                        'douglas_daily_cases': 'bar',
                        'douglas_daily_cases_average': 'line'
                    },
                    colors: {
                        'douglas_daily_cases': 'rgba(8,81,156,.2)',
                        'douglas_daily_cases_average': 'rgba(8,81,156,1)'
                    },
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            count: 2
                        },
                        padding: {
                            right: 13
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format(','),
                        },
                        show: true,
                        max: yAxisMax
                    }
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: false
                    }
                },
                legend: {
                    show: true
                },
                tooltip: {
                    show: true
                },
                point: {
                    r: 0
                }
            })

            // EL PASO COUNTY
            var elpasoDailyCasesChart = c3.generate({
                bindto: '#el-paso-daily-cases',
                size: {
                    height: smallChartHeight
                    //width: 800
                },
                padding: {
                    left: 35
                },
                data: {
                    json: sheetJson,
                    keys: {
                        x: 'date',
                        value: ['el_paso_daily_cases', 'el_paso_daily_cases_average']
                    },
                    names: {
                        'el_paso_daily_cases': 'Cases',
                        'el_paso_daily_cases_average': 'Average'
                    },
                    types: {
                        'el_paso_daily_cases': 'bar',
                        'el_paso_daily_cases_average': 'line'
                    },
                    colors: {
                        'el_paso_daily_cases': 'rgba(8,81,156,.2)',
                        'el_paso_daily_cases_average': 'rgba(8,81,156,1)'
                    },
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            count: 2
                        },
                        padding: {
                            right: 13
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format(','),
                        },
                        show: true,
                        max: yAxisMax
                    }
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: false
                    }
                },
                legend: {
                    show: true
                },
                tooltip: {
                    show: true
                },
                point: {
                    r: 0
                }
            })

            // JEFFERSON COUNTY
            var jeffersonDailyCasesChart = c3.generate({
                bindto: '#jefferson-daily-cases',
                size: {
                    height: smallChartHeight
                    //width: 800
                },
                padding: {
                    left: 35
                },
                data: {
                    json: sheetJson,
                    keys: {
                        x: 'date',
                        value: ['jefferson_daily_cases', 'jefferson_daily_cases_average']
                    },
                    names: {
                        'jefferson_daily_cases': 'Cases',
                        'jefferson_daily_cases_average': 'Average'
                    },
                    types: {
                        'jefferson_daily_cases': 'bar',
                        'jefferson_daily_cases_average': 'line'
                    },
                    colors: {
                        'jefferson_daily_cases': 'rgba(8,81,156,.2)',
                        'jefferson_daily_cases_average': 'rgba(8,81,156,1)'
                    },
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            count: 2
                        },
                        padding: {
                            right: 13
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format(','),
                        },
                        show: true,
                        max: yAxisMax
                    }
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: false
                    }
                },
                legend: {
                    show: true
                },
                tooltip: {
                    show: true
                },
                point: {
                    r: 0
                }
            })

            // LARIMER COUNTY
            var larimerDailyCasesChart = c3.generate({
                bindto: '#larimer-daily-cases',
                size: {
                    height: smallChartHeight
                    //width: 800
                },
                padding: {
                    left: 35
                },
                data: {
                    json: sheetJson,
                    keys: {
                        x: 'date',
                        value: ['larimer_daily_cases', 'larimer_daily_cases_average']
                    },
                    names: {
                        'larimer_daily_cases': 'Cases',
                        'larimer_daily_cases_average': 'Average'
                    },
                    types: {
                        'larimer_daily_cases': 'bar',
                        'larimer_daily_cases_average': 'line'
                    },
                    colors: {
                        'larimer_daily_cases': 'rgba(8,81,156,.2)',
                        'larimer_daily_cases_average': 'rgba(8,81,156,1)'
                    },
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            count: 2
                        },
                        padding: {
                            right: 13
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format(','),
                        },
                        show: true,
                        max: yAxisMax
                    }
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: false
                    }
                },
                legend: {
                    show: true
                },
                tooltip: {
                    show: true
                },
                point: {
                    r: 0
                }
            })

            // PUEBLO COUNTY
            var puebloDailyCasesChart = c3.generate({
                bindto: '#pueblo-daily-cases',
                size: {
                    height: smallChartHeight
                    //width: 800
                },
                padding: {
                    left: 35
                },
                data: {
                    json: sheetJson,
                    keys: {
                        x: 'date',
                        value: ['pueblo_daily_cases', 'pueblo_daily_cases_average']
                    },
                    names: {
                        'pueblo_daily_cases': 'Cases',
                        'pueblo_daily_cases_average': 'Average'
                    },
                    types: {
                        'pueblo_daily_cases': 'bar',
                        'pueblo_daily_cases_average': 'line'
                    },
                    colors: {
                        'pueblo_daily_cases': 'rgba(8,81,156,.2)',
                        'pueblo_daily_cases_average': 'rgba(8,81,156,1)'
                    },
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            count: 2
                        },
                        padding: {
                            right: 13
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format(','),
                        },
                        show: true,
                        max: yAxisMax
                    }
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: false
                    }
                },
                legend: {
                    show: true
                },
                tooltip: {
                    show: true
                },
                point: {
                    r: 0
                }
            })

            // WELD COUNTY
            var weldDailyCasesChart = c3.generate({
                bindto: '#weld-daily-cases',
                size: {
                    height: smallChartHeight
                    //width: 800
                },
                padding: {
                    left: 35
                },
                data: {
                    json: sheetJson,
                    keys: {
                        x: 'date',
                        value: ['weld_daily_cases', 'weld_daily_cases_average']
                    },
                    names: {
                        'weld_daily_cases': 'Cases',
                        'weld_daily_cases_average': 'Average'
                    },
                    types: {
                        'weld_daily_cases': 'bar',
                        'weld_daily_cases_average': 'line'
                    },
                    colors: {
                        'weld_daily_cases': 'rgba(8,81,156,.2)',
                        'weld_daily_cases_average': 'rgba(8,81,156,1)'
                    },
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            count: 2
                        },
                        padding: {
                            right: 13
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format(','),
                        },
                        show: true,
                        max: yAxisMax
                    }
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: false
                    }
                },
                legend: {
                    show: true
                },
                tooltip: {
                    show: true
                },
                point: {
                    r: 0
                }
            });

            /// ALL COUNTY CASE RATE LINE CHART
            var rateData = [];
            for (var i = 0; i < sheetJson.length; i++) {
                rateData.push({
                    'date': sheetJson[i].date,
                    'adamsCaseRate': ((sheetJson[i].adams_cases_average / 511473) * 100000).toFixed(1),
                    'arapahoeCaseRate': ((sheetJson[i].arapahoe_cases_average / 651342) * 100000).toFixed(1),
                    'boulderCaseRate': ((sheetJson[i].boulder_cases_average / 325476) * 100000).toFixed(1),
                    'denverCaseRate': ((sheetJson[i].denver_cases_average / 717797) * 100000).toFixed(1),
                    'douglasCaseRate': ((sheetJson[i].douglas_cases_average / 342842) * 100000).toFixed(1),
                    'elpasoCaseRate': ((sheetJson[i].el_paso_cases_average / 714395) * 100000).toFixed(1),
                    'jeffersonCaseRate': ((sheetJson[i].jefferson_cases_average / 579491) * 100000).toFixed(1),
                    'larimerCaseRate': ((sheetJson[i].larimer_cases_average / 350362) * 100000).toFixed(1),
                    'puebloCaseRate': ((sheetJson[i].pueblo_cases_average / 167116) * 100000).toFixed(1),
                    'weldCaseRate': ((sheetJson[i].weld_cases_average / 314251) * 100000).toFixed(1),
                    'adamsDeathRate': ((sheetJson[i].adams_deaths_average / 511473) * 100000).toFixed(1),
                    'arapahoeDeathRate': ((sheetJson[i].arapahoe_deaths_average / 651342) * 100000).toFixed(1),
                    'boulderDeathRate': ((sheetJson[i].boulder_deaths_average / 325476) * 100000).toFixed(1),
                    'denverDeathRate': ((sheetJson[i].denver_deaths_average / 717797) * 100000).toFixed(1),
                    'douglasDeathRate': ((sheetJson[i].douglas_deaths_average / 342842) * 100000).toFixed(1),
                    'elpasoDeathRate': ((sheetJson[i].el_paso_deaths_average / 714395) * 100000).toFixed(1),
                    'jeffersonDeathRate': ((sheetJson[i].jefferson_deaths_average / 579491) * 100000).toFixed(1),
                    'larimerDeathRate': ((sheetJson[i].larimer_deaths_average / 350362) * 100000).toFixed(1),
                    'puebloDeathRate': ((sheetJson[i].pueblo_deaths_average / 167116) * 100000).toFixed(1),
                    'weldDeathRate': ((sheetJson[i].weld_deaths_average / 314251) * 100000).toFixed(1),
                })
            }
            var adamsRateArray = [];
            for (var i = 0; i < sheetJson.length; i++) {
                adamsRateArray.push(
                    //'date': sheetJson[i].date,
                    sheetJson[i].adams_cases
                )
            }

            var N = adamsRateArray.length;
            var moveMean = [];
            for (var i = 1; i < N - 1; i++) {
                var mean = (adamsRateArray[i][1] + adamsRateArray[i - 1][1] + adamsRateArray[i + 1][1]) / 3.0;
                moveMean.push([i, mean]);
            }

            var countyRateComparisonCases = c3.generate({
                bindto: '#county-rate-comparison-cases',
                size: {
                    height: 300
                    //width: 800
                },
                data: {
                    json: rateData,
                    keys: {
                        x: 'date',
                        value: ['adamsCaseRate', 'arapahoeCaseRate', 'boulderCaseRate', 'denverCaseRate', 'douglasCaseRate', 'elpasoCaseRate', 'jeffersonCaseRate', 'larimerCaseRate', 'puebloCaseRate', 'weldCaseRate']
                    },
                    names: {
                        'adamsCaseRate': 'Adams',
                        'arapahoeCaseRate': 'Arapahoe',
                        'boulderCaseRate': 'Boulder',
                        'denverCaseRate': 'Denver',
                        'douglasCaseRate': 'Douglas',
                        'elpasoCaseRate': 'El Paso',
                        'jeffersonCaseRate': 'Jefferson',
                        'larimerCaseRate': 'Larimer',
                        'puebloCaseRate': 'Pueblo',
                        'weldCaseRate': 'Weld'
                    },
                    types: {
                        'elpasoCaseRate': 'line'
                    }
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            rotate: 0,
                            multiline: false,
                            culling: true
                        },
                    },
                    y: {
                        tick: {
                            format: d3.format(',')
                        }
                    }
                },
                // regions: [
                //     { axis: 'x', start: 40, end: 41, class: 'region1' }
                // ],
                legend: {
                    position: 'inset'
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: true
                    }
                },
                point: {
                    r: 0
                }
            })

            /// ALL COUNTY DEATH RATE LINE CHART
            var countyRateComparisonDeaths = c3.generate({
                bindto: '#county-rate-comparison-deaths',
                size: {
                    height: 300
                },
                data: {
                    json: rateData,
                    keys: {
                        x: 'date',
                        value: ['adamsDeathRate', 'arapahoeDeathRate', 'boulderDeathRate', 'denverDeathRate', 'douglasDeathRate', 'elpasoDeathRate', 'jeffersonDeathRate', 'larimerDeathRate', 'puebloDeathRate', 'weldDeathRate']
                    },
                    names: {
                        'adamsDeathRate': 'Adams',
                        'arapahoeDeathRate': 'Arapahoe',
                        'boulderDeathRate': 'Boulder',
                        'denverDeathRate': 'Denver',
                        'douglasDeathRate': 'Douglas',
                        'elpasoDeathRate': 'El Paso',
                        'jeffersonDeathRate': 'Jefferson',
                        'larimerDeathRate': 'Larimer',
                        'puebloDeathRate': 'Pueblo',
                        'weldDeathRate': 'Weld'
                    },
                    types: {
                        'elpasoDeathRate': 'line'
                    }
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            rotate: 0,
                            multiline: false,
                            culling: true
                        },
                    },
                    y: {
                        tick: {
                            format: d3.format(',')
                        }
                    }
                },
                // regions: [
                //     { axis: 'x', start: 40, end: 41, class: 'region1' }
                // ],
                legend: {
                    position: 'inset'
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: true
                    }
                },
                point: {
                    r: 0
                }
            })

            /// ALL COUNTY CASE BAR CHART
            var dataNotNullCases = [];
            var dataNotNullDeaths = [];

            for (var i = 0; i < sheetJson.length; i++) {
                if (sheetJson[i].adams_cases != 'null') {
                    dataNotNullCases.push({
                        'Denver (1)': sheetJson[i].denver_cases,
                        'El Paso (2)': sheetJson[i].el_paso_cases,
                        'Arapahoe (3)': sheetJson[i].arapahoe_cases,
                        'Jefferson (4)': sheetJson[i].jefferson_cases,
                        'Adams (5)': sheetJson[i].adams_cases,
                        'Larimer (6)': sheetJson[i].larimer_cases,
                        'Douglas (7)': sheetJson[i].douglas_cases,
                        'Boulder (8)': sheetJson[i].boulder_cases,
                        'Weld (9)': sheetJson[i].weld_cases,
                        'Pueblo (10)': sheetJson[i].pueblo_cases
                    })
                }
            };

            var lastRowCases = dataNotNullCases.pop();
            var countyCaseTotalsArray = [];

            for (let [key, value] of Object.entries(lastRowCases)) {
                countyCaseTotalsArray.push({
                    'county': key,
                    'numberofcases': value
                })
            }

            var casesSorted = countyCaseTotalsArray.sort(function(a, b) {
                return (parseFloat(b.numberofcases) - parseFloat(a.numberofcases));
            });

            var dailyCasesChart = c3.generate({
                bindto: '#county-comparison-cases',
                size: {
                    height: 300
                },
                data: {
                    json: casesSorted,
                    keys: {
                        x: 'county',
                        value: ['numberofcases']
                    },
                    names: {
                        'numberofcases': 'Cases'
                    },
                    type: 'bar',
                    order: 'asc',
                    colors: {
                        'numberofcases': 'rgba(8,81,156,.5)'
                    }
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            rotate: 0,
                            multiline: false,
                            culling: false
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format(',')
                        }
                    },
                    rotated: true
                },
                bar: {
                    width: {
                        ratio: .75
                    }
                },
                legend: {
                    hide: true,
                    position: 'inset'
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: true
                    }
                }
            })

            /// ALL COUNTY DEATH BAR CHART
            for (var i = 0; i < sheetJson.length; i++) {
                if (sheetJson[i].adams_cases != 'null') {
                    dataNotNullDeaths.push({
                        'Denver (1)': sheetJson[i].denver_deaths,
                        'El Paso (2)': sheetJson[i].el_paso_deaths,
                        'Arapahoe (3)': sheetJson[i].arapahoe_deaths,
                        'Jefferson (4)': sheetJson[i].jefferson_deaths,
                        'Adams (5)': sheetJson[i].adams_deaths,
                        'Larimer (6)': sheetJson[i].larimer_deaths,
                        'Douglas (7)': sheetJson[i].douglas_deaths,
                        'Boulder (8)': sheetJson[i].boulder_deaths,
                        'Weld (9)': sheetJson[i].weld_deaths,
                        'Pueblo (10)': sheetJson[i].pueblo_deaths
                    })
                }
            };

            var lastRowDeaths = dataNotNullDeaths.pop();
            var countyDeathTotalsArray = [];

            for (let [key, value] of Object.entries(lastRowDeaths)) {
                countyDeathTotalsArray.push({
                    'county': key,
                    'numberofdeaths': value
                })
            }

            var deathsSorted = countyDeathTotalsArray.sort(function(a, b) {
                return (parseFloat(b.numberofdeaths) - parseFloat(a.numberofdeaths));
            });

            var dailyCasesChart = c3.generate({
                bindto: '#county-comparison-deaths',
                size: {
                    height: 300
                },
                data: {
                    json: deathsSorted,
                    keys: {
                        x: 'county',
                        value: ['numberofdeaths']
                    },
                    names: {
                        'numberofdeaths': 'Deaths'
                    },
                    type: 'bar',
                    colors: {
                        'numberofdeaths': 'rgba(165,15,21,.5)'
                    }
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            rotate: 0,
                            multiline: false,
                            culling: false
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format(',')
                        }
                    },
                    rotated: true
                },
                bar: {
                    width: {
                        ratio: .75
                    }
                },
                legend: {
                    position: 'inset',
                    hide: true
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: true
                    }
                }
            })
        }
    })
});

/******************** IMMUNIZATION CHARTS ********************/
//var chartSpreadsheetID = '1LbgEc_fJasdCwRpfkHSMyXYXx3V5szrJSbfJcCNl2fQ/11';
//var url = "https://spreadsheets.google.com/feeds/list/" + chartSpreadsheetID + "/public/full?alt=json";
//var tab11Data = "./data/api_tab_11.json";

//$.getJSON(tab11Data, function(data) {
//var sheetJson = data;

$(document).ready(function() {
    var sheetID = '1LbgEc_fJasdCwRpfkHSMyXYXx3V5szrJSbfJcCNl2fQ';
    var tabID = 356097759;
    Papa.parse('https://docs.google.com/spreadsheets/d/' + sheetID + '/export?format=csv&id=' + sheetID + '&gid=' + tabID, {
        download: true,
        header: true,
        complete: function(results) {
            var sheetJson = results.data;

            var lastRow = sheetJson.length - 1;
            var lastDate = sheetJson[lastRow].date;
            var coloradoPopulation = 5758736;
            var oneDoseCount = Number(sheetJson[lastRow].one_dose_count);
            var oneDosePct = Math.round(((oneDoseCount / coloradoPopulation) * 100) * 10) / 10;
            var twoDoseCount = Number(sheetJson[lastRow].two_dose_count);
            var twoDosePct = Math.round(((twoDoseCount / coloradoPopulation) * 100) * 10) / 10;
            // var displayTotalCases = Number(sheetJson[0].totalcases);
            // var displayRelatedDeaths = Number(sheetJson[0].totalrelateddeaths);
            // var displayCovidDeaths = Number(sheetJson[0].totalcoviddeaths);
            // var displayTotalHospitalizations = Number(sheetJson[0].totalhospitalizations);
            document.getElementById('last-date').innerHTML = lastDate;
            document.getElementById('one-dose-count').innerHTML = oneDoseCount.toLocaleString();
            document.getElementById('two-dose-count').innerHTML = twoDoseCount.toLocaleString();
            document.getElementById('one-dose-pct').innerHTML = oneDosePct;
            document.getElementById('two-dose-pct').innerHTML = twoDosePct;
            // document.getElementById('total-related-deaths').innerHTML = displayRelatedDeaths.toLocaleString();
            // document.getElementById('total-covid-deaths').innerHTML = displayCovidDeaths.toLocaleString();
            // document.getElementById('total-hospitalizations').innerHTML = displayTotalHospitalizations.toLocaleString();
            var immunizationChart = c3.generate({
                bindto: '#immunization-chart',
                size: {
                    height: 225
                    //width: 800
                },
                data: {
                    json: sheetJson,
                    keys: {
                        x: 'week',
                        value: ['pfizer_administered', 'moderna_administered', 'janssen_administered', 'unspecified_administered']
                    },
                    type: 'bar',
                    groups: [
                        ['unspecified_administered', 'janssen_administered', 'moderna_administered', 'pfizer_administered']
                    ],
                    names: {
                        'pfizer_administered': 'Pfizer',
                        'moderna_administered': 'Moderna',
                        'janssen_administered': 'Janssen',
                        'unspecified_administered': 'Unspecified'
                    },
                    // ['#edf8e9','#bae4b3','#74c476','#238b45']
                    colors: {
                        'pfizer_administered': '#41ab5d',
                        'moderna_administered': '#74c476',
                        'janssen_administered': '#a1d99b',
                        'unspecified_administered': '#c7e9c0'
                    },
                },
                axis: {
                    x: {
                        type: 'category',
                        tick: {
                            rotate: 0,
                            multiline: false,
                            culling: true
                        },
                        padding: {
                            right: 2
                        }
                    },
                    y: {
                        tick: {
                            format: d3.format(',')
                        }
                    }
                },
                bar: {
                    width: {
                        ratio: .65
                    }
                },
                // regions: [
                //     { axis: 'x', start: 54, end: 85, class: 'region1' }
                // ],
                grid: {
                    x: {
                        show: true
                    },
                    y: {
                        show: true
                    }
                },
                point: {
                    r: 0
                }
            })
        }
    })
});

/// TABLE

//var chartSpreadsheetID = '1LbgEc_fJasdCwRpfkHSMyXYXx3V5szrJSbfJcCNl2fQ/12';
//var url = "https://spreadsheets.google.com/feeds/list/" + chartSpreadsheetID + "/public/full?alt=json";
//var tab12Data = "./data/api_tab_12.json";

//$.getJSON(tab12Data, function(data) {
    //var sheetJson = data;

    $(document).ready(function() {
    var sheetID = '1LbgEc_fJasdCwRpfkHSMyXYXx3V5szrJSbfJcCNl2fQ';
    var tabID = 986420079;
    Papa.parse('https://docs.google.com/spreadsheets/d/' + sheetID + '/export?format=csv&id=' + sheetID + '&gid=' + tabID, {
        download: true,
        header: true,
        complete: function(results) {
            var sheetJson = results.data;

    var homicideTable = $('#vaccine-table').DataTable({
        data: sheetJson,
        //pageLength: 15,
        scrollY: "500px",
        scrollCollapse: true,
        paging: false,
        scrollX: true,
        fixedHeader: true,
        responsive: false,
        //dom: '<if<t>lp>',
        dom: '<t>p',
        order: [
            [0, 'asc']
        ],
        rowCallback: function(row, data, index) {
            if (data.name == 'Colorado') {
                $(row).css('background-color', 'rgba(81,156,8,.2');
            }
        },
        columns: [
            { data: 'name' },
            {
                data: 'population',
                visible: false
            },
            {
                data: 'name_test',
                visible: false
            },
            {
                data: 'state/territory/federal entity',
                visible: false
            },
            {
                data: 'percent of total pop with at least one dose by state of residence',
                render: function(data, type, row, meta) {
                    return data + '%'
                }
            },
            {
                data: 'percent of total pop fully vaccinated by state of residence',
                render: function(data, type, row, meta) {
                    return data + '%'
                }
            },
            {
                data: 'percent of adult pop with at least one dose by state of residence',
                render: function(data, type, row, meta) {
                    return data + '%'
                }
            },
            {
                data: 'percent of adult pop fully vaccinated by state of residence',
                render: function(data, type, row, meta) {
                    return data + '%'
                }
            },
            {
                data: 'total doses administered by state where administered',
                render: $.fn.dataTable.render.number(',', '', '', '')
            },
            {
                data: 'doses administered per 100k by state where administered',
                render: $.fn.dataTable.render.number(',', '', '', '')
            },
            {
                data: 'adult doses administered by state where administered',
                visible: false
            },
            {
                data: 'adult doses administered per 100k by state where administered',
                visible: false
            },
            {
                data: 'people with at least one dose by state of residence',
                visible: false
            },
            {
                data: 'people adult with at least one dose by state of residence',
                visible: false
            },
            {
                data: 'people fully vaccinated by state of residence',
                visible: false
            },
            {
                data: 'people adult fully vaccinated by state of residence',
                visible: false
            },
        ]
    })
        }
    })
});