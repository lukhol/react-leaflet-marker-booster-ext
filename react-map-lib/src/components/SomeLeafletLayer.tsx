import * as React from 'react';
import { MapLayer, withLeaflet } from 'react-leaflet';
import { LayerGroup as LeafletLayerGroup, circle, geoJSON, marker, circleMarker, divIcon, latLng } from 'leaflet';
import '../leaflet-marker-booster';

class SomeLeafletLayerBase extends MapLayer<any, any> {
    createLeafletElement(props: any){ 
        //const circleLayer = circle([51.505, -0.09], {radius: 500, color: 'black'});
        const geojson = {
            type: "FeatureCollection", 
            features: []
        } as any;

        const minLat = 51.47293659014834, maxLat = 51.53704658542498;
        const minLng = -0.16719818115234378, maxLng = -0.01270294189453125;

        for(let i = 0; i < 10_000 ; i++) {
            const lat = getRandomArbitrary(minLat, maxLat);
            const lng = getRandomArbitrary(minLng, maxLng);
            const coordinates = [lng, lat];
            const feature = {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates
                },
                properties: {}
            };

            geojson.features.push(feature);
        }

        // const feature = {
        //     type: 'Feature',
        //     geometry: {
        //         type: 'Point',
        //         coordinates: [-0.09, 51.514]
        //     },
        //     properties: {}
        // };
        // geojson.features.push(feature);

        const boostType = 'arrow';
        const boostScale = 1;
        const boostExp = 0.125;
        
        return new LeafletLayerGroup([geoJSON(geojson, {
            pointToLayer: (feature, latlng) => {
                return circleMarker(latlng, {
                    // @ts-ignore
                    boostType: boostType,
                    boostScale: boostScale,
                    boostExp: boostExp,

                    fillColor: '#00000000',
                    fillOpacity: 0,
                    stroke: true,
                    color: '#000',
                    weight: 1,
                    rotateRad: getRandomArbitrary(0, 3.14),
                    biDirection: getRandomArbitrary(0,10) > 5,
                    rotated: true
                });
            }
        })], super.getOptions(props));
    }
}

function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
}
class SomeLeafletLayer extends SomeLeafletLayerBase { 
    
}

export default withLeaflet(SomeLeafletLayer);