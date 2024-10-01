import React from 'react';

function Pagination() {
    return (
        <div className="pagination d-flex justify-content-between">
            
            <nav>
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#">&#171; First</a></li>
                    <li className="page-item"><a className="page-link" href="#">&#8249; Previous</a></li>
                    <li className="page-item"><a className="page-link" href="#">Next &#8250;</a></li>
                    <li className="page-item"><a className="page-link" href="#">Last &#187;</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;
