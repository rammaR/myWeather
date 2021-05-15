import { GoogleMapShape } from './google-map-shape';
import { GoogleMapHelper, DRAW_TYPE, CustomDraw } from './google-map-helper';

export class GoogleMapPolygon extends GoogleMapShape {

    polygon: google.maps.Polygon = null;
    polygonPaths: google.maps.LatLng[];

    public init(map: google.maps.Map): boolean {
        let mapClick = null;

        this.polygonPaths = [];
        mapClick = ($event) => { 
            this.draw(map, $event.latLng) 
        };

        if (mapClick) {
            this.listener = map.addListener('click', mapClick);
            console.log("Iniciar desenho de polígono");

            return true;
        } else {
            return false;
        }
    }

    draw(map: google.maps.Map, newPosition: google.maps.LatLng) {
        this.polygonPaths.push(newPosition);

        //Se objeto polígono está nulo, cria, senão apenas inclui novo ponto (LatLng) determinado pelo usuário
        (this.polygon == null) ? this.create(map, this.polygonPaths) : this.polygon.setPaths(this.polygonPaths);
    }

    load(map: google.maps.Map, draw: CustomDraw) {
        //passa as coornedadas do desenho
        this.create(map, draw.coordinates);        
        super.load(map, draw);
        this.polygon.setEditable(false);
        this.polygon.setDraggable(false);
    }

    create(map: google.maps.Map, paths: google.maps.LatLng[]) {
        //Caseo essa função for chamada, com polígono já criado, ele deve ser anulado antes
        this.delete(map);

        this.polygon = new google.maps.Polygon({
            paths: paths,
            strokeColor: "#f00",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#f00",
            fillOpacity: 0.35,
            editable: true
        });

        this.polygon.setMap(map);
        map.setCenter(paths[0]);
    }

    cancel() {
        google.maps.event.removeListener(this.listener);

        if (this.polygon !== null) {
            this.polygon.setMap(null);
            this.polygon = null;
        }
    }

    save(map: google.maps.Map): CustomDraw | boolean {
        google.maps.event.removeListener(this.listener);

        if (this.polygon) {
            this.polygon.setEditable(false);
            this.polygon.setDraggable(false);

            var vertices = this.polygon.getPath();
            if (vertices.getLength() >= 0) {
                this.marker = GoogleMapHelper.addPosition(map, vertices.getAt(0));
            }

            console.log('polígono desenhado!');

            let custom: CustomDraw = {
                type: DRAW_TYPE.POLYGON,
                coordinates: this.polygonPaths,
                marker: this.marker.getPosition(),
                zoom: map.getZoom()
            }

            return custom;
        } else {
            return false;
        }

    }

    public delete(map: google.maps.Map) : boolean {

        if (this.polygon !== null) {
            GoogleMapHelper.removePosition(this.marker);

            google.maps.event.removeListener(this.listener);
            this.polygon.setMap(null);
            this.polygon = null;
            this.polygonPaths = null;

            return true;
        }

        return false;
    }

}