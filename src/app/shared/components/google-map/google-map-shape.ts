import { CustomDraw, GoogleMapHelper } from './google-map-helper';

export abstract class GoogleMapShape {

    marker: google.maps.Marker;

    protected listener: google.maps.MapsEventListener;

    public abstract init(map: google.maps.Map): boolean;
    public abstract create(map: google.maps.Map, paths: google.maps.LatLng[]);
    public abstract draw(map: google.maps.Map, newPosition: google.maps.LatLng);
    public abstract save(map: google.maps.Map): CustomDraw | boolean;
    public abstract cancel();
    public abstract delete(map: google.maps.Map): boolean;

    public load(map: google.maps.Map, draw: CustomDraw) {
        if (draw.marker) {
            GoogleMapHelper.addPosition(map, draw.marker);
        }
    }

}