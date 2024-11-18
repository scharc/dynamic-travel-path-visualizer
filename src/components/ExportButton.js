import React from 'react';

const ExportButton = ({ exportToSVG }) => (
    <div style={styles.inputGroup}>
        <h3>Export</h3>
        <button onClick={exportToSVG} style={styles.exportButton}>
            Export to SVG
        </button>
    </div>
);

const styles = {
    inputGroup: {
        marginBottom: '20px',
    },
    exportButton: {
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: '#FFF',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default ExportButton;
