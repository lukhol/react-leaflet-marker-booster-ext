import * as React from 'react';
import { MapLayer, withLeaflet } from 'react-leaflet';
import { LayerGroup as LeafletLayerGroup, circle, geoJSON, marker, circleMarker, divIcon, latLng } from 'leaflet';
import '../leaflet-marker-booster';

function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

class BaseLayer extends MapLayer<any, any> {
    createLeafletElement(props: any){ 
        return new LeafletLayerGroup([], super.getOptions(props));
    }
}

export default BaseLayer;