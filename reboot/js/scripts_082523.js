//https://services3.arcgis.com/66aUo8zsujfVXRIT/arcgis/rest/services/CDPHE_COVID19_State_Level_Expanded_Case_Data/FeatureServer/0/query?where=section%20%3D%20%27CASE%20SUMMARY%27%20AND%20category%20%3D%20%27CASES%27%20AND%20description%20%3D%20%277-DAY%20AVERAGE%20OF%20COVID-19%20CASES%20IN%20COLORADO%20BY%20DATE%20REPORTED%20TO%20THE%20STATE%27%20AND%20metric%20%3D%20%277-DAY%20MOVING%20AVERAGE%20OF%20CASES%27&outFields=*&resultType=standard&outSR=4326&f=json
$.getJSON("https://raw.githubusercontent.com/githamm/covid-data/main/daily_cases.json", function(result) {
    var sheetJson = result.features;

    const dailyCaseData = sheetJson.map(({ attributes }) => ({ date: attributes.date, value: attributes.value }));

    var dailyCasesChart = c3.generate({
        bindto: '#daily-cases-chart',
        size: {
            height: 250

        },
        padding: {

            right: 30,


        },
        data: {
            json: dailyCaseData,
            keys: {
                x: 'date',
                xFormat: '%m/%d/%Y',
                value: ['value']
            },
            xFormat: '%m/%d/%Y',
            names: {
                'value': 'Cases'
            },
            types: {
                'value': 'area'
            },
            colors: {
                'value': 'rgba(8, 81, 156, 1)'
            },
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%m/%d/%Y',
                    count: 5
                }
            },

            y: {
                tick: {
                    format: d3.format(',.0f')
                }
            }
        },
        tooltip: {
            format: {
                value: d3.format(',.0f')
            }
        },
        bar: {
            width: {
                ratio: .65
            }
        },
        grid: {

            y: {
                show: true
            }
        },
        legend: {
            show: false
        },
        point: {
            r: 0
        }
    });
})
//https://services3.arcgis.com/66aUo8zsujfVXRIT/arcgis/rest/services/CDPHE_COVID19_Hospital_Data/FeatureServer/0/query?where=description%20%3D%20%27CURRENTLY%20HOSPITALIZED%27%20AND%20metric%20%3D%20%27CONFIRMED%20COVID-19%27&outFields=date,value&resultType=standard&outSR=4326&f=json
$.getJSON("https://raw.githubusercontent.com/githamm/covid-data/main/weekly_hospitalizations.json", function(result) {
    var sheetJson = result.features;

    const dailyHospitalizationsData = sheetJson.map(({ attributes }) => ({ date: attributes.date, value: attributes.value }));

    var dailyHospitalizationsChart = c3.generate({
        bindto: '#daily-hospitalizations-chart',
        size: {
            height: 250

        },
        padding: {

            right: 30,


        },
        data: {
            json: dailyHospitalizationsData,
            keys: {
                x: 'date',
                xFormat: '%m/%d/%Y',
                value: ['value']
            },
            xFormat: '%m/%d/%Y',
            names: {
                'value': 'Currently hospitalized'
            },


            types: {
                'value': 'area'
            },
            colors: {
                'value': 'rgba(255, 138, 74, 1)'
            },
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%m/%d/%Y',
                    count: 5
                }
            },

            y: {
                tick: {
                    format: d3.format(',.0f')
                }
            }
        },
        bar: {
            width: {
                ratio: .65
            }
        },
        grid: {

            y: {
                show: true
            }
        },
        legend: {
            show: false
        },
        point: {
            r: 0
        }
    });
})
//https://services3.arcgis.com/66aUo8zsujfVXRIT/arcgis/rest/services/CDPHE_COVID19_State_Level_Expanded_Case_Data/FeatureServer/0/query?where=section%20%3D%20%27CASE%20SUMMARY%27%20AND%20category%20%3D%20%27DEATHS%27%20AND%20description%20%3D%20%277-DAY%20AVERAGE%20OF%20DEATHS%20AMONG%20COVID-19%20CASES%20IN%20COLORADO%20BY%20DATE%20OF%20DEATH%27%20AND%20metric%20%3D%20%277-DAY%20MOVING%20AVERAGE%20OF%20DEATHS%27&outFields=*&resultType=standard&outSR=4326&f=json
$.getJSON("https://raw.githubusercontent.com/githamm/covid-data/main/daily_deaths.json", function(result) {
    var sheetJson = result.features;

    const dailyDeathsData = sheetJson.map(({ attributes }) => ({ date: attributes.date, value: attributes.value }));

    var dailyDeathsChart = c3.generate({
        bindto: '#daily-deaths-chart',
        size: {
            height: 250

        },
        padding: {

            right: 30,


        },
        data: {
            json: dailyDeathsData,
            keys: {
                x: 'date',
                xFormat: '%m/%d/%Y',
                value: ['value']
            },
            xFormat: '%m/%d/%Y',
            names: {
                'value': 'Deaths'
            },


            types: {
                'value': 'area'
            },
            colors: {
                'value': 'rgba(165, 15, 21, 1)'
            },
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%m/%d/%Y',
                    count: 5
                }
            },

            y: {
                tick: {
                    format: d3.format(',.0f')
                }
            }
        },
        tooltip: {
            format: {
                value: d3.format(',.0f')
            }
        },
        bar: {
            width: {
                ratio: .65
            }
        },
        grid: {

            y: {
                show: true
            }
        },
        legend: {
            show: false
        },
        point: {
            r: 0
        }
    });
})

