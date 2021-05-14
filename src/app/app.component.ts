import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppAction from './shared/state/app.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather';

  constructor(private store: Store) {
    this.loadMapsJSAPI().then(() => {
      this.store.dispatch(fromAppAction.googleMapsReady())
    });
  }

  private loadMapsJSAPI() {
    return new Promise((resolve, reject) => {
      const googleMapsAPIKey = 'AIzaSyDJm7RM6jHwuOM17qn-6d3XWqTPbiIa3oA';
      const googleMapsAPIURI = `https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}`;

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = googleMapsAPIURI;
      script.defer = true;
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;

      document.head.appendChild(script);

      const clusterScropt = document.createElement('script');
      clusterScropt.src = "https://unpkg.com/@google/markerclustererplus@4.0.1/dist/markerclustererplus.min.js";
      script.type = 'text/javascript';
      clusterScropt.async = true;
      clusterScropt.defer = true;

      document.head.appendChild(clusterScropt);
    })
  }
}
