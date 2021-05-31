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
 * @param {String} factor - Options: "TFCShareBySector" | "CO2PerCap" | "SDG72" 
 * @param {String} country - Optional
 * @param {String} [startYear='1990']
 * @param {String} endYear
 * @returns 
 */
function dataUrl(factor, country, startYear=1990, endYear){
    let url = `https://api.iea.org/stats/indicator/${factor}?`;
    if(country) {
        url += `countries=${country}&`;
    }
    if (startYear) {
        url += `startYear=${startYear}&`;
    }
    if (endYear) {
        url += `endYear=${endYear}`
    }
    console.log(url)
    return url;
}

dataUrl()