/////***** VAX VS UNVAX DATA *****/////
//https://services3.arcgis.com/66aUo8zsujfVXRIT/arcgis/rest/services/CDPHE_COVID19_Vaccine_Breakthrough_Metrics/FeatureServer/0/query?where=description%20%3D%20%27AGES%205%2B%27%20OR%20metric%20%3D%20%27UNVACCINATED%20RATE%20PER%20100K%20OF%20COVID-19%20CASES%27%20OR%20%20(metric%20%3D%20%27VACCINATED%27%20OR%20metric%20%3D%20%27WITH%20BOOSTER%20RATE%20PER%20100K%20OF%20COVID-19%20CASES%27)%20%20OR%20%20(metric%20%3D%20%27VACCINATED%27%20OR%20metric%20%3D%20%27WITHOUT%20BOOSTER%20RATE%20PER%20100K%20OF%20COVID-19%20CASES%27)%20&outFields=*&resultType=standard&resultType=standard&outSR=4326&f=json
$.getJSON("https://raw.githubusercontent.com/githamm/covid-data/main/vax_unvax_data.json", function(result) {
    var sheetJson = result.features;
    var vaccinatedAndUnvaccinatedCases = [];
    var vaccinatedBoosterCases = [];
    var vaccinatedNoBoosterCases = [];
    var unvaccinatedCases = [];
    var vaccinatedAndUnvaccinatedHospitalizations = [];
    var vaccinatedBoosterHospitalizations = [];
    var vaccinatedNoBoosterHospitalizations = [];
    var unvaccinatedHospitalizations = [];
    var vaccinatedAndUnvaccinatedDeaths = [];
    var vaccinatedBoosterDeaths = [];
    var vaccinatedNoBoosterDeaths = [];
    var unvaccinatedDeaths = [];

    // GET CASES DATA
    for (let i = 0; i < sheetJson.length; i++) {
        if (sheetJson[i].attributes.category == 'Age-Adjusted Four-Week Average COVID-19 Cases per 100,000 by Week of Specimen Collection Date & Vaccination Status') {
            vaccinatedAndUnvaccinatedCases.push({
                metric: sheetJson[i].attributes.metric,
                date: sheetJson[i].attributes.date,
                value: sheetJson[i].attributes.value
            })
        }
    }

    for (let i = 0; i < vaccinatedAndUnvaccinatedCases.length; i++) {
        if (vaccinatedAndUnvaccinatedCases[i].metric == 'Vaccinated, with Omicron booster rate per 100k of COVID-19 Cases') {
            vaccinatedBoosterCases.push({
                vaccinatedBoosterCases: vaccinatedAndUnvaccinatedCases[i].value,
                date: vaccinatedAndUnvaccinatedCases[i].date
            })
        } else if (vaccinatedAndUnvaccinatedCases[i].metric == 'Vaccinated, without Omicron booster rate per 100k of COVID-19 Cases') {
            vaccinatedNoBoosterCases.push({
                vaccinatedNoBoosterCases: vaccinatedAndUnvaccinatedCases[i].value,
                date: vaccinatedAndUnvaccinatedCases[i].date
            })
        } else unvaccinatedCases.push({
            unvaccinatedCases: vaccinatedAndUnvaccinatedCases[i].value,
            date: vaccinatedAndUnvaccinatedCases[i].date
        })
    }

    const mergeByDateCases = (a1, a2, a3) =>
        a1.map(itm => ({
            ...a2.find((item) => (item['date'] === itm['date']) && item),
            ...a3.find((item) => (item['date'] === itm['date']) && item),
            ...itm
        }));

    let finalDataCases = mergeByDateCases(vaccinatedBoosterCases, vaccinatedNoBoosterCases, unvaccinatedCases);

    // GET HOSPITALIZATIONS DATA
    for (let i = 0; i < sheetJson.length; i++) {
        if (sheetJson[i].attributes.category == 'Age-Adjusted Four-Week Average COVID-19 Hospitalizations per 100,000 by Week of Admission Date & Vaccination Status') {
            vaccinatedAndUnvaccinatedHospitalizations.push({
                metric: sheetJson[i].attributes.metric,
                date: sheetJson[i].attributes.date,
                value: sheetJson[i].attributes.value
            })
        }
    }

    for (let i = 0; i < vaccinatedAndUnvaccinatedHospitalizations.length; i++) {
        if (vaccinatedAndUnvaccinatedHospitalizations[i].metric == 'Vaccinated, with Omicron booster rate per 100k of COVID-19 Hospitalizations') {
            vaccinatedBoosterHospitalizations.push({
                vaccinatedBoosterHospitalizations: vaccinatedAndUnvaccinatedHospitalizations[i].value,
                date: vaccinatedAndUnvaccinatedHospitalizations[i].date
            })
        } else if (vaccinatedAndUnvaccinatedHospitalizations[i].metric == 'Vaccinated, without Omicron booster rate per 100k of COVID-19 Hospitalizations') {
            vaccinatedNoBoosterHospitalizations.push({
                vaccinatedNoBoosterHospitalizations: vaccinatedAndUnvaccinatedHospitalizations[i].value,
                date: vaccinatedAndUnvaccinatedHospitalizations[i].date
            })
        } else unvaccinatedHospitalizations.push({
            unvaccinatedHospitalizations: vaccinatedAndUnvaccinatedHospitalizations[i].value,
            date: vaccinatedAndUnvaccinatedHospitalizations[i].date
        })
    }

    const mergeByDateHospitalizations = (a1, a2, a3) =>
        a1.map(itm => ({
            ...a2.find((item) => (item['date'] === itm['date']) && item),
            ...a3.find((item) => (item['date'] === itm['date']) && item),
            ...itm
        }));

    let finalDataHospitalizations = mergeByDateHospitalizations(vaccinatedBoosterHospitalizations, vaccinatedNoBoosterHospitalizations, unvaccinatedHospitalizations);

    // GET DEATHS DATA
    for (let i = 0; i < sheetJson.length; i++) {
        if (sheetJson[i].attributes.category == 'Age-Adjusted Four-Week Average COVID-19 Deaths per 1 million by Month of Death & Vaccination Status') {
            vaccinatedAndUnvaccinatedDeaths.push({
                metric: sheetJson[i].attributes.metric,
                date: sheetJson[i].attributes.date,
                value: sheetJson[i].attributes.value
            })
        }
    }

    for (let i = 0; i < vaccinatedAndUnvaccinatedDeaths.length; i++) {
        if (vaccinatedAndUnvaccinatedDeaths[i].metric == 'Vaccinated, with Omicron booster rate per 1 million of COVID-19 Deaths') {
            vaccinatedBoosterDeaths.push({
                vaccinatedBoosterDeaths: vaccinatedAndUnvaccinatedDeaths[i].value,
                date: vaccinatedAndUnvaccinatedDeaths[i].date
            })
        } else if (vaccinatedAndUnvaccinatedDeaths[i].metric == 'Vaccinated, without Omicron booster rate per 1 million of COVID-19 Deaths') {
            vaccinatedNoBoosterDeaths.push({
                vaccinatedNoBoosterDeaths: vaccinatedAndUnvaccinatedDeaths[i].value,
                date: vaccinatedAndUnvaccinatedDeaths[i].date
            })
        } else unvaccinatedDeaths.push({
            unvaccinatedDeaths: vaccinatedAndUnvaccinatedDeaths[i].value,
            date: vaccinatedAndUnvaccinatedDeaths[i].date
        })
    }

    const mergeByDateDeaths = (a1, a2, a3) =>
        a1.map(itm => ({
            ...a2.find((item) => (item['date'] === itm['date']) && item),
            ...a3.find((item) => (item['date'] === itm['date']) && item),
            ...itm
        }));

    let finalDataDeaths = mergeByDateDeaths(vaccinatedBoosterDeaths, vaccinatedNoBoosterDeaths, unvaccinatedDeaths);

    //CASES VAX VS UNVAX CHART
    var vaxUnvaxCasesChart = c3.generate({
        bindto: '#weekly-cases-by-vaccination-status-chart',
        size: {
            height: 250

        },
        padding: {

            right: 30,


        },
        data: {
            json: finalDataCases,
            keys: {
                x: 'date',
                xFormat: '%m/%d/%Y',
                value: ['vaccinatedBoosterCases', 'vaccinatedNoBoosterCases', 'unvaccinatedCases']
            },
            xFormat: '%m/%d/%Y',
            names: {
                'vaccinatedBoosterCases': 'Vaccinated w/ booster',
                'vaccinatedNoBoosterCases': 'Vaccinated w/o booster',
                'unvaccinatedCases': 'Unvaccinated'
            },


            types: {
                'vaccinatedBoosterCases': 'line',
                'vaccinatedNoBoosterCases': 'line',
                'unvaccinatedCases': 'line'
            },
            colors: {
                'vaccinatedBoosterCases': 'green',
                'vaccinatedNoBoosterCases': 'gray',
                'unvaccinatedCases': 'purple'
            },
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%m/%d/%Y',
                    count: 5
                }
            },

            y: {
                tick: {
                    format: d3.format(',.0f')
                }
            }
        },
        tooltip: {
            format: {
                value: d3.format(',0.0f')
            }
        },
        bar: {
            width: {
                ratio: .65
            }
        },
        grid: {

            y: {
                show: true
            }
        },
        legend: {
            show: true,
            position: 'inset'
        },
        point: {
            r: 0
        }
    });

    //HOSPITALIZATIONS VAX VS UNVAX CHART
    var vaxUnvaxHospitalizationsChart = c3.generate({
        bindto: '#weekly-hospitalizations-by-vaccination-status-chart',
        size: {
            height: 250

        },
        padding: {

            right: 30,


        },
        data: {
            json: finalDataHospitalizations,
            keys: {
                x: 'date',
                xFormat: '%m/%d/%Y',
                value: ['vaccinatedBoosterHospitalizations', 'vaccinatedNoBoosterHospitalizations', 'unvaccinatedHospitalizations']
            },
            xFormat: '%m/%d/%Y',
            names: {
                'vaccinatedBoosterHospitalizations': 'Vaccinated w/ booster',
                'vaccinatedNoBoosterHospitalizations': 'Vaccinated w/o booster',
                'unvaccinatedHospitalizations': 'Unvaccinated'
            },


            types: {
                'vaccinatedBoosterHospitalizations': 'line',
                'vaccinatedNoBoosterHospitalizations': 'line',
                'unvaccinatedHospitalizations': 'line'
            },
            colors: {
                'vaccinatedBoosterHospitalizations': 'green',
                'vaccinatedNoBoosterHospitalizations': 'gray',
                'unvaccinatedHospitalizations': 'purple'
            },
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%m/%d/%Y',
                    count: 5
                }
            },

            y: {
                tick: {
                    format: d3.format(',.0f')
                }
            }
        },
        tooltip: {
            format: {
                value: d3.format(',0.0f')
            }
        },
        bar: {
            width: {
                ratio: .65
            }
        },
        grid: {

            y: {
                show: true
            }
        },
        legend: {
            show: true,
            position: 'inset'
        },
        point: {
            r: 0
        }
    });

    //DEATHS VAX VS UNVAX CHART
    var vaxUnvaxDeathsChart = c3.generate({
        bindto: '#monthly-deaths-by-vaccination-status-chart',
        size: {
            height: 250

        },
        padding: {

            right: 30,


        },
        data: {
            json: finalDataDeaths,
            keys: {
                x: 'date',
                xFormat: '%m/%d/%Y',
                value: ['vaccinatedBoosterDeaths', 'vaccinatedNoBoosterDeaths', 'unvaccinatedDeaths']
            },
            xFormat: '%m/%d/%Y',
            names: {
                'vaccinatedBoosterDeaths': 'Vaccinated w/ booster',
                'vaccinatedNoBoosterDeaths': 'Vaccinated w/o booster',
                'unvaccinatedDeaths': 'Unvaccinated'
            },


            types: {
                'vaccinatedBoosterDeaths': 'line',
                'vaccinatedNoBoosterDeaths': 'line',
                'unvaccinatedDeaths': 'line'
            },
            colors: {
                'vaccinatedBoosterDeaths': 'green',
                'vaccinatedNoBoosterDeaths': 'gray',
                'unvaccinatedDeaths': 'purple'
            },
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%m/%d/%Y',
                    count: 5
                }
            },

            y: {
                tick: {
                    format: d3.format(',.0f')
                }
            }
        },
        tooltip: {
            format: {
                value: d3.format(',0.0f')
            }
        },
        bar: {
            width: {
                ratio: .65
            }
        },
        grid: {

            y: {
                show: true
            }
        },
        legend: {
            show: true,
            position: 'inset'
        },
        point: {
            r: 0
        }
    });
});

