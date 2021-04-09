// imagen , nombre, descripción, categoría, precio

//Obtener los datos de nuestro formulario
const getProductData = () => {
    let productObjet = {}
    let fields = document.querySelectorAll("form input[type='text']")
    
    //console.log( fields )

    fields.forEach( field => {
        // console.log( field.name )
        productObjet[field.name] = field.value 
        // console.log( productObjet )
    })

    let select = document.getElementById("category")
    let category = select.options[select.selectedIndex].value

    //console.log( gender )
    let numberButton = document.getElementById("price")
    let price = numberButton.value;
    price = parseInt(price)

    productObjet = {...productObjet, category, price }
    // console.log( productObjet )
    saveProduct( productObjet )

    fields.forEach( field => {
        field.value = ""
    })
    numberButton.value = ""

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
            printCard( getProductsCollection() )

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
            // console.log( xhttp.response )
            productsCollection = JSON.parse( xhttp.response)
        }
    }

    xhttp.open("GET", "https://ajaxclass-1ca34.firebaseio.com/11g/lalo/products.json", false );

    xhttp.send();

    return productsCollection    
}

// Eliminar productos
const deleteProduct = event => {

    let productKey = event.target.dataset.productKey

    let xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // console.log( xhttp.response )
            printCard( getProductsCollection() )
        }
    }

    xhttp.open("DELETE", `https://ajaxclass-1ca34.firebaseio.com/11g/lalo/products/${productKey}/.json`, false );

    xhttp.send();
}

//Función para imprimir los datos de nuestra DB
const printCard = data => {

    //Eliminar la tabla
    let productsContainer = document.getElementById("products-container");

    while (productsContainer.lastElementChild) {
        productsContainer.removeChild( productsContainer.lastElementChild );
    }

    for( key in data ){

        let card = document.createElement("div");
        card.classList.add("card");
        productsContainer.appendChild(card)

        let {image, name, description, category, price} = data[key];

        let img = document.createElement("img");
        img.classList.add("card-img-top");
        img.setAttribute('src',`${image}`);
        card.appendChild(img)

        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        card.appendChild(cardBody)

        let cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title")
        let textTitle = document.createTextNode(name);
        cardTitle.appendChild(textTitle);
        cardBody.appendChild(cardTitle)

        let boxDescription = document.createElement("p");
        boxDescription.classList.add("card-text")
        let textDescription = document.createTextNode(`Descripción: ${description}`);
        boxDescription.appendChild(textDescription);
        cardBody.appendChild(boxDescription)

        let boxCategory = document.createElement("p");
        boxCategory.classList.add("card-text")
        let textCategory = document.createTextNode(`Categoría: ${category}`);
        boxCategory.appendChild(textCategory);
        cardBody.appendChild(boxCategory)

        let boxPrice = document.createElement("p");
        boxPrice.classList.add("card-text")
        let textPrice = document.createTextNode(`Precio: $${price.toFixed(2)}`);
        boxPrice.appendChild(textPrice);
        cardBody.appendChild(boxPrice);

        let deleteButton = document.createElement("button");
        deleteButton.classList.add("btn" ,"btn-danger");
        let textDelete = document.createTextNode("Eliminar");
        deleteButton.appendChild(textDelete);
        cardBody.appendChild(deleteButton);
        deleteButton.dataset.productKey = key;

        deleteButton.addEventListener("click", deleteProduct)
        
    }
}

printCard(getProductsCollection())

// const getFilter = array => {
//     let select = document.getElementById("filter-category");
//     inputCategory = select.options[select.selectedIndex]
    
//     let filterArray = {}
//     // console.log(array);

//     if(category.value === "todos"){
//         // printCard(array)
//     } else{
//         for(key in array){
//             let {image, name, description, category, price} = array[key];
//             if (inputCategory.value === category){
//                 filterArray = array[key];
//                 console.log(filterArray);
//             }
            
//         }
//     }

//     // console.log(category.value);
// }

const getFilter = array => {
    let select = document.getElementById("filter-category");
    inputCategory = select.options[select.selectedIndex]
    let filterArray = {}
    // console.log(array);
    if(inputCategory.value === "todos"){
         printCard(array)
    }else{
        for(key in array){
            let {image, name, description, category, price} = array[key];
            if (inputCategory.value === category){
                objectItem=array[key]
                filterArray = {...filterArray, objectItem};
                //console.log(filterArray);
            }
            printCard(filterArray)
        }
    }
    // console.log(category.value);
}

// let filterButton = document.getElementById("filter-category");
// filterButton.addEventListener('change', getFilter(getProductsCollection()))

