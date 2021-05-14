import { createAction } from '@ngrx/store';

export const googleMapsReady = createAction('[APP Component] Google Maps Ready');
export const googleMapsNotReady = createAction('[APP Component] Google Maps NOT Ready');