/////***** STATEWIDE CUMULATIVE TOTALS *****/////
//https://services3.arcgis.com/66aUo8zsujfVXRIT/arcgis/rest/services/CDPHE_COVID19_State_Level_Expanded_Case_Data/FeatureServer/0/query?where=section%20%3D%20%27STATE%20DATA%27%20AND%20category%20%3D%20%27COLORADO%20COVID-19%20DATA%27%20AND%20description%20%3D%20%27CUMULATIVE%20COUNTS%20TO%20DATE%27&outFields=*&resultType=standard&outSR=4326&f=json
$.getJSON("https://raw.githubusercontent.com/githamm/covid-data/main/statewide_cumulative_totals.json", function(result) {
    var sheetJson = result.features;
    var totalCases;
    var totalHospitalized;
    var totalDeaths;
    var dateUpdated;

    for (let i = 0; i < sheetJson.length; i++) {
        if (sheetJson[i].attributes.metric == 'Cases') {
            totalCases = sheetJson[i].attributes.value
        } else if (sheetJson[i].attributes.metric == 'Hospitalized') {
            totalHospitalized = sheetJson[i].attributes.value
        } else if (sheetJson[i].attributes.metric == 'Deaths Due to COVID-19') {
            totalDeaths = sheetJson[i].attributes.value
        } else dateUpdated = sheetJson[i].attributes.publish_date
    }

    function timeConverter(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = month + ' ' + date + ' ' + year;
        return time;
    }

    document.getElementById('total-cases').innerHTML = totalCases.toLocaleString();
    document.getElementById('total-hospitalized').innerHTML = totalHospitalized.toLocaleString();
    document.getElementById('total-deaths').innerHTML = totalDeaths.toLocaleString();
    document.getElementById('date-updated').innerHTML = timeConverter(dateUpdated);
})

