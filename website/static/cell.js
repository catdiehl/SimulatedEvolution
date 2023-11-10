const Layer ={
    Producer: 1,
    Consumer: 2,
    Wall: 3,
    Elevation: 4,
    List:  5,
    Temperature: 6,
}
/**
 * @class Cell
 * @classdesc A class that creates Cells of a Simulation-grid object to establish
 * user interaction.
 * @prop {Element} Cell.element an HTML element associated with the Cell object
 * @prop {Array[Int]} Cell.position the [X,Y] location of the created Cell object
 */
class Cell{
    /**
     * @param {Array[int]} position [X,Y] location to create a Cell object
     */
    constructor(position){
        //Create html element for Cell
        this.element = document.createElement('div');
        this.position = position;
         // Cell id is 'cell-<row>-<col>'
        this.element.id = 'cell-' + this.position[0] + '-' + this.position[1];
        //Add style classification for cell
        this.element.classList.add('grid-item');
        this.element.style.backgroundColor = "white";
        //Add event listeners
        this.element.onmouseenter = () => {this.decreaseCellOpacity()};
        this.element.onmouseleave = () => {this.restoreCellOpactiy()};
        this.element.onclick = () => {this.displayCellInfo()};
        this.createInfoDisplay();        
    }

    //Method that lowers the opacity of a cell that the mouse hovers over
    decreaseCellOpacity(){
        this.element.style.border = "solid black";
        this.infoDisplay.style.opacity = 1;
    }

    //Method that restores opacity of a cell when the mouse leaves cell
    restoreCellOpactiy(){
        this.element.style.border = "none";
        this.infoDisplay.style.opacity = 0;
    }

    /**
     * Method that displays all the layer information at a clicked Cell
     */
    displayCellInfo(){
        //Debug print
        console.log(`Output information of ${this.element.id} at position: ${this.position}`);
        //Format cell position to send to Python backend
        const data = {position: this.position};
        //Make the POST request
        fetch('/get_cell_data', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)})
        .then((response) => response.json())
        //Post Request SUCCESS, Perform operations on response(cellLayerData)
        .then((cellLayerData) => {

           console.log(cellLayerData);
            
        })
        //POST Request FAILED
        .catch((error) =>{
            console.error('Error:', error);
        });
    }

    createInfoDisplay(){
        //Create new element 'info-display'
        this.infoDisplay = document.createElement('div');
        this.infoDisplay.classList.add('info-display');
        // this.infoDisplay.innerText = `Climate: ${0.395}\nCreatures: ${53}\nLight-level: ${0.532}\n <Click for details>`;
        this.infoDisplay.innerHTML = `Climate: ${0.395}` + '<br>' + `Creatures: ${53}` + '<br>' + `Light-level: ${0.532}` + '<p class="text-center" class="details-text">click for details</p>';

        this.infoDisplay.style.opacity = 0; 
        this.element.appendChild(this.infoDisplay); 
    }
}

