class Button{
    constructor(textContent, width, height, x, y, textColor, backgroundColor, id, position){
            this.button = document.createElement("button");
            this.button.textContent =  textContent
            this.button.id =  id
            this.button.className =  "btn"
            //Used ChatGPT to help debug my add button position wasn;t where I was ecpecting it to be the
            // reason was because i mispelt relative I ahd it as realtive which was 
            //why hte code below that was supposed to set the position wasnt being executed
            if(position != ""){
                this.button.style.position = position
            }
            
            this.button.style.color = textColor
            this.button.style.backgroundColor = backgroundColor
            this.button.style.width = width  + "em"
            this.button.style.height = height + "em"
            this.button.style.left = x + "vw"
            this.button.style.top = y  + "vh"
          

            document.body.appendChild(this.button)
    }
}

class addButton extends Button {
    constructor( width, height, x, y, textColor, backgroundColor){
        super(addButtonDesc, width, height, x, y, textColor, backgroundColor, "Add", "relative")
    }

}

class removeButton extends Button {
    constructor(width, height, x, y, textColor, backgroundColor, id){
         super(removeButtonDesc, width, height, x, y, textColor, backgroundColor, id, "")
    }

}

class backButton extends Button{
    constructor(width, height, x, y, textColor, backgroundColor){
        
        super(backButtonDesc, width, height, x, y, textColor, backgroundColor, "back", "fixed")
        // Used ChatGPT to see if the button as an href attribute it does not so had to nest button in link 
        this.link = document.createElement("a")
        this.link.href = "index.html"
        this.link.className = "btn"
        this.link.appendChild(this.button)
        
        document.body.appendChild(this.link);
    }
   
    
}

class writerButton extends Button{
    constructor(width, height, x, y, textColor, backgroundColor){
        super(writeButtonDesc, width, height, x, y, textColor, backgroundColor, "write", "absoute")
        this.link = document.createElement("a")
        this.link.href = "writer.html"
        this.link.className = "btn"
        this.link.appendChild(this.button)
        document.body.appendChild(this.link);

   }
}

class readerButton extends Button{
    constructor(width, height, x, y, textColor, backgroundColor){
        super(readButtonDesc, width, height, x, y, textColor, backgroundColor,"Read", "absoute")
        this.link = document.createElement("a")
        this.link.href = "reader.html"
        this.link.className = "btn"
        this.link.appendChild(this.button)
        document.body.appendChild(this.link);
   }

    
}


class TextArea{

    constructor(div, id, isDisabled){
        //Used ChatGPT to find out the syntax for a text area
        this.textArea = document.createElement("textarea");
        this.textArea.className = "form-control"
   
        this.textArea.id = "textarea" + id
        this.textArea.style.backgroundColor = "skyblue"
        this.textArea.disabled = isDisabled
        this.textArea.value = space
        //Used ChatGPT to find the oniput attribute that calls the getText function when there is change in input
        this.textArea.oninput = () => this.getValue()
        div.appendChild(this.textArea)
    }

    setValue(value){
        this.textArea.value = value
    }

    getValue(){
        console.log("getting value " + this.textArea.value)
        if (this.textArea.value){
       
            return this.textArea.value
        }else{
            return space
        }
    }
}

class Note{
        constructor(id, isReadOnly){
            this.containerDiv = document.createElement("div");
            this.rowDiv = document.createElement("div");
            this.colDiv = document.createElement("div");
            this.containerDiv.className = "container mb-5"
            this.rowDiv.className = "ms-5  row"
            this.colDiv.className = "col-5"
            this.containerDiv.id = "div" + id
            this.containerDiv.appendChild(this.rowDiv)
            this.rowDiv.appendChild(this.colDiv)
            this.textArea = new TextArea(this.colDiv, id, isReadOnly)
            //Asked chatGPT is there is a way to insert before a specific element so that the add button will move down
            document.body.insertBefore(this.containerDiv, document.getElementById("Add"))

        }


        getText(){
 
            console.log("Text: " + this.textArea.getValue())
            return this.textArea.getValue()
        }

        
}



