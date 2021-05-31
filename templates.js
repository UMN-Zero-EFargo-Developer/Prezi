/**
 * This function accepts an JSON object and create a marker on the map. A sample data could be found in ./data/game_data.js - GAMES.
 * @param {Object} data 
 * @param {Number} data.id
 * @param {String} data.title
 * @param {String} data.location
 * @param {Number[]} data.coord
 * @param {String} data.info
 * @param {String} data.playScale
 * @param {String} data.impactScale
 * @param {String=} data.url
 * @returns 
 */
function mapMarker(data) {
    if (data.coord.length !== 2) {
        throw Error("Illegle coordinate data. The length of data.coord[] must equal to 2!");
        return "Coordinate of this location is not correct!";
    } else {
        var markerElement = document.createElement('button');
        markerElement.setAttribute("data-toggle", "modal");
        markerElement.setAttribute("data-target", "#gameModal");
        markerElement.setAttribute("class", "marker");
        markerElement.onclick = function () {
            document.getElementById("gameModalLabel").innerHTML = `<h4>${data.title}</h4><h5>${data.location}</h5>`;
            document.getElementById("gameModalBody").innerHTML = `<p>${data.info}</p><p><b>Player Scale: </b>${data.playScale}</p><p><b>Impact Scale: </b>${data.impactScale}</p>`
            document.getElementById("gameModalLink").style.visibility = "visible";
            document.getElementById("gameModalLink").href = data.url;
        }
        return markerElement;
    }
    
}
