// routes/returnRouter.js
import express from 'express';
import { Return } from '../models/returnModel.js'; // Import the Return model

const router = express.Router();

// Route for getting all Return records (with search functionality)
router.get('/', async (req, res) => {
    try {
        const {
            returnNo,
            returnDateFrom,
            returnDateTo,
            customerCode,
            routeCode,
            status,
        } = req.query;

        // Build the search criteria
        const searchCriteria = {};

        if (returnNo) {
            searchCriteria.returnNo = { $regex: returnNo, $options: 'i' }; // Case insensitive
        }
        if (returnDateFrom || returnDateTo) {
            searchCriteria.returnDate = {};
            if (returnDateFrom) {
                searchCriteria.returnDate.$gte = new Date(returnDateFrom);
            }
            if (returnDateTo) {
                searchCriteria.returnDate.$lte = new Date(returnDateTo);
            }
        }
        if (customerCode) {
            searchCriteria.customerCode = { $regex: customerCode, $options: 'i' };
        }
        if (routeCode) {
            searchCriteria.routeCode = { $regex: routeCode, $options: 'i' };
        }
        if (status) {
            searchCriteria.status = status; // Exact match
        }

        console.log("Search Criteria:", searchCriteria); // Log the search criteria
        const returns = await Return.find(searchCriteria);
        res.status(200).json({ data: returns });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route for getting a return record by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const returnRecord = await Return.findById(id);

        if (!returnRecord) {
            return response.status(404).send({ message: 'Return record not found' });
        }

        return response.status(200).json(returnRecord);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for creating a new return record
router.post('/', async (req, res) => {
    try {
        const { returnNo, returnDate, customerCode, routeCode, totalNetAmount, status } = req.body;

        // Validate required fields
        if (!returnNo || !returnDate || !customerCode || !totalNetAmount || !status) {
            return res.status(400).send({
                message: 'Send all required fields: returnNo, returnDate, customerCode, routeCode, totalNetAmount, status',
            });
        }

        if (totalNetAmount < 0) {
            return res.status(400).send({
                message: 'TotalNetAmount cannot be negative',
            });
        }

        // Create a new return record
        const newReturn = new Return({
            returnNo,
            returnDate,
            customerCode,
            routeCode,
            totalNetAmount,
            status,
        });

        const savedReturn = await newReturn.save(); // Save the record in the database
        res.status(201).json(savedReturn); // Respond with the created record
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route for updating a return record
router.put('/:id', async (request, response) => {
    try {
        const { returnNo, returnDate, customerCode, totalNetAmount, status } = request.body;

        if (!returnNo || !returnDate || !customerCode || !totalNetAmount || !status) {
            return response.status(400).send({
                message: 'Send all required fields: returnNo, returnDate, customerCode, totalNetAmount, status',
            });
        }

        const { id } = request.params;
        const updatedRecord = await Return.findByIdAndUpdate(id, request.body, { new: true });

        if (!updatedRecord) {
            return response.status(404).json({ message: 'Return record not found' });
        }

        return response.status(200).send(updatedRecord);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for deleting a return record
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Return.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Return record not found' });
        }

        return response.status(200).send({ message: 'Return record deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;
