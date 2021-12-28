const fs = require('fs');

const getNotes = () => {

    var data = fs.readFileSync('./db/db.json','utf8')
    
    if (data != null) {
        notes = JSON.parse(data);
    }
    else {
        notes = [];
    }

    return notes;
}
    
const saveNotes = (notes) => {

    try {
        fs.writeFileSync('./db/db.json', JSON.stringify(notes)) 
    }
    catch (err) {
        console.error(err)
    }
}

module.exports = {
    getNotes,
    saveNotes
};
