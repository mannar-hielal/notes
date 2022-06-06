const addBtn = document.getElementById("add");
const notes= document.getElementById("notes");

const savedNotes = JSON.parse(localStorage.getItem("notes"));

if (savedNotes) {
    savedNotes.forEach(el=> addNewNote(el))
}

addBtn.addEventListener("click", ()=>  addNewNote());

function addNewNote(text= "") {
    const note= document.createElement("div");
    note.classList.add("note");
    note.innerHTML= `
            <div class="tools">
            <button class="edit">
                <i class="fas fa-edit"></i>
            </button>
            <button class="delete">
                <i class="fas fa-trash"></i>
            </button>
            </div>

            <div class="main-text ${text? "" : "hidden"}"></div>
            <textarea class="${text? "hidden": ""}"></textarea>
    `;

    notes.appendChild(note);

    const editBtn = note.querySelector(".edit");
    const deleteBtn = note.querySelector(".delete");
    const mainText = note.querySelector(".main-text");
    const textArea = note.querySelector("textarea");

    textArea.value = text;
    mainText.innerHTML = marked.parse(text);

    updateLocalStorage();

    deleteBtn.addEventListener("click", () => {
        note.remove();
        updateLocalStorage();
    });

    editBtn.addEventListener("click", ()=> {
        mainText.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
        updateLocalStorage();
    });

    textArea.addEventListener("input", (e)=> {
        const value = e.target.value;
        mainText.innerHTML = marked.parse(value);
        updateLocalStorage();
    })
}

function updateLocalStorage () {
    const NotesText = document.querySelectorAll("textarea");

    const notesArr = [];

    NotesText.forEach(el=>notesArr.push(el.value));
    localStorage.setItem("notes", JSON.stringify(notesArr));
}