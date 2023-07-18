//https://services3.arcgis.com/66aUo8zsujfVXRIT/arcgis/rest/services/colorado_covid19_state_statistics_cumulative/FeatureServer/0/query?where=description%20%3D%20%277-DAY%20AVERAGE%20OF%20COVID-19%20CASES%20IN%20COLORADO%20BY%20DATE%20REPORTED%20TO%20THE%20STATE%27&outFields=date,value&outSR=4326&f=json
$.getJSON("https://raw.githubusercontent.com/githamm/covid-data/main/daily_cases.json", function(result) {
    var sheetJson = result.features;

    const test = sheetJson.map(({ attributes }) => ({ date: attributes.date, value: attributes.value }));

    var dailyCasesChart = c3.generate({
        bindto: '#daily-cases-chart',
        size: {
            height: 250

        },
        padding: {

            right: 30,


        },
        data: {
            json: test,
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
//https://services3.arcgis.com/66aUo8zsujfVXRIT/arcgis/rest/services/CDPHE_COVID19_Hospital_Data/FeatureServer/0/query?where=description%20%3D%20%27CURRENTLY%20HOSPITALIZED%27%20AND%20metric%20%3D%20%27CONFIRMED%20COVID-19%27&outFields=date,value&outSR=4326&f=json
$.getJSON("https://raw.githubusercontent.com/githamm/covid-data/main/weekly_hospitalizations.json", function(result) {
    var sheetJson = result.features;

    const test = sheetJson.map(({ attributes }) => ({ date: attributes.date, value: attributes.value }));

    var dailyCasesChart = c3.generate({
        bindto: '#daily-hospitalizations-chart',
        size: {
            height: 250

        },
        padding: {

            right: 30,


        },
        data: {
            json: test,
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
//https://services3.arcgis.com/66aUo8zsujfVXRIT/arcgis/rest/services/colorado_covid19_state_statistics_cumulative/FeatureServer/0/query?where=description%20%3D%20%277-DAY%20AVERAGE%20OF%20DEATHS%20AMONG%20COVID-19%20CASES%20IN%20COLORADO%20BY%20DATE%20OF%20DEATH%27&outFields=date,value&outSR=4326&f=json
$.getJSON("https://raw.githubusercontent.com/githamm/covid-data/main/daily_deaths.json", function(result) {
    var sheetJson = result.features;

    const test = sheetJson.map(({ attributes }) => ({ date: attributes.date, value: attributes.value }));

    var dailyCasesChart = c3.generate({
        bindto: '#daily-deaths-chart',
        size: {
            height: 250

        },
        padding: {

            right: 30,


        },
        data: {
            json: test,
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
//https://services3.arcgis.com/66aUo8zsujfVXRIT/arcgis/rest/services/CDPHE_COVID19_Vaccine_Breakthrough_Metrics/FeatureServer/0/query?where=description%20%3D%20%27AGES%205%2B%27%20OR%20metric%20%3D%20%27UNVACCINATED%20RATE%20PER%20100K%20OF%20COVID-19%20CASES%27%20OR%20%20(metric%20%3D%20%27VACCINATED%27%20OR%20metric%20%3D%20%27WITH%20BOOSTER%20RATE%20PER%20100K%20OF%20COVID-19%20CASES%27)%20%20OR%20%20(metric%20%3D%20%27VACCINATED%27%20OR%20metric%20%3D%20%27WITHOUT%20BOOSTER%20RATE%20PER%20100K%20OF%20COVID-19%20CASES%27)%20&outFields=*&outSR=4326&f=json
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
    console.log(vaccinatedAndUnvaccinatedCases);

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
//https://services3.arcgis.com/66aUo8zsujfVXRIT/arcgis/rest/services/colorado_covid19_state_statistics_cumulative/FeatureServer/0/query?where=section%20%3D%20%27STATE%20DATA%27&outFields=*&outSR=4326&f=json
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
        } else dateUpdated = sheetJson[i].attributes.report_date
    }

    document.getElementById('total-cases').innerHTML = totalCases.toLocaleString();
    document.getElementById('total-hospitalized').innerHTML = totalHospitalized.toLocaleString();
    document.getElementById('total-deaths').innerHTML = totalDeaths.toLocaleString();
    document.getElementById('date-updated').innerHTML = dateUpdated;
})

/////***** POSITIVITY RATE *****/////
//https://services3.arcgis.com/66aUo8zsujfVXRIT/arcgis/rest/services/colorado_covid19_laboratory_positivity_data/FeatureServer/0/query?where=Desc_%20%3D%20%27DAILY%20COVID-19%20PCR%20TEST%20DATA%20FROM%20CLINICAL%20LABORATORIES%27%20AND%20Metric%20%3D%20%277-DAY%20AVERAGE%20PERCENT%20POSITIVITY%27&outFields=*&outSR=4326&f=json
$.getJSON("https://raw.githubusercontent.com/githamm/covid-data/main/daily_positivity_rate.json", function(result) {
    var sheetJson = result.features;

    const test = sheetJson.map(({ attributes }) => ({ date: attributes.Attr_Date, value: attributes.Value }));

    var dailyPositivityChart = c3.generate({
        bindto: '#daily-positivity-chart',
        size: {
            height: 250

        },
        padding: {

            right: 30,


        },
        data: {
            json: test,
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
//https://services3.arcgis.com/66aUo8zsujfVXRIT/arcgis/rest/services/colorado_covid19_laboratory_positivity_data/FeatureServer/0/query?where=Desc_%20%3D%20'WEEKLY%20COVID-19%20PCR%20TEST%20DATA%20FROM%20CLINICAL%20LABORATORIES'%20AND%20Metric%20%3D%20'PEOPLE%20TESTED%20AT%20NON-CDPHE%20(COMMERICAL)%20LABS'%20OR%20Metric%20%3D%20'PEOPLE%20TESTED%20AT%20CDPHE%20STATE%20LAB'&outFields=*&outSR=4326&f=json
$.getJSON("https://raw.githubusercontent.com/githamm/covid-data/main/weekly_tests.json", function(result) {
    var sheetJson = result.features;

    var allTests = [];
    var stateLabTests = [];
    var commercialLabTests = [];

    for (let i = 0; i < sheetJson.length; i++) {
        if (sheetJson[i].attributes.Desc_ == 'Weekly COVID-19 PCR Test Data From Clinical Laboratories') {
            allTests.push({
                metric: sheetJson[i].attributes.Metric,
                date: sheetJson[i].attributes.Attr_Date,
                value: sheetJson[i].attributes.Value
            })
        }
    }

    for (let i = 0; i < allTests.length; i++) {
        if (allTests[i].metric == 'People Tested at CDPHE State Lab') {
            stateLabTests.push({
                state_lab_tests: allTests[i].value,
                date: allTests[i].date
            })
        } else commercialLabTests.push({
            commercial_lab_tests: allTests[i].value,
            date: allTests[i].date
        })
    }

    // Calculate simple moving average
    const calculateItemsSum = (data, start, stop) => {
        let sum = 0;
        for (let j = start; j < stop; ++j) {
            sum += data[j];
        }
        return sum;
    };

    const mergeByDate = (a1, a2) =>
        a1.map(itm => ({
            ...a2.find((item) => (item['date'] === itm['date']) && item),
            ...itm
        }));

    let finalData = mergeByDate(stateLabTests, commercialLabTests);

    var weeklyTestsChart = c3.generate({
        bindto: '#weekly-tests-chart',
        size: {
            height: 250

        },
        padding: {

            right: 30,


        },
        data: {
            json: finalData,
            keys: {
                x: 'date',
                xFormat: '%m/%d/%Y',
                value: ['state_lab_tests', 'commercial_lab_tests']
            },
            xFormat: '%m/%d/%Y',
            names: {
                'state_lab_tests': 'State lab tests',
                'commercial_lab_tests': 'Commercial lab tests'
            },


            types: {
                'state_lab_tests': 'area-spline',
                'commercial_lab_tests': 'area-spline'
            },
            // type: 'bar',
            groups: [
                ['state_lab_tests', 'commercial_lab_tests']
            ],
            //order: 'asc',
            colors: {
                'state_lab_tests': 'black',
                'commercial_lab_tests': 'gray'
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
//https://services3.arcgis.com/66aUo8zsujfVXRIT/arcgis/rest/services/colorado_cdphe_covid19_county_id_rate/FeatureServer/0/query?where=1%3D1&outFields=LABEL,County_Population,County_Rate_Per_100_000,County_Deaths,County_Pos_Cases&returnGeometry=false&outSR=4326&f=json
$.getJSON("https://raw.githubusercontent.com/githamm/covid-data/main/county_cumulative_totals.json", function(result) {
    var sheetJson = result.features;

    var countyCases;
    var countyDeaths;
    var countyCaseRate;
    var CountyDeathRate;
    var newArray = [];

    for (let i = 0; i < sheetJson.length; i++) {
        countyCaseRate = ((sheetJson[i].attributes.County_Pos_Cases / sheetJson[i].attributes.County_Population) * 100000);
        countyDeathRate = ((sheetJson[i].attributes.County_Deaths / sheetJson[i].attributes.County_Population) * 100000)
        newArray.push({
            case_rate: countyCaseRate,
            death_rate: countyDeathRate,
            cases: sheetJson[i].attributes.County_Pos_Cases,
            deaths: sheetJson[i].attributes.County_Deaths,
            population: sheetJson[i].attributes.County_Population,
            county_name: sheetJson[i].attributes.LABEL
        })
    }

    // TABLE
    //$(document).ready(function() {
    var table = $('#county-table').DataTable({
        data: newArray,
        paging: false,
        scrollX: true,
        fixedHeader: true,
        dom: '<<t>>',
        columns: [
            { data: 'county_name' },
            { data: 'cases', render: $.fn.dataTable.render.number(',', '.', 0, '') },
            { data: 'case_rate', render: $.fn.dataTable.render.number(',', '.', 1, '') },
            { data: 'deaths', render: $.fn.dataTable.render.number(',', '.', 0, '') },
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