export enum DRAW_TYPE {
    POLYGON = 1,
    CIRCLE = 2
}

export interface CustomDraw {
    type: DRAW_TYPE,
    zoom: number,
    marker: google.maps.LatLng,
    coordinates?: google.maps.LatLng[],
    center?: google.maps.LatLng,
    radius?: number
}

export class GoogleMapHelper {

    static addPosition(map: google.maps.Map, position: google.maps.LatLng): google.maps.Marker {
        var marker = new google.maps.Marker({ position: position, map: map });
        map.setCenter(position);
        console.log("addPosition: new position: " + JSON.stringify(position));

        return marker;
    }    

    static removePosition(marker: google.maps.Marker): boolean {
        try {
            if (marker) {
                marker.setMap(null);
                marker = null;
            }
        } catch (error) {
            console.error("removePosition: " + error);
            return false;
        }

        return true;
    }
}