console.log("JS connected to writer")
let length = 0
let notes = []
//Use chatGPT to see if there is a way to tell the html files apart
//as it was adding the add button to all three pages

class Writer{
    constructor(){
        this.addBtn = new addButton(10, 5, 10, 1, "black", "pink")
        this.backBtn = new backButton(8, 5, 1, 80, "black", "orange")
        
        this.notes = []
        this.length = this.notes.length + 1
        this.paragraph = document.createElement("p")
        this.paragraph.id = "time"
        this.paragraph.textContent = emptyString
        this.paragraph.className = "text-end p-3"

        document.body.insertBefore(this.paragraph, document.getElementById("Add"))
    }
    
    reassignId(index){
        console.log("index: " + index)
        console.log("inLen: " + this.notes.length)

        for(let i = index; i < this.notes.length+1; i++){
                let id = i + 1
                console.log("----------reassigning new note: " + i)
                console.log(" Old: " + this.notes[i-1].textArea.value)

                document.getElementById("div" + id.toString()).id = "div" + i 
                document.getElementById("Remove" + id.toString()).id = "Remove" +  i 

                this.notes[i-1].textArea.value = localStorage.getItem("note"+id)
                console.log("New get: " + this.notes[i-1].getText())
                console.log("New: " + this.notes[i-1].textArea.value)

                console.log("removing " + i + "from ls")


                console.log("New: " + this.notes[i-1].textArea.value)
                // new removeButton(10, 3, 0, 1*(i),"white", "Brown", "Remove" + i.toString())
                //gpt how to remove item from local storage
                
            
            
        }
    }

    removeNote(id){
        console.log("Removing " + id)
        console.log(document.getElementById("div" + id.toString()))
        document.getElementById("div" + id.toString()).remove()  
        localStorage.removeItem("note"+(id));
        // document.getElementById("Remove" + id.toString()).remove()
        localStorage.removeItem("note"+(id))
        //Used chatGPT to find the plice method to remove an elment from an array
        console.log( this.notes )
        this.notes.splice(id-1, 1);
        console.log("after")
        console.log( this.notes)
        this.reassignId(id)
        this.length = this.notes.length

        this.assignOnClicktoButtons()
    }

    addRemoveButton(){
       return new removeButton(10, 3, 50, 12*this.length,"white", "Brown", "Remove" + this.length.toString())

    }

    assignOnClicktoButtons(){
        for (let i = 1; i <= this.length; i++) {
            console.log("assinging" + i )
            console.log("NewAssign: " + this.notes[i-1].getText())
            if(document.getElementById("div" + i)){
                document.getElementById("Remove" + i).onclick = () => this.removeNote(i);
            }
         
        }    
    }

    addNote(){
        console.log("=====Adding=======")
        console.log(this.notes)
        this.length = this.notes.length + 1
        
        console.log("len: " + this.length)
        let note = new Note( this.length, false);
        localStorage.setItem("note" + this.length.toString(), "")
        console.log("note: " + note)
        
        console.log("notes: " + this.notes)
        let rmvBtn = this.addRemoveButton()
        note.rowDiv.appendChild(rmvBtn.button)
        this.notes.push(note)
        console.log("assinging onClick to" +  this.length) 
        this.assignOnClicktoButtons()    

    }

    getNotes(){
        console.log("Getting " + localStorage.length + " notes")
            for(let i = 1; i < localStorage.length+1; i++){
                
                
                let div = document.getElementById("div"+i)
                console.log(div)
                    console.log("Getting note" + i + " with value: " + localStorage.getItem("note"+i))
                    let note = new Note(i, false)
                    note.textArea.setValue(localStorage.getItem("note"+i))
                    console.log("Created Note" + i)
                    let rmvBtn = new removeButton(10, 3, 50, 12*i,"white", "Brown", "Remove" + i.toString())
                    note.rowDiv.appendChild(rmvBtn.button)
                    this.notes.push(note)
                    console.log(this.notes)
                    console.log("assinging onClick to" +  this.length) 
                    this.assignOnClicktoButtons()  
                    this.length++
                
            }
    }

