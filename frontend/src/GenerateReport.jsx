// src/GenerateReport.jsx
import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import Header from './components/Header';
import Navbar from './components/Navbar';
import InventoryTable from './components/GenInTable';

const GenerateReport = () => {
    const [inventoryData, setInventoryData] = useState([]);

    useEffect(() => {
        const fetchInventoryData = async () => {
            try {
                const response = await fetch('http://localhost:8070/Item'); // Adjust the endpoint as needed
                const data = await response.json();
                setInventoryData(data);
            } catch (error) {
                console.error('Error fetching inventory data:', error);
            }
        };

        fetchInventoryData();
    }, []);

    const handleGeneratePDF = () => {
        const doc = new jsPDF('l', 'pt', 'a4');
        doc.setFontSize(18);
        doc.setFillColor(178, 34, 34);
        doc.text('Inventory Report', 40, 40);
        doc.setFontSize(12);
    
        // Add some space after the title
        const startX = 40;
        const startY = 80; // Increased Y position to add space after the title
        const rowHeight = 20;
        const colWidth = 80; // Increased column width to prevent overwriting
    
        // Add column headers with two lines
        const headers = [
            ['Warehouse', 'Code'],
            ['Warehouse', 'Description'],
            ['', ''],
            ['Product', 'Code'],
            ['Product', 'Description'],
            ['Quantity', 'on Hand'],
            ['Quantity', 'Available'],
            ['Quantity', 'Allocated'],
            ['Cost'],
            ['Price']
        ];
    
        headers.forEach((header, index) => {
            header.forEach((line, lineIndex) => {
                doc.text(line, startX + index * colWidth, startY + lineIndex * 10);
            });
        });
    
        // Add inventory data
        inventoryData.forEach((item, rowIndex) => {
            const yPosition = startY + 30 + (rowIndex + 1) * rowHeight; // Added 30 to yPosition to account for header height
            doc.text(item.WarehouseCode, startX, yPosition);
            doc.text(item.WarehouseDescription || '', startX + colWidth, yPosition);
            doc.text(item.ProductCode, startX + 3 * colWidth, yPosition);
            doc.text(item.ProductDescription || '', startX + 4 * colWidth, yPosition);
            doc.text(item.QuantityonHand?.toString() || '0', startX + 5 * colWidth, yPosition);
            doc.text(item.QuantityAvailable?.toString() || '0', startX + 6 * colWidth, yPosition);
            doc.text(item.QuantityAllocated?.toString() || '0', startX + 7 * colWidth, yPosition);
            doc.text(item.Cost?.toFixed(2) || '0.00', startX + 8 * colWidth, yPosition);
            doc.text(item.Price?.toFixed(2) || '0.00', startX + 9 * colWidth, yPosition);
        });
    
        doc.save('inventory-report.pdf');
    };
  

    return (
        <div>
            <Header/>
            <Navbar/>
            <InventoryTable/>
            <button className='repGen' onClick={handleGeneratePDF}>Generate PDF Report</button>
        </div>
    );
};

export default GenerateReport;
