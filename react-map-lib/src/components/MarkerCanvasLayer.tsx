import * as React from 'react';
import { MapLayer, withLeaflet } from 'react-leaflet';
import L, { LayerGroup as LeafletLayerGroup, icon, circle, geoJSON, marker, circleMarker, divIcon, latLng, LatLng } from 'leaflet';
import '../leaflet-marker-booster';
import BaseLayer from './BaseLayer';

// @ts-ignore
import layerFactory from "../leaflet-canvas-marker";
layerFactory(L);

function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

var myIcon = icon({
    iconUrl: 'img/arrow2.png',
    iconSize: [20, 18],
    iconAnchor: [10, 9],
});

class MarkerCanvasLayer extends BaseLayer { 
    createLeafletElement(props: any){ 
        const minLat = 51.47293659014834, maxLat = 51.53704658542498;
        const minLng = -0.16719818115234378, maxLng = -0.01270294189453125;

        const markers: any[] = [];
        for(let i = 0; i < 10_000 ; i++) {
            const lat = getRandomArbitrary(minLat, maxLat);
            const lng = getRandomArbitrary(minLng, maxLng);
            const coordinates = [lng, lat];
            
            const mrk = marker(new LatLng(coordinates[1], coordinates[0]), {
                icon: myIcon
            });
            markers.push(mrk);
        }

        //@ts-ignore
        var ciLayer = L.canvasIconLayer({});
        setTimeout(() => {
            ciLayer.addLayers(markers);
        }, 0);

        return new LeafletLayerGroup([ciLayer], this.getOptions({}));
    }
}

export default withLeaflet(MarkerCanvasLayer);