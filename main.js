const addBtn = document.getElementById("add");
const notes= document.getElementById("notes");

addBtn.addEventListener("click", ()=>  addNewNote());

function addNewNote(text= "") {
    const note= document.createElement("div");
    note.classList.add("note");
    note.innerHTML= `

        <div class="note">
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
        </div>
    `;

    notes.appendChild(note);

    const editBtn = note.querySelector(".edit");
    const deleteBtn = note.querySelector(".delete");
    const mainText = note.querySelector(".main-text");
    const textArea = note.querySelector("textarea");

    textArea.value = text;
    mainText.innerHTML = marked.parse(text);

    deleteBtn.addEventListener("click", () => {
        note.remove();
    });

    editBtn.addEventListener("click", ()=> {
        mainText.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    });

    textArea.addEventListener("input", (e)=> {
        const value = e.target.value;
        mainText.innerHTML = marked.parse(value);
    })
    
}