import L, {latLng} from 'leaflet';

L.FastArrowMarker = L.CircleMarker.extend({
    options: {
        radius: 10,
        color: '#f00',
        boostScale: 1,
        boostExp: 0.125,
        rotateRad: 0,
        biDirection: false,
        rotated: false
	},
    initialize: function (latlng, options) {
		L.setOptions(this, options);
		this._latlng = latLng(latlng);
		this._radius = this.options.radius;
	},
});

L.fastArrowMarker = function(latlng, options) {
    return new L.FastArrowMarker(latlng, options);
};

// override Leaflet implementation for fast arrow rendering
(function () {
	'use strict';

	var proto = L.Canvas.prototype;
	var prev = proto._updateCircle;

	proto._updateCircle = function (layer) {
		if (!(layer instanceof L.FastArrowMarker))
			return prev.call(this, layer);

		if (!this._drawing || layer._empty()) {
			return;
		}

		var p = layer._point,
		    ctx = this._ctx,
		    r = Math.max(Math.round(layer._radius), 1),
		    s = (Math.max(Math.round(layer._radiusY), 1) || r) / r;
		
		var options = layer.options;

		var scale = Math.pow(2, this._map.getZoom()) * 256 / Math.PI / 6378137;
		scale = Math.pow(scale, options.boostExp) * options.boostScale;
		r = r * scale;

		if(options.stroke && options.weight !== 0) {
            r = r + options.weight * 0.5 * scale;
        }
        
        ctx.save();                
        const pointX = p.x;
        const pointY = p.y;

        const startFontSize = 20;
        const fontSize = startFontSize * scale;

        ctx.translate(pointX, pointY)
        ctx.rotate(options.rotateRad);
        ctx.translate(-pointX, -pointY);

        ctx.font = fontSize + "px Arial";
        ctx.fontWeight = "900"
        ctx.fillColor = options.color;
        let arrowTxt = options.biDirection ? "↕" : "↑";
        if(options.rotated) {
            arrowTxt = "↓";
        }
        ctx.fillText(arrowTxt, p.x-(fontSize/2) + 5*scale, p.y+(fontSize/4) - 1*scale);
    
        ctx.restore();

        ctx.beginPath();
        ctx.fillStyle = options.color;
        ctx.fill(options.fillRule || 'evenodd');
	};
})();