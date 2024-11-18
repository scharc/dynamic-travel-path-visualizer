import React, { useState, useRef } from 'react';
import EXIF from 'exif-js';
import Sidebar from './components/Sidebar';
import FlightMap from './components/FlightMap';

function App() {
  const [originLat, setOriginLat] = useState(49.0078593);
  const [originLng, setOriginLng] = useState(8.4010293);
  const [destinationLat, setDestinationLat] = useState(40.6973709);
  const [destinationLng, setDestinationLng] = useState(-74.144487);
  const [originLabel, setOriginLabel] = useState('Karlsruhe');
  const [destinationLabel, setDestinationLabel] = useState('New York');
  const [originColor, setOriginColor] = useState('#0000ff');
  const [destinationColor, setDestinationColor] = useState('#ff0000');
  const [arcColor, setArcColor] = useState('#00ff00');
  const [arcWidth, setArcWidth] = useState(2);
  const [arcDashArray, setArcDashArray] = useState(5);
  const [curveHeight, setCurveHeight] = useState(0.5);

  // Icon states
  const [originIconSize, setOriginIconSize] = useState(10);
  const [destinationIconSize, setDestinationIconSize] = useState(10);
  const [travelModeIcon, setTravelModeIcon] = useState('FaPlane');
  const [travelIconColor, setTravelIconColor] = useState('#ff6600');
  const [travelIconSize, setTravelIconSize] = useState(10);
  const [originIcon, setOriginIcon] = useState('FaMapMarkerAlt');
  const [destinationIcon, setDestinationIcon] = useState('FaFlagCheckered');
  const [travelIconRotation, setTravelIconRotation] = useState(0);
  
  // Label states
  const [labelSize, setLabelSize] = useState(12);
  const [labelPosition, setLabelPosition] = useState('top');

  const svgRef = useRef(null); // Ref to access the SVG element

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        EXIF.getData(file, function () {
          const lat = EXIF.getTag(this, 'GPSLatitude');
          const lng = EXIF.getTag(this, 'GPSLongitude');
          const latRef = EXIF.getTag(this, 'GPSLatitudeRef');
          const lngRef = EXIF.getTag(this, 'GPSLongitudeRef');

          if (lat && lng) {
            const decimalLat =
              (lat[0] + lat[1] / 60 + lat[2] / 3600) * (latRef === 'S' ? -1 : 1);
            const decimalLng =
              (lng[0] + lng[1] / 60 + lng[2] / 3600) * (lngRef === 'W' ? -1 : 1);

            setDestinationLat(decimalLat);
            setDestinationLng(decimalLng);
          } else {
            alert('No GPS data found in the image.');
          }
        });
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleExport = () => {
    const svgElement = svgRef.current.querySelector('svg');;
    if (!svgElement) {
      alert('SVG element not found.');
      return;
    }

    // the svg is the first child of the div
    // so we can just download the innerHTML
    // and save it as an svg file


    

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);

    const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;

    // Generate file name

    // add origin
    let fileName = Array
      .from(originLabel)
      .filter((c) => c.match(/[a-zA-Z0-9]/))
      .join('');
    fileName += '-';

    // add destination
    fileName += Array
      .from(destinationLabel)
      .filter((c) => c.match(/[a-zA-Z0-9]/))
      .join('');

    // add travel mode
    fileName += '-by-';
    fileName += travelModeIcon.replace('Fa', '');

    link.download = `${fileName}.svg`;


    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar
        originLat={originLat}
        setOriginLat={setOriginLat}
        originLng={originLng}
        setOriginLng={setOriginLng}
        originLabel={originLabel}
        setOriginLabel={setOriginLabel}
        originColor={originColor}
        setOriginColor={setOriginColor}
        destinationLat={destinationLat}
        setDestinationLat={setDestinationLat}
        destinationLng={destinationLng}
        setDestinationLng={setDestinationLng}
        destinationLabel={destinationLabel}
        setDestinationLabel={setDestinationLabel}
        destinationColor={destinationColor}
        setDestinationColor={setDestinationColor}
        arcColor={arcColor}
        setArcColor={setArcColor}
        arcWidth={arcWidth}
        setArcWidth={setArcWidth}
        arcDashArray={arcDashArray}
        setArcDashArray={setArcDashArray}
        curveHeight={curveHeight}
        setCurveHeight={setCurveHeight}
        handleImageUpload={handleImageUpload}
        handleExport={handleExport}
        originIconSize={originIconSize}
        setOriginIconSize={setOriginIconSize}
        destinationIconSize={destinationIconSize}
        setDestinationIconSize={setDestinationIconSize}
        travelModeIcon={travelModeIcon}
        setTravelModeIcon={setTravelModeIcon}
        travelIconColor={travelIconColor}
        setTravelIconColor={setTravelIconColor}
        travelIconSize={travelIconSize}
        setTravelIconSize={setTravelIconSize}
        travelIconRotation={travelIconRotation}
        setTravelIconRotation={setTravelIconRotation}
        originIcon={originIcon}
        setOriginIcon={setOriginIcon}
        destinationIcon={destinationIcon}
        setDestinationIcon={setDestinationIcon}
        labelSize={labelSize}
        setLabelSize={setLabelSize}
        labelPosition={labelPosition}
        setLabelPosition={setLabelPosition}
      />
      <div style={{ flex: 1 }}>
        <FlightMap
          ref={svgRef}
          startPoint={{ lat: originLat, lng: originLng }}
          endPoint={{ lat: destinationLat, lng: destinationLng }}
          arcColor={arcColor}
          arcWidth={arcWidth}
          arcDashArray={`${arcDashArray},${arcDashArray}`}
          curveHeight={curveHeight}
          originIconSize={originIconSize}
          destinationIconSize={destinationIconSize}
          travelModeIcon={travelModeIcon}
          travelIconColor={travelIconColor}
          travelIconSize={travelIconSize}
          originColor={originColor}
          destinationColor={destinationColor}
          originIcon={originIcon}
          destinationIcon={destinationIcon}
          travelIconRotation={travelIconRotation}
          originLabel={originLabel}
          destinationLabel={destinationLabel}
          labelSize={labelSize}
          labelPosition={labelPosition}
        />
      </div>
    </div>
  );
}

export default App;
