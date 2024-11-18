import React, { forwardRef } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import {
    FaPlane,
    FaCar,
    FaTrain,
    FaHorse,
    FaMapMarkerAlt,
    FaFlagCheckered,
    FaHome,
    FaBuilding,
    FaTree,
    FaMountain,
    FaUmbrellaBeach,
    FaBicycle,
} from 'react-icons/fa';


// Icons definition
const availableIcons = {
    FaPlane: <FaPlane />,
    FaCar: <FaCar />,
    FaTrain: <FaTrain />,
    FaBicycle: <FaBicycle />,
    FaHorse: <FaHorse />,
    FaMapMarkerAlt: <FaMapMarkerAlt />,
    FaFlagCheckered: <FaFlagCheckered />,
    FaHome: <FaHome />,
    FaBuilding: <FaBuilding />,
    FaTree: <FaTree />,
    FaMountain: <FaMountain />,
    FaUmbrellaBeach: <FaUmbrellaBeach />,
};

const FlightMap = forwardRef(
    (
        {
            startPoint,
            endPoint,
            arcColor,
            arcWidth,
            arcDashArray,
            curveHeight,
            originIconSize,
            destinationIconSize,
            travelModeIcon,
            travelIconColor,
            travelIconSize,
            originColor,
            destinationColor,
            originIcon = 'FaMapMarkerAlt',
            destinationIcon = 'FaFlagCheckered',
            originLabel,
            destinationLabel,
            labelSize,
            labelPosition,
        },
        ref
    ) => {
        const calculateArcPath = (projection, start, end) => {
            const start2D = projection([start.lng, start.lat]);
            const end2D = projection([end.lng, end.lat]);
            if (!start2D || !end2D) return '';
            const midX = (start2D[0] + end2D[0]) / 2;
            const midY = (start2D[1] + end2D[1]) / 2 - curveHeight * 100;
            return `M ${start2D[0]},${start2D[1]} Q ${midX},${midY} ${end2D[0]},${end2D[1]}`;
        };

        const getLabelXOffset = (position, iconSize, labelSize) => {
            switch (position) {
                case 'right':
                    return iconSize
                case 'left':
                    return -(iconSize * 1.2); // Place label to the left of the icon
                default:
                    return 0; // Center for top or bottom
            }
        };

        const getLabelYOffset = (position, iconSize, labelSize) => {
            switch (position) {
                case 'top':
                    return -(iconSize * 1.2 + labelSize * 0.1); // Place label above the icon
                case 'bottom':
                    return iconSize * 1.2 + labelSize * 0.6; // Place label below the icon
                default:
                    return labelSize * 0.3; // Slight vertical adjustment for left/right
            }
        };


        return (
            <div ref={ref} style={{ width: '100%', height: '100%' }}>
                <ComposableMap projection="geoMercator" style={{ width: '100%', height: '100%' }}>
                    <ZoomableGroup>
                        <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
                            {({ geographies, projection }) => (
                                <>
                                    {geographies.map((geo) => (
                                        <Geography key={geo.rsmKey} geography={geo} fill="#DDD" stroke="#FFF" />
                                    ))}
                                    <path
                                        d={calculateArcPath(projection, startPoint, endPoint)}
                                        fill="none"
                                        stroke={arcColor}
                                        strokeWidth={arcWidth}
                                        strokeDasharray={arcDashArray}
                                    />
                                    {/* Travel Icon */}
                                    {(() => {
                                        const start2D = projection([startPoint.lng, startPoint.lat]);
                                        const end2D = projection([endPoint.lng, endPoint.lat]);
                                        if (!start2D || !end2D || !travelModeIcon) return null;

                                        const iconX = (start2D[0] + end2D[0]) / 2;
                                        const iconY = (start2D[1] + end2D[1]) / 2 - curveHeight * 50;

                                        return (
                                            <g transform={`translate(${iconX}, ${iconY})`}>
                                                <circle
                                                    r={travelIconSize * 0.8}
                                                    fill={travelIconColor}

                                                />
                                                {availableIcons[travelModeIcon] &&
                                                    React.cloneElement(availableIcons[travelModeIcon], {
                                                        size: travelIconSize,
                                                        color: 'white',
                                                        style: { transform: `translate(-${travelIconSize / 2}px, -${travelIconSize / 2}px)` },
                                                    })}
                                            </g>
                                        );
                                    })()}
                                </>
                            )}
                        </Geographies>

                        {/* Origin Marker */}
                        <Marker coordinates={[startPoint.lng, startPoint.lat]}>
                            <g>
                                {/* Draw Circle */}
                                <circle
                                    r={originIconSize * 0.8}
                                    fill={originColor}
                                    
                                />
                                {/* Draw Icon */}
                                {availableIcons[originIcon] &&
                                    React.cloneElement(availableIcons[originIcon], {
                                        size: originIconSize,
                                        color: 'white',
                                        style: { transform: `translate(-${originIconSize / 2}px, -${originIconSize / 2}px)` },
                                    })}
                                {/* Draw Label */}
                                <text
                                    x={getLabelXOffset(labelPosition, originIconSize)}
                                    y={getLabelYOffset(labelPosition, originIconSize, labelSize)}
                                    textAnchor={labelPosition === 'right' ? 'start' : labelPosition === 'left' ? 'end' : 'middle'}
                                    alignmentBaseline={labelPosition === 'top' || labelPosition === 'bottom' ? 'central' : 'middle'}
                                    fontSize={labelSize}
                                    fill="black"
                                >
                                    {originLabel}
                                </text>
                            </g>
                        </Marker>


                        {/* Destination Marker */}
                        <Marker coordinates={[endPoint.lng, endPoint.lat]}>
                            <g>
                                <circle
                                    r={destinationIconSize * 0.8}
                                    fill={destinationColor}

                                />
                                {availableIcons[destinationIcon] &&
                                    React.cloneElement(availableIcons[destinationIcon], {
                                        size: destinationIconSize,
                                        color: 'white',
                                        style: { transform: `translate(-${destinationIconSize / 2}px, -${destinationIconSize / 2}px)` },
                                    })}
                                <text
                                    x={getLabelXOffset(labelPosition, destinationIconSize, labelSize)}
                                    y={getLabelYOffset(labelPosition, destinationIconSize, labelSize)}
                                    textAnchor={labelPosition === 'right' ? 'start' : labelPosition === 'left' ? 'end' : 'middle'}
                                    alignmentBaseline={labelPosition === 'top' || labelPosition === 'bottom' ? 'central' : 'middle'}
                                    fontSize={labelSize}
                                    fill="black"
                                
                                >
                                    {destinationLabel}
                                </text>
                            </g>
                        </Marker>
                    </ZoomableGroup>
                </ComposableMap>
            </div>
        );
    }
);

export default FlightMap;
