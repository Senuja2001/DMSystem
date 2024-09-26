import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Ensure this package is installed

const Generate = ({ returns }) => {
    const generatePDF = () => {
        const doc = new jsPDF();
        
        // Adding a title
        doc.setFontSize(20);
        doc.text("Returns Report", 20, 20);

        // Adding headers
        const headers = ["Return No", "Return Date", "Customer Code", "Route Code", "Total Net Amount", "Status"];
        doc.setFontSize(12);
        doc.autoTable({
            head: [headers],
            body: returns.map(returnItem => [
                returnItem.returnNo,
                returnItem.returnDate,
                returnItem.customerCode,
                returnItem.routeCode,
                returnItem.totalNetAmount,
                returnItem.status
            ]),
            startY: 30,
        });

        // Save the PDF
        doc.save("returns_report.pdf");
    };

    return (
        <button className='p-2 bg-[#00BFFF] text-white' onClick={generatePDF}>
            Print
        </button>
    );
};

export default Generate;
