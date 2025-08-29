// api/index.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post("/bfhl", (req, res) => {
  try {
    if (!req.body || !Array.isArray(req.body.data)) {
      return res.status(400).json({
        is_success: false,
        user_id: "john_doe_17091999",
        message: "Invalid request. 'data' array is missing or malformed.",
      });
    }

    const inputData = req.body.data;

    const oddNumbers = [];
    const evenNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sumOfNumbers = 0;
    let alphabeticCharsForConcat = [];

    for (const item of inputData) {
      if (/^\d+$/.test(item)) {
        const num = parseInt(item, 10);
        sumOfNumbers += num;
        if (num % 2 === 0) {
          evenNumbers.push(item);
        } else {
          oddNumbers.push(item);
        }
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        alphabeticCharsForConcat = alphabeticCharsForConcat.concat(
          item.split("")
        );
      } else {
        specialCharacters.push(item);
      }
    }

    alphabeticCharsForConcat.reverse();

    const concatString = alphabeticCharsForConcat
      .map((char, index) => {
        return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
      })
      .join("");

    const response = {
      is_success: true,
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialCharacters,
      sum: String(sumOfNumbers),
      concat_string: concatString,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      is_success: false,
      user_id: "john_doe_17091999",
      message: `An internal server error occurred: ${error.message}`,
    });
  }
});

if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports = app;
