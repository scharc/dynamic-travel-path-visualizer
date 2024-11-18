import React from 'react';
import {
    FaMapMarkerAlt,
    FaFlagCheckered,
    FaPlane,
    FaCar,
    FaBicycle,
    FaTrain,
    FaHorse,
    FaHome,
    FaBuilding,
    FaTree,
    FaMountain,
    FaUmbrellaBeach,
} from 'react-icons/fa';



const availableIcons = {
    FaMapMarkerAlt: <FaMapMarkerAlt />,
    FaFlagCheckered: <FaFlagCheckered />,
    FaHome: <FaHome />,
    FaBuilding: <FaBuilding />,
    FaTree: <FaTree />,
    FaMountain: <FaMountain />,
    FaUmbrellaBeach: <FaUmbrellaBeach />,
};

const availableTravelModes = {
    FaPlane: <FaPlane />,
    FaCar: <FaCar />,
    FaTrain: <FaTrain />,
    FaBicycle : <FaBicycle />,
    FaHorse: <FaHorse />,
};



const Sidebar = ({
    originLat,
    setOriginLat,
    originLng,
    setOriginLng,
    originLabel,
    setOriginLabel,
    originColor,
    setOriginColor,
    destinationLat,
    setDestinationLat,
    destinationLng,
    setDestinationLng,
    destinationLabel,
    setDestinationLabel,
    destinationColor,
    setDestinationColor,
    arcColor,
    setArcColor,
    arcWidth,
    setArcWidth,
    arcDashArray,
    setArcDashArray,
    originIconSize,
    setOriginIconSize,
    destinationIconSize,
    setDestinationIconSize,
    travelModeIcon,
    setTravelModeIcon,
    travelIconColor,
    setTravelIconColor,
    travelIconSize,
    setTravelIconSize,
    originIcon,
    setOriginIcon,
    destinationIcon,
    setDestinationIcon,
    labelSize,
    setLabelSize,
    labelPosition,
    setLabelPosition,
    curveHeight,
    setCurveHeight,
    handleImageUpload,
    handleExport,
}) => {
    return (
        <div className="w-72 p-2 bg-gray-100 border-r border-gray-300 overflow-y-auto">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Map Controls</h2>

            {/* Origin Point */}
            <div className="mb-4">
                <h3 className="text-md font-semibold text-gray-700 mb-1">Origin Point</h3>
                <div className="grid grid-cols-2 gap-2">
                    <label>
                        <span className="text-xs text-gray-600">Lat</span>
                        <input
                            type="number"
                            value={originLat}
                            onChange={(e) => setOriginLat(parseFloat(e.target.value))}
                            className="w-full px-2 py-1 border rounded text-sm"
                        />
                    </label>
                    <label>
                        <span className="text-xs text-gray-600">Lon</span>
                        <input
                            type="number"
                            value={originLng}
                            onChange={(e) => setOriginLng(parseFloat(e.target.value))}
                            className="w-full px-2 py-1 border rounded text-sm"
                        />
                    </label>
                    <label>
                        <span className="text-xs text-gray-600">Label</span>
                        <input
                            type="text"
                            value={originLabel}
                            onChange={(e) => setOriginLabel(e.target.value)}
                            className="w-full px-2 py-1 border rounded text-sm"
                        />
                    </label>
                    <label>
                        <span className="text-xs text-gray-600">Color</span>
                        <input
                            type="color"
                            value={originColor}
                            onChange={(e) => setOriginColor(e.target.value)}
                            className="w-full px-2 py-1 border rounded"
                        />
                    </label>
                    <label>
                        <span className="text-xs text-gray-600">Icon</span>
                        <select
                            value={originIcon}
                            onChange={(e) => setOriginIcon(e.target.value)}
                            className="w-full px-2 py-1 border rounded text-sm"
                        >
                            {Object.keys(availableIcons).map((key) => (
                                <option key={key} value={key}>
                                    {key.replace('Fa', '')} {/* Display without 'Fa' */}
                                </option>
                            ))}
                        </select>

                    </label>
                    <label>
                        <span className="text-xs text-gray-600">Icon Size ({originIconSize})</span>
                        <input
                            type="range"
                            min="2"
                            max="20"
                            value={originIconSize}
                            onChange={(e) => setOriginIconSize(parseInt(e.target.value, 10))}
                            className="w-full"
                        />
                    </label>
                </div>
            </div>

            {/* Destination Point */}
            <div className="mb-4">
                <h3 className="text-md font-semibold text-gray-700 mb-1">Destination Point</h3>
                <div className="grid grid-cols-2 gap-2">
                    <label>
                        <span className="text-xs text-gray-600">Lat</span>
                        <input
                            type="number"
                            value={destinationLat}
                            onChange={(e) => setDestinationLat(parseFloat(e.target.value))}
                            className="w-full px-2 py-1 border rounded text-sm"
                        />
                    </label>
                    <label>
                        <span className="text-xs text-gray-600">Lon</span>
                        <input
                            type="number"
                            value={destinationLng}
                            onChange={(e) => setDestinationLng(parseFloat(e.target.value))}
                            className="w-full px-2 py-1 border rounded text-sm"
                        />
                    </label>
                    <label>
                        <span className="text-xs text-gray-600">Label</span>
                        <input
                            type="text"
                            value={destinationLabel}
                            onChange={(e) => setDestinationLabel(e.target.value)}
                            className="w-full px-2 py-1 border rounded text-sm"
                        />
                    </label>
                    <label>
                        <span className="text-xs text-gray-600">Color</span>
                        <input
                            type="color"
                            value={destinationColor}
                            onChange={(e) => setDestinationColor(e.target.value)}
                            className="w-full px-2 py-1 border rounded"
                        />
                    </label>
                    <label>
                        <span className="text-xs text-gray-600">Icon</span>
                        <select
                            value={destinationIcon}
                            onChange={(e) => setDestinationIcon(e.target.value)} // Use setDestinationIcon here
                            className="w-full px-2 py-1 border rounded text-sm"
                        >
                            {Object.keys(availableIcons).map((key) => (
                                <option key={key} value={key}>
                                    {key.replace('Fa', '')} {/* Display without 'Fa' */}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <span className="text-xs text-gray-600">Icon Size ({destinationIconSize})</span>
                        <input
                            type="range"
                            min="2"
                            max="20"
                            value={destinationIconSize}
                            onChange={(e) => setDestinationIconSize(parseInt(e.target.value, 10))}
                            className="w-full"
                        />
                    </label>
                </div>
            </div>

            {/* Travel Mode */}
            <div className="mb-4">
                <h3 className="text-md font-semibold text-gray-700 mb-1">Travel Mode</h3>
                <div className="flex items-center gap-2">
                    {/* Icon Dropdown */}
                    <select
                        value={travelModeIcon}
                        onChange={(e) => setTravelModeIcon(e.target.value)}
                        className="w-24 px-2 py-1 border rounded text-sm"
                    >
                        <option value="">No Icon</option>
                        {Object.keys(availableTravelModes).map((key) => (
                            <option key={key} value={key}>
                                {key.replace('Fa', '')}
                            </option>
                        ))}
                    </select>

                    {/* Color Picker */}
                    <label className="flex items-center">
                        <input
                            type="color"
                            value={travelIconColor}
                            onChange={(e) => setTravelIconColor(e.target.value)}
                            className="w-10 h-10 border rounded"
                        />
                    </label>

                    {/* Icon Size Slider */}
                    <label className="flex items-center">
                        <span className="text-xs text-gray-600">Size ({travelIconSize})</span>
                        <input
                            type="range"
                            min="2"
                            max="20"
                            value={travelIconSize}
                            onChange={(e) => setTravelIconSize(parseInt(e.target.value, 10))}
                            className="ml-2 w-full"
                        />
                    </label>
                </div>
            </div>

            {/* Arc Styling */}
            <div className="mb-4">
                <h3 className="text-md font-semibold text-gray-700 mb-1">Arc Styling</h3>
                <div className="grid grid-cols-2 gap-2">
                    <label>
                        <span className="text-xs text-gray-600">Curve Height ({curveHeight})</span>
                        <input
                            type="range"
                            min="0"
                            max="2"
                            step="0.1"
                            value={curveHeight}
                            onChange={(e) => setCurveHeight(parseFloat(e.target.value))}
                            className="w-full"
                        />
                    </label>
                    <label>
                        <span className="text-xs text-gray-600">Arc Width ({arcWidth})</span>
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={arcWidth}
                            onChange={(e) => setArcWidth(parseFloat(e.target.value))}
                            className="w-full"
                        />
                    </label>
                    <label>
                        <span className="text-xs text-gray-600">Dash Array ({arcDashArray})</span>
                        <input
                            type="range"
                            min="1"
                            max="20"
                            value={arcDashArray}
                            onChange={(e) => setArcDashArray(parseInt(e.target.value, 10))}
                            className="w-full"
                        />
                    </label>
                    <label>
                        <span className="text-xs text-gray-600">Arc Color</span>
                        <input
                            type="color"
                            value={arcColor}
                            onChange={(e) => setArcColor(e.target.value)}
                            className="w-full px-2 py-1 border rounded"
                        />
                    </label>
                </div>
            </div>

            {/* Label Options */}
            <div className="mb-4">
                <h3 className="text-md font-semibold text-gray-700 mb-1">Label Options</h3>
                <label>
                    <span className="text-xs text-gray-600">Font Size ({labelSize})</span>
                    <input
                        type="range"
                        min="2"
                        max="20"
                        value={labelSize}
                        onChange={(e) => setLabelSize(parseInt(e.target.value, 10))}
                        className="w-full"
                    />
                </label>
                <label>
                    <span className="text-xs text-gray-600">Position</span>
                    <select
                        value={labelPosition}
                        onChange={(e) => setLabelPosition(e.target.value)}
                        className="w-full px-2 py-1 border rounded text-sm"
                    >
                        <option value="top">Top</option>
                        <option value="right">Right</option>
                        <option value="bottom">Bottom</option>
                    </select>
                </label>
            </div>

            {/* Image Upload */}
            <div className="mb-4">
                <h3 className="text-md font-semibold text-gray-700 mb-1">Image Upload</h3>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full text-xs text-gray-600"
                />
            </div>

            {/* Export Button */}
            <div className="mt-4">
                <button
                    onClick={handleExport}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                    Export Map
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