/////***** POSITIVITY RATE *****/////
//https://services3.arcgis.com/66aUo8zsujfVXRIT/arcgis/rest/services/CDPHE_COVID19_Sentinel_Positivity/FeatureServer/0/query?where=1%3D1&outFields=*&resultType=standard&outSR=4326&f=json
$.getJSON("https://raw.githubusercontent.com/githamm/covid-data/main/daily_positivity_rate.json", function(result) {
    var sheetJson = result.features;

    const weeklyPositivityData = sheetJson.map(({ attributes }) => ({ date: attributes.week_start_date, value: attributes.week_positivity }));

    var weeklyPositivityChart = c3.generate({
        bindto: '#daily-positivity-chart',
        size: {
            height: 250

        },
        padding: {

            right: 30,


        },
        data: {
            json: weeklyPositivityData,
            keys: {
                x: 'date',
                xFormat: '%m/%d/%Y',
                value: ['value']
            },
            xFormat: '%m/%d/%Y',
            names: {
                'value': 'Positivity rate'
            },
            types: {
                'value': 'area'
            },
            colors: {
                'value': 'rgba(155, 82, 8, 1)'
            },
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%m/%d/%Y',
                    count: 5
                }
            },

            y: {
                tick: {
                    format: d3.format('.0%')
                }
            }
        },
        tooltip: {
            format: {
                value: d3.format('.1%')
            }
        },
        bar: {
            width: {
                ratio: .65
            }
        },
        grid: {

            y: {
                show: true
            }
        },
        legend: {
            show: false
        },
        point: {
            r: 0
        }
    });
})

