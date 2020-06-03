/******************** STATE-LEVEL GRAPHICS ********************/

var chartSpreadsheetID = '131RyfgkgQxrVgreeFQ3TyhZxMDHShrfAnztS6FMVPAo/2';
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

    var casesAverageArray = [];
    for (var i = 0; i < sheetJson.length; i++) {
        casesAverageArray.push(
            sheetJson[i].gsx$reporteddailycasesaverage.$t
        )
    };
    casesAverageArray = casesAverageArray.map(function(each_element) {
        return parseInt(each_element).toFixed(1);
    });

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
                'gsx$onsetdailycases.$t': 'Daily cases by date of illness onset',
                'gsx$reporteddailycasesaverage.$t': '7-day moving average of reported cases'
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
        // padding: {
        //     bottom: 25
        // },
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
                //max: 750,
                tick: {
                    format: d3.format(','),
                    //values: [0, 100, 200, 300, 400]
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
        // legend: {
        //     position: 'inset'
        // },
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

    var dailyHospitalizationsChart = c3.generate({
        bindto: '#daily-hospitalizations-chart',
        size: {
            height: 175
            //width: 800
        },
        data: {
            json: sheetJson,
            keys: {
                x: 'gsx$date.$t',
                value: ['gsx$onsetdailyhospitalizations.$t', 'gsx$reporteddailyhospitalizationsaverage.$t']
            },
            names: {
                'gsx$onsetdailyhospitalizations.$t': 'Daily hospitalizations by date of illness onset',
                'gsx$reporteddailyhospitalizationsaverage.$t': '7-day moving average of reported hospitalizations'
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
        // padding: {
        //     bottom: 25
        // },
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
                //max: 750,
                tick: {
                    format: d3.format(','),
                    //values: [0, 25, 50, 75, 100]
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
        // legend: {
        //     position: 'inset'
        // },
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

    var dailyDeathsChart = c3.generate({
        bindto: '#daily-deaths-chart',
        size: {
            height: 175
            //width: 800
        },
        data: {
            json: sheetJson,
            keys: {
                x: 'gsx$date.$t',
                value: ['gsx$deathcertificatedailydeaths.$t', 'gsx$reporteddailydeathsaverage.$t']
            },
            names: {
                'gsx$deathcertificatedailydeaths.$t': 'Daily deaths by death certificate date',
                'gsx$reporteddailydeathsaverage.$t': '7-day moving average of reported deaths'
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
        // padding: {
        //     bottom: 25
        // },
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
                //max: 750,
                tick: {
                    format: d3.format(','),
                    //values: [0, 10, 20, 30]
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
        // legend: {
        //     position: 'inset'
        // },
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

    /// CUMULATIVE CASES CHART
    var cumulativeCasesChart = c3.generate({
        bindto: '#cumulative-chart',
        size: {
            height: 300
            //width: 800
        },
        data: {
            json: sheetJson,
            keys: {
                x: 'gsx$date.$t',
                value: ['gsx$cumulativecases.$t', 'gsx$cumulativehospitalizations.$t', 'gsx$cumulativedeaths.$t']
            },
            names: {
                'gsx$cumulativecases.$t': 'Total cases',
                'gsx$cumulativehospitalizations.$t': 'Total hospitalizations',
                'gsx$cumulativedeaths.$t': 'Total deaths'
            },
            types: {
                'gsx$cumulativecases.$t': 'line',
                'gsx$cumulativehospitalizations.$t': 'line',
                'gsx$cumulativedeaths.$t': 'line'
            },
            colors: {
                'gsx$cumulativecases.$t': 'rgba(8,81,156,.9)',
                'gsx$cumulativehospitalizations.$t': 'rgba(254,178,76,.9)',
                'gsx$cumulativedeaths.$t': 'rgba(165,15,21,.9)'
            },
        },
        // padding: {
        //     bottom: 25
        // },
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
                //max: 5000,
                tick: {
                    format: d3.format(',')
                }
            }
        },
        regions: [
            { axis: 'x', start: 85, end: 86 /*, class: 'region-1-4'*/ }
        ],
        legend: {
            position: 'inset'
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
            r: 1.75
        }
    });
});

var chartSpreadsheetID = '131RyfgkgQxrVgreeFQ3TyhZxMDHShrfAnztS6FMVPAo/5';
var url = "https://spreadsheets.google.com/feeds/list/" + chartSpreadsheetID + "/public/full?alt=json";

$.getJSON(url, function(data) {
    var sheetJson = data.feed.entry;
    var dailyTestsChart = c3.generate({
        bindto: '#daily-tests-chart',
        size: {
            height: 250
            //width: 800
        },
        data: {
            json: sheetJson,
            keys: {
                x: 'gsx$date.$t',
                value: ['gsx$testingrate.$t', 'gsx$percentpositive.$t']
            },
            names: {
                'gsx$testingrate.$t': 'Tests per 100,000 people',
                'gsx$percentpositive.$t': '3-day moving average of positive tests'
            },
            types: {
                'gsx$testingrate.$t': 'bar',
                'gsx$percentpositive.$t': 'line'
            },
            colors: {
                'gsx$testingrate.$t': 'rgba(0,0,0,.2)',
                'gsx$percentpositive.$t': 'rgba(0,0,0,1)'
            },
            axes: {
                'gsx$testingrate.$t': 'y',
                'gsx$percentpositive.$t': 'y2'
            }
        },
        // padding: {
        //     bottom: 25
        // },
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
                max: 175,
                tick: {
                    format: d3.format(','),
                    //values: [0, 10, 20, 30]
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
                        return d3.format('.1%')(value / 100)
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
        // regions: [
        //     { axis: 'y', start: 152, class: 'region1' }
        // ],
        // legend: {
        //     position: 'inset'
        // },
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
var chartSpreadsheetID = '131RyfgkgQxrVgreeFQ3TyhZxMDHShrfAnztS6FMVPAo/6';
var url = "https://spreadsheets.google.com/feeds/list/" + chartSpreadsheetID + "/public/full?alt=json";

$.getJSON(url, function(data) {
    var sheetJson = data.feed.entry;

    var ageChart = c3.generate({
        bindto: '#race-chart',
        size: {
            height: 650
            //width: 800
        },
        data: {
            json: sheetJson,
            keys: {
                x: 'gsx$race.$t',
                value: ['gsx$cases.$t', 'gsx$population.$t', 'gsx$deaths.$t']
            },
            type: 'bar',
            // groups: [
            //     ['gsx$nothospitalized.$t', 'gsx$hospitalized.$t', 'gsx$deaths.$t']
            // ],
            names: {
                'gsx$cases.$t': 'Cases',
                'gsx$deaths.$t': 'Deaths',
                'gsx$population.$t': 'Population',
            },
            // types: {
            //     'gsx$cumulativecases.$t': 'line',
            //     'gsx$cumulativedeaths.$t': 'line'
            // },
            colors: {
                // ['rgb(239,138,98)','rgb(247,247,247)','rgb(103,169,207)']
                'gsx$cases.$t': 'rgba(8,81,156,.5)',
                'gsx$deaths.$t': 'rgba(165,15,21,.5)',
                'gsx$population.$t': 'rgba(0,0,0,.5)'
            },
        },
        // padding: {
        //     bottom: 25
        // },
        axis: {
            x: {
                type: 'category',
                tick: {
                    rotate: 0,
                    multiline: true,
                    //culling: true
                }
            },
            y: {
                //max: 750,
                tick: {
                    format: function(value) {
                        return d3.format('.1%')(value / 100)
                    }
                }
            },
            rotated: true
        },
        // legend: {
        //     position: 'inset'
        // },
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
var chartSpreadsheetID = '131RyfgkgQxrVgreeFQ3TyhZxMDHShrfAnztS6FMVPAo/3';
var url = "https://spreadsheets.google.com/feeds/list/" + chartSpreadsheetID + "/public/full?alt=json";

$.getJSON(url, function(data) {
    var sheetJson = data.feed.entry;

    var ageChart = c3.generate({
        bindto: '#age-chart',
        size: {
            height: 200
            //width: 800
        },
        data: {
            json: sheetJson,
            keys: {
                x: 'gsx$age.$t',
                value: ['gsx$nothospitalized.$t', 'gsx$hospitalized.$t', 'gsx$deaths.$t']
            },
            type: 'bar',
            // groups: [
            //     ['gsx$nothospitalized.$t', 'gsx$hospitalized.$t', 'gsx$deaths.$t']
            // ],
            names: {
                'gsx$nothospitalized.$t': 'Not hospitalized',
                'gsx$hospitalized.$t': 'Hospitalized',
                'gsx$deaths.$t': 'Deaths',
            },
            // types: {
            //     'gsx$cumulativecases.$t': 'line',
            //     'gsx$cumulativedeaths.$t': 'line'
            // },
            colors: {
                // ['rgb(239,138,98)','rgb(247,247,247)','rgb(103,169,207)']
                'gsx$nothospitalized.$t': 'rgba(204,204,204,.5)',
                //'gsx$hospitalized.$t': 'rgba(150,150,150,1)',
                //'gsx$deaths.$t': 'rgba(82,82,82,1)'
                'gsx$hospitalized.$t': 'rgba(254,178,76,.5)',
                'gsx$deaths.$t': 'rgba(165,15,21,.5)'
            },
        },
        // padding: {
        //     bottom: 25
        // },
        axis: {
            x: {
                type: 'category',
                tick: {
                    rotate: 0,
                    multiline: false,
                    //culling: true
                },
            },
            y: {
                //max: 750,
                tick: {
                    format: d3.format(',')
                }
            }
        },
        // legend: {
        //     position: 'inset'
        // },
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

    //Age percent chart
    var ageChart = c3.generate({
        bindto: '#age-pct-chart',
        size: {
            height: 200
            //width: 800
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
            // types: {
            //     'gsx$cumulativecases.$t': 'line',
            //     'gsx$cumulativedeaths.$t': 'line'
            // },
            colors: {
                // ['rgb(239,138,98)','rgb(247,247,247)','rgb(103,169,207)']
                'gsx$nothospitalizedpct.$t': 'rgba(204,204,204,.5)',
                'gsx$hospitalizedpct.$t': 'rgba(254,178,76,.5)',
                'gsx$deathspct.$t': 'rgba(165,15,21,.5)'
            },
        },
        // padding: {
        //     bottom: 25
        // },
        axis: {
            x: {
                type: 'category',
                tick: {
                    rotate: 0,
                    multiline: false,
                    //culling: true
                },
            },
            y: {
                //max: 100,
                tick: {
                    format: d3.format(".1%")
                },
                show: true,
                // label: {
                //     text: 'Percent of cases',
                //     position: 'outer-middle'
                // }
            }
        },
        // legend: {
        //     position: 'inset',
        //     show: true
        // },
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

var countyDataSpreadsheetID = '131RyfgkgQxrVgreeFQ3TyhZxMDHShrfAnztS6FMVPAo/7';
var url = "https://spreadsheets.google.com/feeds/list/" + countyDataSpreadsheetID + "/public/full?alt=json";
var caseColor = 'rgba(153,142,195,1)';
var deathColor = 'rgba(241,163,64,1)';

$.getJSON(url, function(data) {
    var sheetJson = data.feed.entry;
    console.log(sheetJson);
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
            },
            // colors: {
            //     'adamsCaseRate': '#bbb',
            //     'arapahoeCaseRate': '#bbb',
            //     'boulderCaseRate': '#bbb',
            //     'denverCaseRate': '#bbb',
            //     'douglasCaseRate': '#bbb',
            //     'elpasoCaseRate': 'rgba(165,15,21,1)',
            //     'jeffersonCaseRate': '#bbb',
            //     'larimerCaseRate': '#bbb',
            //     'puebloCaseRate': '#bbb',
            //     'weldCaseRate': '#bbb'
            // },
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
                //max: 5000,
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
            //width: 800
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
            },
            // colors: {
            //     'adamsDeathRate': '#bbb',
            //     'arapahoeDeathRate': '#bbb',
            //     'boulderDeathRate': '#bbb',
            //     'denverDeathRate': '#bbb',
            //     'douglasDeathRate': '#bbb',
            //     'elpasoDeathRate': 'rgba(165,15,21,1)',
            //     'jeffersonDeathRate': '#bbb',
            //     'larimerDeathRate': '#bbb',
            //     'puebloDeathRate': '#bbb',
            //     'weldDeathRate': '#bbb'
            // },
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
                //max: 5000,
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
            //width: 800
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
                //max: 750,
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
            //width: 800
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
                //max: 750,
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
})

///// MAPS /////

/*** Function to add comma to string numbers ***/
String.prototype.commafy = function() {
    return this.replace(/(^|[^\w.])(\d{4,})/g, function($0, $1, $2) {
        return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,");
    });
};

var mapSpreadsheetID = '131RyfgkgQxrVgreeFQ3TyhZxMDHShrfAnztS6FMVPAo/1'
var mapUrl = 'https://spreadsheets.google.com/feeds/list/' + mapSpreadsheetID + '/public/full?alt=json';

/// BUBBLE CASE MAP
$.getJSON(mapUrl, function(data) {
    var output = data.feed.entry;
    var countyCoordinates = {
        'type': 'FeatureCollection',
        'features': []
    };

    for (i = 0; i < output.length; i++) {
        var longitude = (output[i].gsx$longitude.$t);
        var latitude = (output[i].gsx$latitude.$t);
        var coordinates = JSON.parse('[' + longitude + ', ' + latitude + ']');

        countyCoordinates.features.push({
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': coordinates
            },
            'properties': {
                'name': output[i].gsx$county.$t,
                'number_of_cases': output[i].gsx$numberofcases.$t,
                'number_of_deaths': output[i].gsx$numberofdeaths.$t,
                'last_reported_case': output[i].gsx$lastreportedcase.$t,
                'latest_headline': output[i].gsx$latestheadline.$t,
                'story_link': output[i].gsx$storylink.$t
            }
        });
    }

    var map = L.map('map', {
        center: [39.001, -105.7821],
        zoom: 7,
        minZoom: 5,
        maxZoom: 10,
        scrollWheelZoom: false,
        preferCanvas: true
    });

    var basemap = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://cartodb.com/attributions">CartoDB</a>',
        subdomains: "abcd",
        maxZoom: 19
    });
    basemap.addTo(map);

    /// COUNTY LAYER
    var countyStyle = {
        "color": "#ccc",
        "weight": .5,
        "fillOpacity": 0
    };

    var countyJsonLayer = new L.GeoJSON.AJAX('./scripts/colorado_county_boundaries.json', { style: countyStyle }).addTo(map);

    /// CIRCLE LAYERS
    var casesLayer = L.geoJSON(countyCoordinates, {
        pointToLayer: function(feature, latlng) {
            var circleRadius;
            var circleBorder;

            if (feature.properties.number_of_cases > 0) {
                casesCircleRadius = (Math.sqrt(feature.properties.number_of_cases) * .6)
            } else {
                casesCircleRadius = 0
            };

            var casesCircle = {
                radius: casesCircleRadius,
                fillColor: "blue",
                color: "#000",
                weight: 0,
                opacity: .75,
                fillOpacity: .35
            };

            // var popupText = '<h3 class="popup-header">' + feature.properties.name + ' County</h3><hr><div class="popup-container">Confirmed cases: <strong>' + feature.properties.number_of_cases + '</strong><br>Deaths: <strong>' + feature.properties.number_of_deaths + '</strong><br>Last reported case: <strong>' + feature.properties.last_reported_case + '</strong><br><br>Related story: <a href="' + feature.properties.story_link + '" target="_blank">' + feature.properties.latest_headline + '</a></div>';

            var popupText = '<h3 class="popup-header">' + feature.properties.name + ' County</h3><hr><div class="popup-container">Confirmed cases: <strong>' + (feature.properties.number_of_cases).commafy() + '</strong><br>Deaths: <strong>' + feature.properties.number_of_deaths + '</strong><br><br>Related story: <a href="' + feature.properties.story_link + '" target="_blank">' + feature.properties.latest_headline + '</a></div>';

            if (feature.properties.number_of_cases != '') {
                return L.circleMarker(latlng, casesCircle).bindPopup(popupText)
            }
        }
    }).addTo(map);

    var deathsLayer = L.geoJSON(countyCoordinates, {
        pointToLayer: function(feature, latlng) {
            var circleRadius;
            var circleBorder;

            if (feature.properties.number_of_deaths > 0) {
                deathsCircleRadius = (Math.sqrt(feature.properties.number_of_deaths) * .6)
            } else {
                deathsCircleRadius = 0
            };

            var deathsCircle = {
                radius: deathsCircleRadius,
                fillColor: "red",
                color: "#000",
                weight: 0,
                opacity: 0,
                fillOpacity: .75
            };

            // var popupText = '<h3 class="popup-header">' + feature.properties.name + ' County</h3><hr><div class="popup-container">Confirmed cases: <strong>' + feature.properties.number_of_cases + '</strong><br>Deaths: <strong>' + feature.properties.number_of_deaths + '</strong><br>Last reported case: <strong>' + feature.properties.last_reported_case + '</strong><br><br>Related story: <a href="' + feature.properties.story_link + '" target="_blank">' + feature.properties.latest_headline + '</a></div>';

            var popupText = '<h3 class="popup-header">' + feature.properties.name + ' County</h3><hr><div class="popup-container">Confirmed cases: <strong>' + feature.properties.number_of_cases + '</strong><br>Deaths: <strong>' + feature.properties.number_of_deaths + '</strong><br><br>Related story: <a href="' + feature.properties.story_link + '" target="_blank">' + feature.properties.latest_headline + '</a></div>';

            if (feature.properties.number_of_deaths != 0) {
                return L.circleMarker(latlng, deathsCircle).bindPopup(popupText)
            }
        }
    }).addTo(map);

    /// CHOROPLETH RATE MAP
    var geojsonCounties = {
        'type': 'FeatureCollection',
        'features': []
    };

    for (i = 0; i < output.length; i++) {
        var coords = JSON.parse(output[i].gsx$geometry.$t);

        geojsonCounties.features.push({
            'type': 'Feature',
            'geometry': {
                'type': 'MultiPolygon',
                'coordinates': coords
            },
            'properties': {
                'name': output[i].gsx$county.$t,
                'number_of_cases': output[i].gsx$numberofcases.$t,
                'number_of_deaths': output[i].gsx$numberofdeaths.$t,
                'last_reported_case': output[i].gsx$lastreportedcase.$t,
                'latest_headline': output[i].gsx$latestheadline.$t,
                'story_link': output[i].gsx$storylink.$t,
                'population': output[i].gsx$population.$t
            }
        });
    }

    var rateMap = L.map('rate-map', {
        center: [39.001, -105.7821],
        zoom: 7,
        minZoom: 5,
        maxZoom: 10,
        scrollWheelZoom: false,
        preferCanvas: true
    });

    var basemap = L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetrateMap.org/copyright">OpenStreetMap</a> &copy; <a href="https://cartodb.com/attributions">CartoDB</a>',
        subdomains: "abcd",
        maxZoom: 19
    });
    basemap.addTo(rateMap);
    L.geoJSON(geojsonCounties, {
        style: function(feature) {
            var cases = feature.properties.number_of_cases;
            var population = feature.properties.population;
            var rate = ((cases / population) * 100000);
            var fillColor;
            var borderColor;
            // Blue color ramp (light to dark): ['#f7fbff','#deebf7','#c6dbef','#9ecae1','#6baed6','#4292c6','#2171b5','#08519c','#08306b']
            if (cases > 5) {
                if (rate > 500) fillColor = '#08306b';
                else if (rate > 250) fillColor = '#2171b5';
                else if (rate > 100) fillColor = '#6baed6';
                else if (rate > 0) fillColor = '#c6dbef';
            } else if (cases == 0) fillColor = 'rgba(0,0,0,0)';
            else fillColor = '#ccc';
            return {
                color: '#000000',
                opacity: .33,
                weight: 2,
                fillColor: fillColor,
                fillOpacity: .66
            }
        },

        onEachFeature: function(feature, layer) {
            var cases = feature.properties.number_of_cases;
            var population = feature.properties.population;
            var rate = ((cases / population) * 100000).toFixed(1);
            var rateText;

            if (cases <= 5) {
                rateText = '*'
            } else rateText = rate.commafy();

            // var popupText;
            // if (cases == '') {
            //     popupText = '<h3 class="popup-header">' + feature.properties.name + ' County</h3><hr><div class="popup-container"><em>No cases reported</em></div>';
            // } else popupText = '<h3 class="popup-header">' + feature.properties.name + ' County</h3><hr><div class="popup-container">Confirmed cases: <strong>' + feature.properties.number_of_cases + '</strong><br>Case rate: <strong>' + rateText + '</strong><br>Deaths: <strong>' + feature.properties.number_of_deaths + '</strong><br>Last reported case: <strong>' + feature.properties.last_reported_case + '</strong><br><br>Related story: <a href="' + feature.properties.story_link + '" target="_blank">' + feature.properties.latest_headline + '</a></div>';
            // layer.bindPopup(
            //     popupText
            // )

            var popupText;
            if (cases == '') {
                popupText = '<h3 class="popup-header">' + feature.properties.name + ' County</h3><hr><div class="popup-container"><em>No cases reported</em></div>';
            } else popupText = '<h3 class="popup-header">' + feature.properties.name + ' County</h3><hr><div class="popup-container">Confirmed cases: <strong>' + cases.commafy() + '</strong><br>Case rate: <strong>' + rateText + '</strong><br>Deaths: <strong>' + feature.properties.number_of_deaths + '</strong><br><br>Related story: <a href="' + feature.properties.story_link + '" target="_blank">' + feature.properties.latest_headline + '</a></div>';
            layer.bindPopup(
                popupText
            )
        }
    }).addTo(rateMap)
});