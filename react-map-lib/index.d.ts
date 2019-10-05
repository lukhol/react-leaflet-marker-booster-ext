import React from 'react';
import { MapLayer } from 'react-leaflet';

declare class TestComponent extends React.Component {}
declare class MarkerBoosterLayer extends MapLayer<any, any> {}
declare class MarkerCanvasLayer extends MapLayer<any, any> {}

declare module "react-map-lib";