/////***** TESTING *****/////
//https://services3.arcgis.com/66aUo8zsujfVXRIT/arcgis/rest/services/CDPHE_COVID19_Sentinel_Positivity/FeatureServer/0/query?where=1%3D1&outFields=*&resultType=standard&outSR=4326&f=json
$.getJSON("https://raw.githubusercontent.com/githamm/covid-data/main/weekly_tests.json", function(result) {
    var sheetJson = result.features;

    const weeklyTestsData = sheetJson.map(({ attributes }) => ({ date: attributes.week_start_date, positive_tests: attributes.total_positive_covid_tests, total_tests: attributes.total_covid_tests }));

    var weeklyTestsChart = c3.generate({
        bindto: '#weekly-tests-chart',
        size: {
            height: 250

        },
        padding: {

            right: 30,


        },
        data: {
            json: weeklyTestsData,
            keys: {
                x: 'date',
                xFormat: '%m/%d/%Y',
                value: ['positive_tests', 'total_tests']
            },
            xFormat: '%m/%d/%Y',
            names: {
                'positive_tests': 'Positive tests',
                'total_tests': 'Total tests'
            },
            type: 'line',
            colors: {
                'positive_tests': 'rgba(155, 82, 8, 1)',
                'total_tests': 'black'
            },
        },
        axis: {
            x: {
                type: 'timeseries',
                tick: {
                    format: '%m/%d/%Y',
                    count: 5
                }
            },

            y: {
                tick: {
                    format: d3.format(',.0f')
                }
            }
        },
        tooltip: {
            format: {
                value: d3.format(',.0f')
            }
        },
        bar: {
            width: 3
        },
        grid: {

            y: {
                show: true
            }
        },
        legend: {
            show: true,
            position: 'inset'
        },
        point: {
            r: 0
        }
    });
})

