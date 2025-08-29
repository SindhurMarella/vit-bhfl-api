// app.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define the POST route at /bfhl
app.post('/bfhl', (req, res) => {
    try {
        // Ensure the request body is valid and contains a 'data' array
        if (!req.body || !Array.isArray(req.body.data)) {
            // Return a 400 Bad Request error if the input is malformed
            return res.status(400).json({
                is_success: false,
                user_id: "john_doe_17091999",
                message: "Invalid request. 'data' array is missing or malformed."
            });
        }

        const inputData = req.body.data;

        // Initialize all the arrays and variables for the response
        const oddNumbers = [];
        const evenNumbers = [];
        const alphabets = [];
        const specialCharacters = [];
        let sumOfNumbers = 0;
        let alphabeticCharsForConcat = [];

        // Iterate through each item in the input array
        for (const item of inputData) {
            // Use a regular expression to check if the item is a string of digits
            if (/^\d+$/.test(item)) {
                const num = parseInt(item, 10);
                sumOfNumbers += num;
                if (num % 2 === 0) {
                    evenNumbers.push(item);
                } else {
                    oddNumbers.push(item);
                }
            } else if (/^[a-zA-Z]+$/.test(item)) { // Check for a string of only letters
                alphabets.push(item.toUpperCase());
                // Append each character to the temporary array for concatenation
                alphabeticCharsForConcat = alphabeticCharsForConcat.concat(item.split(''));
            } else { // All other cases are considered special characters
                specialCharacters.push(item);
            }
        }

        // Reverse the array of characters for the final string
        alphabeticCharsForConcat.reverse();

        // Build the concatenated string with alternating caps
        const concatString = alphabeticCharsForConcat.map((char, index) => {
            return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
        }).join('');

        // Construct the final response object
        const response = {
            is_success: true,
            user_id: "john_doe_17091999",
            email: "john@xyz.com",
            roll_number: "ABCD123",
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialCharacters,
            sum: String(sumOfNumbers), // Convert sum back to a string
            concat_string: concatString
        };

        // Send the JSON response with a 200 OK status
        res.status(200).json(response);

    } catch (error) {
        // Catch any unexpected errors and return a consistent error response
        res.status(500).json({
            is_success: false,
            user_id: "john_doe_17091999",
            message: `An internal server error occurred: ${error.message}`
        });
    }
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

