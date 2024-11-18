import React, { useRef } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';

const FlightMap = ({
    startPoint,
    endPoint,
    startLabel,
    endLabel,
    startColor,
    endColor,
    arcColor = 'black',
    arcWidth = 2,
    arcDashArray = '5,5',
    zoom,
    travelIcon, // New: Travel icon JSX component
    travelIconColor = 'orange', // New: Color for travel icon
    travelIconSize = 16, // New: Size for travel icon
    travelIconRotation = 0, // New: Rotation angle for travel icon
}) => {
    const svgRef = useRef(null);

    const calculateArcPath = (projection, start, end) => {
        const toRadians = (degrees) => (degrees * Math.PI) / 180;

        const latLngToCartesian = (lat, lng) => {
            const phi = toRadians(lat);
            const theta = toRadians(lng);
            return [
                Math.cos(phi) * Math.cos(theta), // x
                Math.cos(phi) * Math.sin(theta), // y
                Math.sin(phi), // z
            ];
        };

        const startCartesian = latLngToCartesian(start.lat, start.lng);
        const endCartesian = latLngToCartesian(end.lat, end.lng);

        const controlPoint1 = [
            (startCartesian[0] + endCartesian[0]) / 2,
            (startCartesian[1] + endCartesian[1]) / 2,
            (startCartesian[2] + endCartesian[2]) / 2 + 0.5,
        ];

        const magnitude = Math.sqrt(
            controlPoint1[0] ** 2 + controlPoint1[1] ** 2 + controlPoint1[2] ** 2
        );
        const normalizedControlPoint = controlPoint1.map((coord) => coord / magnitude);

        const projectCartesianToGeo = ([x, y, z]) => {
            const lng = Math.atan2(y, x) * (180 / Math.PI);
            const lat = Math.asin(z) * (180 / Math.PI);
            return [lng, lat];
        };

        const controlGeo1 = projectCartesianToGeo(normalizedControlPoint);

        const start2D = projection([start.lng, start.lat]);
        const end2D = projection([end.lng, end.lat]);
        const control2D1 = projection(controlGeo1);

        return `M ${start2D[0]},${start2D[1]} Q ${control2D1[0]},${control2D1[1]} ${end2D[0]},${end2D[1]}`;
    };

    const exportToSVG = () => {
        const svgElement = svgRef.current;
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svgElement);

        const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'map.svg';
        link.click();

        URL.revokeObjectURL(url);
    };

    return (
        <div>
            <ComposableMap ref={svgRef} projection="geoMercator" style={{ touchAction: 'none' }}>
                <ZoomableGroup zoom={zoom}>
                    <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
                        {({ geographies, projection }) => (
                            <>
                                {geographies.map((geo) => (
                                    <Geography key={geo.rsmKey} geography={geo} fill="#DDD" stroke="#FFF" />
                                ))}

                                {(() => {
                                    const arcPath = calculateArcPath(projection, startPoint, endPoint);
                                    const start2D = projection([startPoint.lng, startPoint.lat]);
                                    const end2D = projection([endPoint.lng, endPoint.lat]);

                                    // Calculate midpoint of arc
                                    if (!start2D || !end2D) return null;
                                    const midX = (start2D[0] + end2D[0]) / 2;
                                    const midY = (start2D[1] + end2D[1]) / 2 - 20; // Adjust for curve height

                                    return (
                                        <>
                                            <path
                                                d={arcPath}
                                                fill="none"
                                                stroke={arcColor}
                                                strokeWidth={arcWidth}
                                                strokeLinecap="round"
                                                strokeDasharray={arcDashArray}
                                            />
                                            {/* Travel Icon */}
                                            {travelIcon && (
                                                <g
                                                    transform={`translate(${midX}, ${midY}) rotate(${travelIconRotation})`}
                                                >
                                                    {React.cloneElement(travelIcon, {
                                                        size: travelIconSize,
                                                        color: travelIconColor,
                                                    })}
                                                </g>
                                            )}
                                        </>
                                    );
                                })()}
                            </>
                        )}
                    </Geographies>

                    <Marker coordinates={[startPoint.lng, startPoint.lat]}>
                        <circle r={5} fill={startColor} />
                        <text x={10} alignmentBaseline="middle" style={{ fontSize: '12px' }}>
                            {startLabel}
                        </text>
                    </Marker>

                    <Marker coordinates={[endPoint.lng, endPoint.lat]}>
                        <circle r={5} fill={endColor} />
                        <text x={10} alignmentBaseline="middle" style={{ fontSize: '12px' }}>
                            {endLabel}
                        </text>
                    </Marker>
                </ZoomableGroup>
            </ComposableMap>

            <button onClick={exportToSVG} style={{ marginTop: '10px' }}>
                Export to SVG
            </button>
        </div>
    );
};

export default FlightMap;