/////***** COUNTY TOTALS *****/////
//https://services3.arcgis.com/66aUo8zsujfVXRIT/arcgis/rest/services/CDPHE_COVID19_State_Level_Expanded_Case_Data/FeatureServer/0/query?where=section%20%3D%20%27CASE%20SUMMARY%27%20AND%20category%20%3D%20%27MAPS%27&outFields=*&outSR=4326&f=json
$.getJSON("https://raw.githubusercontent.com/githamm/covid-data/main/county_cumulative_totals.json", function(result) {
    var sheetJson = result.features;
    var caseRates = [];
    var caseCounts = [];
    var deathRates = [];
    var deathCounts = [];
    var countyPopulation = [{ "county_name": "Adams County", "population": 519572 }, { "county_name": "Alamosa County", "population": 16376 }, { "county_name": "Arapahoe County", "population": 655070 }, { "county_name": "Archuleta County", "population": 13359 }, { "county_name": "Baca County", "population": 3506 }, { "county_name": "Bent County", "population": 5650 }, { "county_name": "Boulder County", "population": 330758 }, { "county_name": "Broomfield County", "population": 74112 }, { "county_name": "Chaffee County", "population": 19476 }, { "county_name": "Cheyenne County", "population": 1748 }, { "county_name": "Clear Creek County", "population": 9397 }, { "county_name": "Conejos County", "population": 7461 }, { "county_name": "Costilla County", "population": 3499 }, { "county_name": "Crowley County", "population": 5922 }, { "county_name": "Custer County", "population": 4704 }, { "county_name": "Delta County", "population": 31196 }, { "county_name": "Denver County", "population": 715522 }, { "county_name": "Dolores County", "population": 2326 }, { "county_name": "Douglas County", "population": 357978 }, { "county_name": "Eagle County", "population": 55731 }, { "county_name": "Elbert County", "population": 26062 }, { "county_name": "El Paso County", "population": 730395 }, { "county_name": "Fremont County", "population": 48939 }, { "county_name": "Garfield County", "population": 61685 }, { "county_name": "Gilpin County", "population": 5808 }, { "county_name": "Grand County", "population": 15717 }, { "county_name": "Gunnison County", "population": 16918 }, { "county_name": "Hinsdale County", "population": 788 }, { "county_name": "Huerfano County", "population": 6820 }, { "county_name": "Jackson County", "population": 1379 }, { "county_name": "Jefferson County", "population": 582910 }, { "county_name": "Kiowa County", "population": 1446 }, { "county_name": "Kit Carson County", "population": 7087 }, { "county_name": "Lake County", "population": 7436 }, { "county_name": "La Plata County", "population": 55638 }, { "county_name": "Larimer County", "population": 359066 }, { "county_name": "Las Animas County", "population": 14555 }, { "county_name": "Lincoln County", "population": 5675 }, { "county_name": "Logan County", "population": 21528 }, { "county_name": "Mesa County", "population": 155703 }, { "county_name": "Mineral County", "population": 865 }, { "county_name": "Moffat County", "population": 13292 }, { "county_name": "Montezuma County", "population": 25849 }, { "county_name": "Montrose County", "population": 42679 }, { "county_name": "Morgan County", "population": 29111 }, { "county_name": "Otero County", "population": 18690 }, { "county_name": "Ouray County", "population": 4874 }, { "county_name": "Park County", "population": 17390 }, { "county_name": "Phillips County", "population": 4530 }, { "county_name": "Pitkin County", "population": 17358 }, { "county_name": "Prowers County", "population": 11999 }, { "county_name": "Pueblo County", "population": 168162 }, { "county_name": "Rio Blanco County", "population": 6529 }, { "county_name": "Rio Grande County", "population": 11539 }, { "county_name": "Routt County", "population": 24829 }, { "county_name": "Saguache County", "population": 6368 }, { "county_name": "San Juan County", "population": 705 }, { "county_name": "San Miguel County", "population": 8072 }, { "county_name": "Sedgwick County", "population": 2404 }, { "county_name": "Summit County", "population": 31055 }, { "county_name": "Teller County", "population": 24710 }, { "county_name": "Washington County", "population": 4817 }, { "county_name": "Weld County", "population": 328981 }, { "county_name": "Yuma County", "population": 9988 }];

    for (let i = 0; i < sheetJson.length; i++) {
        if (sheetJson[i].attributes.description == 'Case Rates Per 100,000 People in Colorado by County') {
            caseRates.push({
                county_name: sheetJson[i].attributes.metric,
                case_rate: sheetJson[i].attributes.value
            })
        } else if (sheetJson[i].attributes.description == 'Cases of COVID-19 in Colorado by County') {
            caseCounts.push({
                county_name: sheetJson[i].attributes.metric,
                case_count: sheetJson[i].attributes.value
            })
        } else if (sheetJson[i].attributes.description == 'Deaths Among COVID-19 Cases Rates Per 100,000 People in Colorado by County') {
            deathRates.push({
                county_name: sheetJson[i].attributes.metric,
                death_rate: sheetJson[i].attributes.value
            })
        } else if (sheetJson[i].attributes.description == 'Deaths Among COVID-19 Cases in Colorado by County') {
            deathCounts.push({
                county_name: sheetJson[i].attributes.metric,
                death_count: sheetJson[i].attributes.value
            })
        }
    }

    const mergeByCountyName = (a1, a2, a3, a4, a5) =>
        a1.map(itm => ({
            ...a2.find((item) => (item['county_name'] === itm['county_name']) && item),
            ...a3.find((item) => (item['county_name'] === itm['county_name']) && item),
            ...a4.find((item) => (item['county_name'] === itm['county_name']) && item),
            ...a5.find((item) => (item['county_name'] === itm['county_name']) && item),
            ...itm
        }));

    let countyData = mergeByCountyName(caseRates, caseCounts, deathRates, deathCounts, countyPopulation);

    countyData = countyData.filter(function(obj) {
        return obj.county_name !== 'Colorado';
    });

    countyData = countyData.filter(function(obj) {
        return obj.county_name !== 'International';
    });

    // For some reason CDPHE started reporting each county's data nine separate times, which would result in nine duplicate rows for each county in the table. This de-dupes it (8/25/23)
    countyData = countyData.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.county_name === value.county_name
        ))
    );

    // TABLE
    //$(document).ready(function() {
    var table = $('#county-table').DataTable({
        data: countyData,
        paging: false,
        scrollX: true,
        fixedHeader: true,
        dom: '<<t>>',
        columns: [
            { data: 'county_name' },
            { data: 'case_count', render: $.fn.dataTable.render.number(',', '.', 0, '') },
            { data: 'case_rate', render: $.fn.dataTable.render.number(',', '.', 1, '') },
            { data: 'death_count', render: $.fn.dataTable.render.number(',', '.', 0, '') },
            { data: 'death_rate', render: $.fn.dataTable.render.number(',', '.', 1, ''), type: 'num' },
            { data: 'population', render: $.fn.dataTable.render.number(',', '.', 0, '') }
        ]
    })
    $.fn.dataTableExt.afnFiltering.push(function(settings, data, dataIndex) {
        if (data[5] == '')
            return false;
        else
            return true;
    });
    table.draw();

    $('#filter-button').click(function() {
        $.fn.dataTableExt.afnFiltering.push(function(settings, data, dataIndex) {
            if (data[5] > 100000)
                return true;
            else
                return false;
        })
        table.draw();
    })
    $('#reset-button').on('click', function(e) {
        e.preventDefault();
        $.fn.dataTableExt.afnFiltering.length = 0;
        table.draw();
        $.fn.dataTableExt.afnFiltering.push(function(settings, data, dataIndex) {
            if (data[5] == '')
                return false;
            else
                return true;
        });
        table.draw();
    });
})