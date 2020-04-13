var countyDataSpreadsheetID = '1nq3vdVED4LQLd7dHHfUbxbFwzrcm8xfjUrFRn4X28nE/4';
var url = "https://spreadsheets.google.com/feeds/list/" + countyDataSpreadsheetID + "/public/full?alt=json";
var caseColor = 'rgba(153,142,195,1)';
var deathColor = 'rgba(241,163,64,1)';

$.getJSON(url, function(data) {
    var sheetJson = data.feed.entry;
    document.getElementById('updated-time').innerHTML = sheetJson[0].gsx$updated.$t;

    /// LARIMER DAILY
    var larimerDailyChart = c3.generate({
        bindto: '#daily-chart-larimer',
        size: {
            height: 300
            //width: 800
        },
        data: {
            json: sheetJson,
            keys: {
                x: 'gsx$date.$t',
                value: ['gsx$larimercasesdaily.$t', 'gsx$larimerdeathsdaily.$t']
            },
            names: {
                'gsx$larimercasesdaily.$t': 'Daily cases',
                'gsx$larimerdeathsdaily.$t': 'Daily deaths',
            },
            types: {
                'gsx$larimercasesdaily.$t': 'bar',
                'gsx$larimerdeathsdaily.$t': 'bar',
            },
            colors: {
                'gsx$larimercasesdaily.$t': 'rgba(8,81,156,.6)',
                'gsx$larimerdeathsdaily.$t': 'rgba(165,15,21,.6)'
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
                    format: d3.format(',')
                }
            }
        },
        bar: {
            width: {
                ratio: .75
            }
        },
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
            r: 3.5
        }
    })

    /// LARIMER CUMULATIVE
    var larimerCumulativeChart = c3.generate({
        bindto: '#cumulative-chart-larimer',
        size: {
            height: 300
            //width: 800
        },
        data: {
            json: sheetJson,
            keys: {
                x: 'gsx$date.$t',
                value: ['gsx$larimercases.$t', 'gsx$larimerdeaths.$t']
            },
            names: {
                'gsx$larimercases.$t': 'Total cases',
                'gsx$larimerdeaths.$t': 'Total deaths',
            },
            types: {
                'gsx$larimercases.$t': 'line',
                'gsx$larimerdeaths.$t': 'line',
            },
            colors: {
                'gsx$larimercases.$t': 'rgba(8,81,156,.8)',
                'gsx$larimerdeaths.$t': 'rgba(165,15,21,.8)'
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
                    format: d3.format(',')
                }
            }
        },
        bar: {
            width: {
                ratio: .75
            }
        },
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
            r: 2.5
        }
    })

    /// ALL COUNTY CASE RATE LINE CHART
    var rateData = [];
    for (var i = 0; i < sheetJson.length; i++) {
        rateData.push({
            'date': sheetJson[i].gsx$date.$t,
            'adamsCaseRate': ((sheetJson[i].gsx$adamscases.$t / 511473) * 100000).toFixed(1),
            'arapahoeCaseRate': ((sheetJson[i].gsx$arapahoecases.$t / 651342) * 100000).toFixed(1),
            'boulderCaseRate': ((sheetJson[i].gsx$bouldercases.$t / 325476) * 100000).toFixed(1),
            'denverCaseRate': ((sheetJson[i].gsx$denvercases.$t / 717797) * 100000).toFixed(1),
            'douglasCaseRate': ((sheetJson[i].gsx$douglascases.$t / 342842) * 100000).toFixed(1),
            'elpasoCaseRate': ((sheetJson[i].gsx$elpasocases.$t / 714395) * 100000).toFixed(1),
            'jeffersonCaseRate': ((sheetJson[i].gsx$jeffersoncases.$t / 579491) * 100000).toFixed(1),
            'larimerCaseRate': ((sheetJson[i].gsx$larimercases.$t / 350362) * 100000).toFixed(1),
            'puebloCaseRate': ((sheetJson[i].gsx$pueblocases.$t / 167116) * 100000).toFixed(1),
            'weldCaseRate': ((sheetJson[i].gsx$weldcases.$t / 314251) * 100000).toFixed(1),
            'adamsDeathRate': ((sheetJson[i].gsx$adamsdeaths.$t / 511473) * 100000).toFixed(1),
            'arapahoeDeathRate': ((sheetJson[i].gsx$arapahoedeaths.$t / 651342) * 100000).toFixed(1),
            'boulderDeathRate': ((sheetJson[i].gsx$boulderdeaths.$t / 325476) * 100000).toFixed(1),
            'denverDeathRate': ((sheetJson[i].gsx$denverdeaths.$t / 717797) * 100000).toFixed(1),
            'douglasDeathRate': ((sheetJson[i].gsx$douglasdeaths.$t / 342842) * 100000).toFixed(1),
            'elpasoDeathRate': ((sheetJson[i].gsx$elpasodeaths.$t / 714395) * 100000).toFixed(1),
            'jeffersonDeathRate': ((sheetJson[i].gsx$jeffersondeaths.$t / 579491) * 100000).toFixed(1),
            'larimerDeathRate': ((sheetJson[i].gsx$larimerdeaths.$t / 350362) * 100000).toFixed(1),
            'puebloDeathRate': ((sheetJson[i].gsx$pueblodeaths.$t / 167116) * 100000).toFixed(1),
            'weldDeathRate': ((sheetJson[i].gsx$welddeaths.$t / 314251) * 100000).toFixed(1),
        })
    }

    var countyRateComparisonCases = c3.generate({
        bindto: '#county-rate-comparison-cases-larimer',
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
            colors: {
                'adamsCaseRate': '#bbb',
                'arapahoeCaseRate': '#bbb',
                'boulderCaseRate': '#bbb',
                'denverCaseRate': '#bbb',
                'douglasCaseRate': '#bbb',
                'elpasoCaseRate': '#bbb',
                'jeffersonCaseRate': '#bbb',
                'larimerCaseRate': 'rgba(165,15,21,1)',
                'puebloCaseRate': '#bbb',
                'weldCaseRate': '#bbb'
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
            },
            y: {
                //max: 5000,
                tick: {
                    format: d3.format(',')
                }
            }
        },
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
        bindto: '#county-rate-comparison-deaths-larimer',
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
            colors: {
                'adamsDeathRate': '#bbb',
                'arapahoeDeathRate': '#bbb',
                'boulderDeathRate': '#bbb',
                'denverDeathRate': '#bbb',
                'douglasDeathRate': '#bbb',
                'elpasoDeathRate': '#bbb',
                'jeffersonDeathRate': '#bbb',
                'larimerDeathRate': 'rgba(165,15,21,1)',
                'puebloDeathRate': '#bbb',
                'weldDeathRate': '#bbb'
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
            },
            y: {
                //max: 5000,
                tick: {
                    format: d3.format(',')
                }
            }
        },
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
})