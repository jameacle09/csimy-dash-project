const mongoose = require("mongoose");

var countrySchema = new mongoose.Schema({
    name: {
        type: String
    }
});

mongoose.model('Country', countrySchema);