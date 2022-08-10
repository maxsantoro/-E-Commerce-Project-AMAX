document.addEventListener('DOMContentLoaded', e => {
    trearJson()

})
const productosML = []
const productosJson = []

const botonMc = document.getElementById("botonMc")
const botonJson = document.getElementById("botonJson")
const botonMp = document.getElementById("botonPagar")

botonMc.addEventListener("click", e => trearInfo())
botonJson.addEventListener("click", e => trearJson())
botonMp.addEventListener("click", e => pagar())


const trearInfo = async () => {
    
    const buscador = document.getElementById("buscador")
    
    let response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${buscador.value}`)
    let data = await response.json()
    console.log(data)
    
    productosML.push(...data.results)
    
}

const trearJson = async () => {
    
    let response = await fetch("./productos.json")
    let data = await response.json()
    
    productosJson.push(...data)
    
    let contenedor = document.getElementById("contenedor")
    
    for (const element of productosJson) {
        let card = document.createElement("div")
        card.innerHTML=`
        <h1>${element.nombre}</h1>
        <h4>Precio : ${element.precio}</h4>`
    
        // let card = `<h1>Hola</h1>`
    
        contenedor.append(card)
    }

}

const pagar = async () => {

    const productosToMap = productosJson.map(Element => {
        let nuevoElemento = {
            title: Element.nombre,
            picture_url: Element.img,
            category_id: Element.id,
            quantity: Element.cantidad,
            currency_id: "ARS",
            unit_price: Element.precio
        }
        return nuevoElemento
    })

    let response = await fetch("https://api.mercadopago.com/checkout/preferences", {
        method: "POST",
        headers: {
            Authorization: "Bearer TEST-4102354633809968-081013-ef9dbaf68b493c80176ad0edfb72e9de-63805305"
        },
        body: JSON.stringify({
            items: productosToMap
        })
    })

    let data = await response.json()

    window.open(data.init_point, "_blank")

    console.log(data)
}
