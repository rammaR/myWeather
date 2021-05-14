import { GoogleMapShape } from './google-map-shape';
import { GoogleMapHelper, CustomDraw, DRAW_TYPE } from './google-map-helper';

export class GoogleMapCircle extends GoogleMapShape {

    circle: google.maps.Circle = null;

    public init(map: google.maps.Map): boolean {
        let mapClick = null;

        console.log("Iniciar desenho de círculo");

        mapClick = ($event) => { this.draw(map, $event.latLng) };

        if (mapClick) {
            this.listener = map.addListener('click', mapClick);
            return true;
        } else {
            return false;
        }
    }

    draw(map: google.maps.Map, newPosition: google.maps.LatLng) {
        if (this.circle == null) {
            this.create(map, newPosition);
        }
    }

    load(map: google.maps.Map, draw: CustomDraw) {
        this.create(map, draw.center);
        this.circle.setRadius(draw.radius);

        super.load(map, draw);

        this.circle.setEditable(false);
        this.circle.setDraggable(false);
    }

    create(map: google.maps.Map, paths: google.maps.LatLng[] | google.maps.LatLng) {
        this.delete(map);

        this.circle = new google.maps.Circle({
            strokeColor: "#f00",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#f00",
            fillOpacity: 0.35,
            map: map,
            center: (paths as google.maps.LatLng),
            radius: map.getZoom() * 100,
            editable: true,
            draggable: true
        });

        map.setCenter(this.circle.getCenter());
    }

    cancel() {
        google.maps.event.removeListener(this.listener);

        if (this.circle !== null) {
            this.circle.setMap(null);
            this.circle = null;
        }
    }

    save(map: google.maps.Map): CustomDraw | boolean {
        google.maps.event.removeListener(this.listener);

        if (this.circle) {
            this.circle.setEditable(false);
            this.circle.setDraggable(false);

            this.marker = GoogleMapHelper.addPosition(map, this.circle.getCenter());

            let custom = {
                type: DRAW_TYPE.CIRCLE,
                marker: this.marker.getPosition(),
                center: this.circle.getCenter(),
                radius: this.circle.getRadius(),
                zoom: map.getZoom()
            }

            console.log('círculo desenhado');

            return custom;
        } else {
            return false;
        }
    }

    public delete(map: google.maps.Map): boolean {
        if (this.circle !== null) {
            GoogleMapHelper.removePosition(this.marker)

            this.circle.setMap(null);
            this.circle = null;

            return true;
        }

        return false;
    }

}