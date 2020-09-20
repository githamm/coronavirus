/******************** STATE-LEVEL GRAPHICS ********************/
var smallChartHeight = 170;
var chartSpreadsheetID = '1LbgEc_fJasdCwRpfkHSMyXYXx3V5szrJSbfJcCNl2fQ/2';
var url = "https://spreadsheets.google.com/feeds/list/" + chartSpreadsheetID + "/public/full?alt=json";

$.getJSON(url, function(data) {
    var sheetJson = data.feed.entry;
    var displayTotalCases = Number(sheetJson[0].gsx$totalcases.$t);
    var displayRelatedDeaths = Number(sheetJson[0].gsx$totalrelateddeaths.$t);
    var displayCovidDeaths = Number(sheetJson[0].gsx$totalcoviddeaths.$t);
    var displayTotalHospitalizations = Number(sheetJson[0].gsx$totalhospitalizations.$t);
    document.getElementById('updated-time').innerHTML = sheetJson[0].gsx$updated.$t;
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
    //         sheetJson[i].gsx$reporteddailycasesaverage.$t
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
                x: 'gsx$date.$t',
                value: ['gsx$onsetdailycases.$t', 'gsx$reporteddailycasesaverage.$t']
            },
            names: {
                'gsx$onsetdailycases.$t': 'Cases by illness onset date',
                'gsx$reporteddailycasesaverage.$t': 'Average cases by reported date'
            },
            types: {
                'gsx$onsetdailycases.$t': 'bar',
                'gsx$reporteddailycasesaverage.$t': 'line'
            },
            colors: {
                'gsx$onsetdailycases.$t': 'rgba(8,81,156,.4)',
                'gsx$reporteddailycasesaverage.$t': 'rgba(8,81,156,1)'
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
            { axis: 'x', start: 85, end: 86, class: 'region1' }
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
                x: 'gsx$date.$t',
                value: ['gsx$deathcertificatedailydeaths.$t', 'gsx$reporteddailydeathsaverage.$t']
            },
            names: {
                'gsx$deathcertificatedailydeaths.$t': 'Deaths by death certificate date',
                'gsx$reporteddailydeathsaverage.$t': 'Average deaths by reported date'
            },
            types: {
                'gsx$deathcertificatedailydeaths.$t': 'bar',
                'gsx$reporteddailydeathsaverage.$t': 'line'
            },
            colors: {
                'gsx$deathcertificatedailydeaths.$t': 'rgba(165,15,21,.4)',
                'gsx$reporteddailydeathsaverage.$t': 'rgba(165,15,21,1)'
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
            { axis: 'x', start: 85, end: 86, class: 'region1' }
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
                x: 'gsx$date.$t',
                value: ['gsx$onsetdailyhospitalizations.$t', 'gsx$reporteddailyhospitalizationsaverage.$t']
            },
            names: {
                'gsx$onsetdailyhospitalizations.$t': 'Hospitalizations by illness onset date',
                'gsx$reporteddailyhospitalizationsaverage.$t': 'Average hospitalizations by reported date'
            },
            types: {
                'gsx$onsetdailyhospitalizations.$t': 'bar',
                'gsx$reporteddailyhospitalizationsaverage.$t': 'line'
            },
            colors: {
                'gsx$onsetdailyhospitalizations.$t': 'rgba(254,178,76,.4)',
                'gsx$reporteddailyhospitalizationsaverage.$t': 'rgba(254,178,76,1)'
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
            { axis: 'x', start: 85, end: 86, class: 'region1' }
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
            left: 26
        },
        data: {
            json: recentData,
            keys: {
                x: 'gsx$date.$t',
                value: ['gsx$reporteddailycasesaverage.$t']
            },
            names: {
                'gsx$reporteddailycasesaverage.$t': 'Cases'
            },
            type: 'line',
            colors: {
                'gsx$reporteddailycasesaverage.$t': 'rgba(8,81,156,1)'
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
                show: true
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
                x: 'gsx$date.$t',
                value: ['gsx$reporteddailydeathsaverage.$t']
            },
            names: {
                'gsx$reporteddailydeathsaverage.$t': 'Deaths'
            },
            type: 'line',
            colors: {
                'gsx$reporteddailydeathsaverage.$t': 'rgba(165,15,21,1)'
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
                show: true
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
            left: 26
        },
        data: {
            json: recentData,
            keys: {
                x: 'gsx$date.$t',
                value: ['gsx$reporteddailycasesaverage.$t']
            },
            names: {
                'gsx$reporteddailycasesaverage.$t': 'Cases'
            },
            type: 'line',
            colors: {
                'gsx$reporteddailycasesaverage.$t': 'rgba(8,81,156,1)'
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
                show: true
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
                x: 'gsx$date.$t',
                value: ['gsx$reporteddailydeathsaverage.$t']
            },
            names: {
                'gsx$reporteddailydeathsaverage.$t': 'Deaths'
            },
            type: 'line',
            colors: {
                'gsx$reporteddailydeathsaverage.$t': 'rgba(165,15,21,1)'
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
                show: true
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

});

/// PEOPLE CURRENTLY HOSPITALIZED CHARTS
var chartSpreadsheetID = '1LbgEc_fJasdCwRpfkHSMyXYXx3V5szrJSbfJcCNl2fQ/8';
var url = "https://spreadsheets.google.com/feeds/list/" + chartSpreadsheetID + "/public/full?alt=json";

$.getJSON(url, function(data) {
    var sheetJson = data.feed.entry;
    var smallChartHeight = 170;
    var recentData = sheetJson.slice(-91); // last 90 days of data

    /// SMALL HOSPITALIZATIONS CHART
    var currentHospitalizationsChartSmall = c3.generate({
        bindto: '#current-hospitalizations-chart-small',
        size: {
            height: smallChartHeight
        },
        padding: {
            left: 26
        },
        data: {
            json: recentData,
            keys: {
                x: 'gsx$date.$t',
                value: ['gsx$confirmedcaseshospitalized.$t']
            },
            names: {
                'gsx$confirmedcaseshospitalized.$t': 'Hospitalized'
            },
            type: 'line',
            colors: {
                'gsx$confirmedcaseshospitalized.$t': 'rgba(255,138,74,.8)'

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
                show: true
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
            json: recentData,
            keys: {
                x: 'gsx$date.$t',
                value: ['gsx$confirmedcaseshospitalized.$t']
            },
            names: {
                'gsx$confirmedcaseshospitalized.$t': 'Hospitalized'
            },
            type: 'line',
            colors: {
                'gsx$confirmedcaseshospitalized.$t': 'rgba(255,138,74,.8)'

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
                show: true
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
                x: 'gsx$date.$t',
                value: ['gsx$confirmedcaseshospitalized.$t', 'gsx$suspectedcaseshospitalized.$t']
            },
            names: {
                'gsx$confirmedcaseshospitalized.$t': 'Confirmed cases',
                'gsx$suspectedcaseshospitalized.$t': 'Suspected cases'
            },
            type: 'bar',
            groups: [
                ['gsx$confirmedcaseshospitalized.$t', 'gsx$suspectedcaseshospitalized.$t']
            ],
            colors: {
                'gsx$confirmedcaseshospitalized.$t': 'rgba(255,138,74,.8)',
                'gsx$suspectedcaseshospitalized.$t': 'rgba(255,138,74,.3)'

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
});

/// DAILY TESTS/POSITIVITY CHARTS

var chartSpreadsheetID = '1LbgEc_fJasdCwRpfkHSMyXYXx3V5szrJSbfJcCNl2fQ/6';
var url = "https://spreadsheets.google.com/feeds/list/" + chartSpreadsheetID + "/public/full?alt=json";

$.getJSON(url, function(data) {
    var sheetJson = data.feed.entry;
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
                x: 'gsx$date.$t',
                value: ['gsx$testingrateaverage.$t']
            },
            names: {
                'gsx$testingrateaverage.$t': 'Tests'
            },
            type: 'line',
            colors: {
                'gsx$testingrateaverage.$t': 'rgba(0,0,0,.3)'
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
                show: true
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
                x: 'gsx$date.$t',
                value: ['gsx$percentpositiveaverage.$t']
            },
            names: {
                'gsx$percentpositiveaverage.$t': 'Positive'
            },
            type: 'line',
            colors: {
                'gsx$percentpositiveaverage.$t': 'rgba(0,0,0,1)'
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
                    format: (function(d) { return d + "%"; })
                },
                show: true
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
                x: 'gsx$date.$t',
                value: ['gsx$testingrateaverage.$t']
            },
            names: {
                'gsx$testingrateaverage.$t': 'Tests'
            },
            type: 'line',
            colors: {
                'gsx$testingrateaverage.$t': 'rgba(0,0,0,.3)'
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
                show: true
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
                x: 'gsx$date.$t',
                value: ['gsx$percentpositiveaverage.$t']
            },
            names: {
                'gsx$percentpositiveaverage.$t': 'Positive'
            },
            type: 'line',
            colors: {
                'gsx$percentpositiveaverage.$t': 'rgba(0,0,0,1)'
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
                    format: (function(d) { return d + "%"; })
                },
                show: true
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
                x: 'gsx$date.$t',
                value: ['gsx$testingrateaverage.$t', 'gsx$percentpositiveaverage.$t']
            },
            names: {
                'gsx$testingrateaverage.$t': 'Average tests per 100,000 people',
                'gsx$percentpositiveaverage.$t': 'Average positive tests'
            },
            types: {
                'gsx$testingrateaverage.$t': 'bar',
                'gsx$percentpositiveaverage.$t': 'line'
            },
            colors: {
                'gsx$testingrateaverage.$t': 'rgba(0,0,0,.2)',
                'gsx$percentpositiveaverage.$t': 'rgba(0,0,0,1)'
            },
            axes: {
                'gsx$testingrateaverage.$t': 'y',
                'gsx$percentpositiveaverage.$t': 'y2'
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
});

/// RACE CHARTS
var chartSpreadsheetID = '1LbgEc_fJasdCwRpfkHSMyXYXx3V5szrJSbfJcCNl2fQ/4';
var url = "https://spreadsheets.google.com/feeds/list/" + chartSpreadsheetID + "/public/full?alt=json";

$.getJSON(url, function(data) {
    var sheetJson = data.feed.entry;

    var ageChart = c3.generate({
        bindto: '#race-chart',
        size: {
            height: 650
        },
        data: {
            json: sheetJson,
            keys: {
                x: 'gsx$race.$t',
                value: ['gsx$cases.$t', 'gsx$population.$t', 'gsx$deaths.$t']
            },
            type: 'bar',
            names: {
                'gsx$cases.$t': 'Cases',
                'gsx$deaths.$t': 'Deaths',
                'gsx$population.$t': 'Population',
            },
            colors: {
                'gsx$cases.$t': 'rgba(8,81,156,.5)',
                'gsx$deaths.$t': 'rgba(165,15,21,.5)',
                'gsx$population.$t': 'rgba(0,0,0,.5)'
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
});

/// AGE CHARTS
var chartSpreadsheetID = '1LbgEc_fJasdCwRpfkHSMyXYXx3V5szrJSbfJcCNl2fQ/5';
var url = "https://spreadsheets.google.com/feeds/list/" + chartSpreadsheetID + "/public/full?alt=json";

/// AGE RAW NUMBERS CHART
$.getJSON(url, function(data) {
    var sheetJson = data.feed.entry;

    var ageChart = c3.generate({
        bindto: '#age-chart',
        size: {
            height: 250
        },
        data: {
            json: sheetJson,
            keys: {
                x: 'gsx$age.$t',
                value: ['gsx$nothospitalized.$t', 'gsx$hospitalized.$t', 'gsx$deaths.$t']
            },
            type: 'bar',
            names: {
                'gsx$nothospitalized.$t': 'Not hospitalized',
                'gsx$hospitalized.$t': 'Hospitalized',
                'gsx$deaths.$t': 'Deaths',
            },
            colors: {
                'gsx$nothospitalized.$t': 'rgba(204,204,204,.5)',
                'gsx$hospitalized.$t': 'rgba(254,178,76,.5)',
                'gsx$deaths.$t': 'rgba(165,15,21,.5)'
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
                x: 'gsx$age.$t',
                value: ['gsx$nothospitalizedpct.$t', 'gsx$hospitalizedpct.$t', 'gsx$deathspct.$t']
            },
            type: 'bar',
            groups: [
                ['gsx$nothospitalizedpct.$t', 'gsx$hospitalizedpct.$t', 'gsx$deathspct.$t']
            ],
            names: {
                'gsx$nothospitalizedpct.$t': 'Not hospitalized',
                'gsx$hospitalizedpct.$t': 'Hospitalized',
                'gsx$deathspct.$t': 'Deaths',
            },
            colors: {
                'gsx$nothospitalizedpct.$t': 'rgba(204,204,204,.5)',
                'gsx$hospitalizedpct.$t': 'rgba(254,178,76,.5)',
                'gsx$deathspct.$t': 'rgba(165,15,21,.5)'
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
});

/******************** COUNTY-LEVEL GRAPHICS ********************/

var countyDataSpreadsheetID = '1LbgEc_fJasdCwRpfkHSMyXYXx3V5szrJSbfJcCNl2fQ/3';
var url = "https://spreadsheets.google.com/feeds/list/" + countyDataSpreadsheetID + "/public/full?alt=json";
var caseColor = 'rgba(153,142,195,1)';
var deathColor = 'rgba(241,163,64,1)';

$.getJSON(url, function(data) {
    var sheetJson = data.feed.entry;
    //document.getElementById('updated-time').innerHTML = sheetJson[0].gsx$updated.$t;

    /// ALL COUNTY CASE RATE LINE CHART
    var rateData = [];
    for (var i = 0; i < sheetJson.length; i++) {
        rateData.push({
            'date': sheetJson[i].gsx$date.$t,
            'adamsCaseRate': ((sheetJson[i].gsx$adamscasesaverage.$t / 511473) * 100000).toFixed(1),
            'arapahoeCaseRate': ((sheetJson[i].gsx$arapahoecasesaverage.$t / 651342) * 100000).toFixed(1),
            'boulderCaseRate': ((sheetJson[i].gsx$bouldercasesaverage.$t / 325476) * 100000).toFixed(1),
            'denverCaseRate': ((sheetJson[i].gsx$denvercasesaverage.$t / 717797) * 100000).toFixed(1),
            'douglasCaseRate': ((sheetJson[i].gsx$douglascasesaverage.$t / 342842) * 100000).toFixed(1),
            'elpasoCaseRate': ((sheetJson[i].gsx$elpasocasesaverage.$t / 714395) * 100000).toFixed(1),
            'jeffersonCaseRate': ((sheetJson[i].gsx$jeffersoncasesaverage.$t / 579491) * 100000).toFixed(1),
            'larimerCaseRate': ((sheetJson[i].gsx$larimercasesaverage.$t / 350362) * 100000).toFixed(1),
            'puebloCaseRate': ((sheetJson[i].gsx$pueblocasesaverage.$t / 167116) * 100000).toFixed(1),
            'weldCaseRate': ((sheetJson[i].gsx$weldcasesaverage.$t / 314251) * 100000).toFixed(1),
            'adamsDeathRate': ((sheetJson[i].gsx$adamsdeathsaverage.$t / 511473) * 100000).toFixed(1),
            'arapahoeDeathRate': ((sheetJson[i].gsx$arapahoedeathsaverage.$t / 651342) * 100000).toFixed(1),
            'boulderDeathRate': ((sheetJson[i].gsx$boulderdeathsaverage.$t / 325476) * 100000).toFixed(1),
            'denverDeathRate': ((sheetJson[i].gsx$denverdeathsaverage.$t / 717797) * 100000).toFixed(1),
            'douglasDeathRate': ((sheetJson[i].gsx$douglasdeathsaverage.$t / 342842) * 100000).toFixed(1),
            'elpasoDeathRate': ((sheetJson[i].gsx$elpasodeathsaverage.$t / 714395) * 100000).toFixed(1),
            'jeffersonDeathRate': ((sheetJson[i].gsx$jeffersondeathsaverage.$t / 579491) * 100000).toFixed(1),
            'larimerDeathRate': ((sheetJson[i].gsx$larimerdeathsaverage.$t / 350362) * 100000).toFixed(1),
            'puebloDeathRate': ((sheetJson[i].gsx$pueblodeathsaverage.$t / 167116) * 100000).toFixed(1),
            'weldDeathRate': ((sheetJson[i].gsx$welddeathsaverage.$t / 314251) * 100000).toFixed(1),
        })
    }
    var adamsRateArray = [];
    for (var i = 0; i < sheetJson.length; i++) {
        adamsRateArray.push(
            //'date': sheetJson[i].gsx$date.$t,
            sheetJson[i].gsx$adamscases.$t
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
        regions: [
            { axis: 'x', start: 40, end: 41, class: 'region1' }
        ],
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
        regions: [
            { axis: 'x', start: 40, end: 41, class: 'region1' }
        ],
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
        if (sheetJson[i].gsx$adamscases.$t != 'null') {
            dataNotNullCases.push({
                'Denver (1)': sheetJson[i].gsx$denvercases.$t,
                'El Paso (2)': sheetJson[i].gsx$elpasocases.$t,
                'Arapahoe (3)': sheetJson[i].gsx$arapahoecases.$t,
                'Jefferson (4)': sheetJson[i].gsx$jeffersoncases.$t,
                'Adams (5)': sheetJson[i].gsx$adamscases.$t,
                'Larimer (6)': sheetJson[i].gsx$larimercases.$t,
                'Douglas (7)': sheetJson[i].gsx$douglascases.$t,
                'Boulder (8)': sheetJson[i].gsx$bouldercases.$t,
                'Weld (9)': sheetJson[i].gsx$weldcases.$t,
                'Pueblo (10)': sheetJson[i].gsx$pueblocases.$t
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
        if (sheetJson[i].gsx$adamscases.$t != 'null') {
            dataNotNullDeaths.push({
                'Denver (1)': sheetJson[i].gsx$denverdeaths.$t,
                'El Paso (2)': sheetJson[i].gsx$elpasodeaths.$t,
                'Arapahoe (3)': sheetJson[i].gsx$arapahoedeaths.$t,
                'Jefferson (4)': sheetJson[i].gsx$jeffersondeaths.$t,
                'Adams (5)': sheetJson[i].gsx$adamsdeaths.$t,
                'Larimer (6)': sheetJson[i].gsx$larimerdeaths.$t,
                'Douglas (7)': sheetJson[i].gsx$douglasdeaths.$t,
                'Boulder (8)': sheetJson[i].gsx$boulderdeaths.$t,
                'Weld (9)': sheetJson[i].gsx$welddeaths.$t,
                'Pueblo (10)': sheetJson[i].gsx$pueblodeaths.$t
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
});