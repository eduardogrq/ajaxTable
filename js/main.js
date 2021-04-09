// imagen , nombre, descripción, categoría, precio

//Obtener los datos de nuestro formulario
const getProductData = () => {
    let productObjet = {}
    let fields = document.querySelectorAll("form input[type='text']")
    
    //console.log( fields )

    fields.forEach( field => {
        console.log( field.name )
        productObjet[field.name] = field.value 
        console.log( productObjet )
    })

    let select = document.getElementById("category")
    let category = select.options[select.selectedIndex].value

    //console.log( gender )
    let numberButton = document.getElementById("price")
    let price = numberButton.value

    productObjet = {...productObjet, category, price }
    console.log( productObjet )
    saveProduct( productObjet )

    fields.forEach( field => {
        field.value = ""
    })
}

//Botón para guardar

document.getElementById("save-product").addEventListener("click", getProductData )

//Función para guardar nuestro producto
const saveProduct = product => {
    let xhttp = new XMLHttpRequest(); /**/ 
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           console.log( xhttp.response )
        //    $('#save-succesful').modal('show')
            // printTable( getAlbumsCollection() )
        }
    }

    xhttp.open("POST", "https://ajaxclass-1ca34.firebaseio.com/11g/lalo/products.json", true);

    xhttp.send( JSON.stringify(product) );
}


const getProductsCollection = () => {
    let productsCollection;
    let xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log( xhttp.response )
            productsCollection = JSON.parse( xhttp.response)
        }
    }

    xhttp.open("GET", "https://ajaxclass-1ca34.firebaseio.com/11g/lalo/products.json", false );

    xhttp.send();

    return productsCollection    
}

const printCard = data => {


    for( key in data ){
        // console.log( key )
        // console.log( data[key] )


        let card = document.createElement("div")
        card.classList.add("card")

        let {image, name, description, category, price} = data[key];

        let img = document.createElement("img");
        img.classList.add("card-img-top")
        img.setAtribute('src',`${image}`)

        let cardBody = document.createElement("div")
        cardBody.classList.add("card-body")



        
        // let { name, gender, band } = dataToPrint[key]

        // let albumRow = document.createElement("tr")

        // let indexTd = document.createElement("td")
        // let nameTd = document.createElement("td")
        // let bandTd = document.createElement("td")
        // let genderTd = document.createElement("td")
        // let buttonTd = document.createElement("td")

        // let indexText = document.createTextNode( index )
        // let nameText = document.createTextNode( name )
        // let bandText = document.createTextNode( band )
        // let genderText = document.createTextNode( gender )

        // let deleteButton = document.createElement("button")
        // deleteButton.classList = "btn btn-outline-danger delete-button"
        // deleteButton.dataset.albumKey = key

        // let buttonText = document.createTextNode("Borrar")

        // deleteButton.appendChild(buttonText)

        // indexTd.appendChild( indexText )
        // nameTd.appendChild( nameText )
        // bandTd.appendChild( bandText )
        // genderTd.appendChild( genderText )
        // buttonTd.appendChild( deleteButton )

        // albumRow.appendChild(indexTd)
        // albumRow.appendChild(nameTd)
        // albumRow.appendChild(bandTd)
        // albumRow.appendChild(genderTd)
        // albumRow.appendChild(buttonTd)

        // table.appendChild(albumRow)
        // index++
    }
}

/* <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="..." alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div> */