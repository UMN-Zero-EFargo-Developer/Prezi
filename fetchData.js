const emition = [];
fetch(dataUrl("CO2PerCap", null, "2010", "2010"))
    .then(response => {
        return response.json();
    })
    .then(data => {
        data.forEach(({value, short}) => {
            emition.push({value: value, country: short});
        })
        console.log(emition);
    });

/**
 * 
 * @param {String} factor - options: [ TFCShareBySector, CO2PerCap, SDG72 ]
 * @param {String} country - default value is "USA"
 * @param {String} startYear - Optional parameter, default value is "1990"
 * @returns 
 */
function dataUrl(factor, country, startYear, endYear){
    let url = `https://api.iea.org/stats/indicator/${factor}?`;
    if(country) {
        url += `countries=${country}`;
    }
    if (startYear) {
        url += `startYear=${startYear}`;
    }
    if (endYear) {
        url += `&endYear=${endYear}`
    }
    console.log(url)
    return url;
}