    updateNotes(){
        setInterval(() =>{
          
            console.log(this.notes)
                for(let i = 0; i <= this.notes.length; i++){
                    let index = i+1
                    
                    console.log(localStorage.getItem(index))
                    console.log(index)
                    let div = document.getElementById("div"+index)
                    console.log(div)
                    if(document.getElementById("div" + index)){
                        localStorage.setItem("note" + index,this.notes[i].getText())
                    }else{
                        localStorage.removeItem("note" + index)
                    }
                    

                }

                // Function to format a number with two digits gotten from ChatGPT
                function formatTwoDigits(number) {
                    return number < 10 ? "0" + number : number;
                }

                //Used Chat GPT to find out how to get date and time components
                let currentTime = new Date(); 
   
                let hours = formatTwoDigits(currentTime.getHours());
                let minutes = formatTwoDigits(currentTime.getMinutes());
                let seconds = formatTwoDigits(currentTime.getSeconds());

                let AmorPM = emptyString
                if(hours  <= 12){
                    AmorPM = am
                }else{
                    hours = hours - 12
                    AmorPM = pm
                }
                document.getElementById("time").textContent = storedAt + hours + colon + minutes + colon + seconds + space +  AmorPM
            } , 2000)
    }
    
}

class Reader{
    constructor(){
        this.backBtn = new backButton(8, 5, 1, 80, "black", "orange")
        this.paragraph = document.createElement("p")
        this.paragraph.id = "time"
        this.paragraph.className = "text-end p-3"
       
   
        this.paragraph.textContent = emptyString
    
        document.body.appendChild(this.paragraph)
        
        this.numofNotes = 0
    }

    removeNotes(){
        console.log("Reacehd Removing")
        let numofTextAreas = document.querySelectorAll('textarea').length
        console.log("nta: " + numofTextAreas)
        if(numofTextAreas > localStorage.length){
            let difference = numofTextAreas - localStorage.length
            console.log("diff: " + difference)
            for(let i = 1; i < difference+1; i ++){
                let id = localStorage.length + i
                let div = document.getElementById("div"+id)
                div.remove()
                console.log("removing: ")
                console.log(document.getElementById("div"+id))
            }
        }
    }

    getNotes(){
        console.log("Getting " + localStorage.length + " notes")
            for(let i = 1; i < localStorage.length+1; i++){
                
                
                let div = document.getElementById("div"+i)
                console.log(div)

                if(localStorage.getItem("note" + i) && div == undefined){
                    console.log("Getting note" + i + " with value: " + localStorage.getItem("note"+i))
                    let note = new Note(i, true)
                    note.textArea.value = localStorage.getItem("note"+i)
                    console.log("Created Note" + i)
                }
                else if(div){
                    if(localStorage.getItem("note" + i) != div.querySelector("#textarea"+i).value){
                        div.querySelector("#textarea"+i).value = localStorage.getItem("note" + i)
                    }
                }
                
            }
    }

    updateNotes(){
        setInterval(() =>{
                this.removeNotes()
                this.getNotes()
                let currentTime = new Date(); 
   
                let hours = currentTime.getHours();
                let minutes = currentTime.getMinutes();
                let seconds = currentTime.getSeconds();

                let AmorPM = emptyString
                if(hours  <= 12){
                    AmorPM = am
                }else{
                    hours = hours - 12
                    AmorPM = pm
                }
                document.getElementById("time").textContent = updatedAt + hours + colon + minutes + colon + seconds + space +  AmorPM
            } , 2000)
    }
}


if (document.title == "Writer") {
    let writer = new Writer()
    writer.getNotes()
    document.getElementById("Add").onclick = () => {
        writer.addNote()
    }
    writer.updateNotes()
    
}else if(document.title == "Reader"){

    let reader = new Reader()
    reader.updateNotes()
}else if(document.title == "Home"){
    new writerButton(8, 5, 10, 5, "black", "burlywood")
    new readerButton(8, 5, 30, 5, "black", "burlywood")
}
