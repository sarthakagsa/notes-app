const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find( (note) => note.title===title)
    if (!duplicateNote) {
        notes.push({
        title : title,
        body : body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen('New note added, Title :'+title+ ' Body :' +body+''));
    } else {
        console.log(chalk.bgRed('Note title taken'));
    }
}
    const saveNotes = (notes) => {
        const notesJSON = JSON.stringify(notes)

        fs.writeFileSync('notes.json',notesJSON)
    }


const loadNotes= () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return data = JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}

const removeNote =  (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) =>  note.title !== title)
    if (notesToKeep.length===notes.length) {
        console.log(chalk.bgRed('No note found!'));
    } else {
        console.log(chalk.bgGreen('Note removed!'));
    }
    saveNotes(notesToKeep)
}

const listNotes = () =>{
    console.log(chalk.bgBlue('Your Notes'));
    const notes = loadNotes()
    notes.forEach((note) => {
    console.log(chalk.bgGreen(note.title))
    });

}

const readNote =(title) => {
    const notes = loadNotes()
    const readNote = notes.find((note) => note.title === title )
    if (readNote) {
        console.log(chalk.bgBlue(title));
        console.log(readNote.body);
    } else {
        console.log(chalk.bgRed('Title not found!'));
    }
}

module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    listNotes : listNotes,
    readNote : readNote
}