var countyDataSpreadsheetID = '1nq3vdVED4LQLd7dHHfUbxbFwzrcm8xfjUrFRn4X28nE/4';
var url = "https://spreadsheets.google.com/feeds/list/" + countyDataSpreadsheetID + "/public/full?alt=json";
var caseColor = 'rgba(153,142,195,1)';
var deathColor = 'rgba(241,163,64,1)';

$.getJSON(url, function(data) {
    var sheetJson = data.feed.entry;
    document.getElementById('updated-time').innerHTML = sheetJson[0].gsx$updated.$t;

    /// EL PASO DAILY
    var elPasoDailyChart = c3.generate({
        bindto: '#el-paso-daily-chart',
        size: {
            height: 300
            //width: 800
        },
        data: {
            json: sheetJson,
            keys: {
                x: 'gsx$date.$t',
                value: ['gsx$elpasocasesdaily.$t', 'gsx$elpasodeathsdaily.$t']
            },
            names: {
                'gsx$elpasocasesdaily.$t': 'Daily cases',
                'gsx$elpasodeathsdaily.$t': 'Daily deaths',
            },
            types: {
                'gsx$elpasocasesdaily.$t': 'bar',
                'gsx$elpasodeathsdaily.$t': 'bar',
            },
            colors: {
                'gsx$elpasocasesdaily.$t': 'rgba(8,81,156,.6)',
                'gsx$elpasodeathsdaily.$t': 'rgba(165,15,21,.6)'
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

    /// EL PASO CUMULATIVE
    var elPasoCumulativeChart = c3.generate({
        bindto: '#el-paso-cumulative-chart',
        size: {
            height: 300
            //width: 800
        },
        data: {
            json: sheetJson,
            keys: {
                x: 'gsx$date.$t',
                value: ['gsx$elpasocases.$t', 'gsx$elpasodeaths.$t']
            },
            names: {
                'gsx$elpasocases.$t': 'Total cases',
                'gsx$elpasodeaths.$t': 'Total deaths',
            },
            types: {
                'gsx$elpasocases.$t': 'line',
                'gsx$elpasodeaths.$t': 'line',
            },
            colors: {
                'gsx$elpasocases.$t': 'rgba(8,81,156,.8)',
                'gsx$elpasodeaths.$t': 'rgba(165,15,21,.8)'
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
            colors: {
                'adamsCaseRate': '#bbb',
                'arapahoeCaseRate': '#bbb',
                'boulderCaseRate': '#bbb',
                'denverCaseRate': '#bbb',
                'douglasCaseRate': '#bbb',
                'elpasoCaseRate': 'rgba(8,81,156,.9)',
                'jeffersonCaseRate': '#bbb',
                'larimerCaseRate': '#bbb',
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
            colors: {
                'adamsDeathRate': '#bbb',
                'arapahoeDeathRate': '#bbb',
                'boulderDeathRate': '#bbb',
                'denverDeathRate': '#bbb',
                'douglasDeathRate': '#bbb',
                'elpasoDeathRate': 'rgba(165,15,21,.9)',
                'jeffersonDeathRate': '#bbb',
                'larimerDeathRate': '#bbb',
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
                'numberofcases': 'rgba(8,81,156,.6)'
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
                'numberofdeaths': 'rgba(165,15,21,.6)'
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