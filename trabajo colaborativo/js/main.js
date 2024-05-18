let header = `
<div class="header-superior">
            <div class="icon">
                <a href="index.html" ><img class="animate__animated animate__shakeY" id="icon" src="img/logos de pagina/logoEx.png" alt="logo_de_imagen"
                        height="60px" width="100px"></a>
            </div>

            <div class="buscador">
                <input type="text" placeholder="Eso que querés... Buscalo acá">
                <button><img src="img/nav/icons8-búsqueda-50.png" alt="buscar" height="30px"></button>
            </div>

            <div class="formularios">
                <a href="login.html">Login</a>
                <a href="registro.html">Registrarse</a>
                <a href="#" ><img src="img/nav/carrito-de-compras.png" height="31px" alt="carrito de compras"></a>
            </div>

        </div>
        `

let nav = `
<div class="desplegable">
            <a href="#">CATEGORIAS &#9660;</a>
        </div>
        <nav class="main-nav">
            <a href="index.html" class="inicio">Inicio</a>
            <a href="Pcs-de-escritorios.html" class="pcs-escritorio">Pcs de escritorios</a>
            <a href="monitores.html">Monitores</a>
            <a href="perifericos.html">Perifericos</a>
            <a href="contactanos.html">Contactanos</a>
        </nav>
    `
let footer = `
    <div class="info-footer">
        <a href="#">Quiénes somos</a>
        <a href="#">Terminos y condiciones</a>
        <a href="#">Politicas de privacidad</a>
        <a href="#">Garantía y devoluciones</a>
        <a href="#">Promociones y sorteos</a>
    </div>
<div class="redes"> <!--DISTINTAS REDES SOCIALES-->
<h6>Nuestras redes</h6>
<div>
    <a href="#"><img src="img/logos de redes/facebook.png" alt="logo de facebook" height="40px"></a>
    <a href="#"><img src="img/logos de redes/instagram.png" alt="logo de instagram" height="40px"></a>
</div>
</div>
<div class="contacto"> <!--CONTACTO A TRAVES DE WHATSAPP-->
<h6>Contacto</h6>
<a href="#"><img src="img/logos de redes/whatsapp 2.png" alt="logo de whatsapp" height="40px"></a>
</div>
<div class="derecho">
<p>Copyright © Todos los derechos reservados</p>
</div>

`

document.querySelector("header").innerHTML = header;
document.querySelector(".header-inferior").innerHTML = nav;
document.querySelector("footer").innerHTML = footer;


function validarContraseña() {
    var clave = document.querySelector("#clave");
    let error = true;
    let numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let letras = [];
    let simbolos = [];

    for (let i = 97; i <= 122; i++) {
        letras.push(String.fromCharCode(i))
    }
    letrasMayusculas = letras.map(letra => letra.toUpperCase())

    for (let j = 33; j <= 47; j++) {
        simbolos.push(String.fromCharCode(j));
    }
    simbolos.push(String.fromCharCode(95));

    let contiene8Digitos = false;
    if (clave.value.length >= 8) {
        contiene8Digitos = true;
    }

    let contieneMayuscula = false;
    for (let k = 0; k < clave.value.length; k++) {
        if (letrasMayusculas.includes(clave.value.charAt(k))) {
            contieneMayuscula = true;
            break;
        }
    }

    let contieneSimbolo = false;
    for (let l = 0; l < clave.value.length; l++) {
        if (simbolos.includes(clave.value.charAt(l))) {
            contieneSimbolo = true;
            break;
        }
    }

    let contieneNumero = false;
    for (let m = 0; m < clave.value.length; m++) {
        if (numeros.includes(clave.value.charAt(m))) {
            contieneNumero = true;
            break;
        }
    }

    if (contiene8Digitos && contieneMayuscula && contieneNumero && contieneSimbolo) {
        error = false;
        document.querySelector("#validar-clave").innerHTML = `&nbsp;`;
        return clave;
    }

    if (error === true) {
        document.querySelector("#validar-clave").innerHTML = `La contraseña debe tener al menos 8 caracteres y 1 mayuscula, 1 número y 1 caracter especial`;
        clave.focus();
        return false;

    }

}

function repetirContraseña() {
    error = true;
    clave2 = document.querySelector("#clave2");
    if (clave2.value === clave.value) {
        error = false;
    }
    if (error === true) {
        document.querySelector("#validar-clave2").innerHTML = `Las contraseñas deben coincidir`;
        clave2.focus();
        return false;
    }

}

function mostrarContraseña() {
    let clave = document.querySelector("#clave");
    let icono = document.querySelector(".div-mostrarClave img");
    if (clave.type === "password") {
        clave.type = "text";
        icono.src = "./img/formularios registro/ojo.png"
    }
    else {
        clave.type = "password";
        icono.src = "img/formularios registro/invisible.png"
    }
}

function mostrarRepetirContraseña() {
    let clave = document.querySelector("#clave2");
    let icono = document.querySelector(".div-mostrarRepetirClave img");
    if (clave.type === "password") {
        clave.type = "text";
        icono.src = "./img/formularios registro/ojo.png"
    }
    else {
        clave.type = "password";
        icono.src = "img/formularios registro/invisible.png"
    }
}


//Consumir api para mostrar los productos en el index con vue:
const { createApp } = Vue
createApp({
    data() {
        return {
            url: "js/datos.json",
            datos:[],
            datosIndex: [],
            datosPc:[],
            datosMonitor:[],
            datosPerifericos:[],
            error: false,
            section1: [],
            section2: [],
            section3: [],
            section4: [],
            selectOption: "",
            selectMostrar:"",
            
           

        }
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(
                    data => {
                        console.log(data)
                        this.datos = data;
                        this.datosIndex = this.datos.slice(0, 19);
                        this.section1 = this.datosIndex.slice(0, 4);
                        this.section2 = this.datosIndex.slice(4, 8);
                        this.section3 = this.datosIndex.slice(8, 11);
                        this.section4 = this.datosIndex.slice(11, 15);
                        this.section5 = this.datosIndex.slice(15, 19);
                        this.datosPc = this.datos.slice(19,31);
                        this.datosMonitor = this.datos.slice(31,40);
                        this.datosPerifericos = this.datos.slice(40,58);
                        this.mostrar();
                        this.mostrarFiltroNav();
                        this.mostrarMonitores()
                        this.filtrar();
                        this.filtrarMonitores();
                        this.filtrarPerifericos();
                        this.mostrarPerifericos()

                        
                    
                    }
                )
                .catch(error => {
                    console.log("Error:" + error)
                    this.error = true
                });
        },
        filtrar(){
            if(this.selectOption === "menor-precio"){
                this.datosPc.sort((a,b) =>   a.precio - b.precio);
            }
            else if (this.selectOption === "mayor-precio"){
                this.datosPc.sort((a,b) => b.precio - a.precio) ;
            }
            else if (this.selectOption === "nombre-ascendente"){
                this.datosPc.sort((a,b) => a.producto.localeCompare(b.producto));
            }
            else if (this.selectOption=== "nombre-descendente"){
                this.datosPc.sort((a,b) => b.producto.localeCompare(a.producto));
            }
    },
    filtrarMonitores(){
        if(this.selectOption === "menor-precio"){
            this.datosMonitor.sort((a,b) =>   a.precio - b.precio);
        }
        else if (this.selectOption === "mayor-precio"){
            this.datosMonitor.sort((a,b) => b.precio - a.precio) ;
        }
        else if (this.selectOption === "nombre-ascendente"){
            this.datosMonitor.sort((a,b) => a.producto.localeCompare(b.producto));
        }
        else if (this.selectOption=== "nombre-descendente"){
            this.datosMonitor.sort((a,b) => b.producto.localeCompare(a.producto));
        }
},filtrarPerifericos(){
    if(this.selectOption === "menor-precio"){
        this.datosPerifericos.sort((a,b) =>   a.precio - b.precio);
    }
    else if (this.selectOption === "mayor-precio"){
        this.datosPerifericos.sort((a,b) => b.precio - a.precio) ;
    }
    else if (this.selectOption === "nombre-ascendente"){
        this.datosPerifericos.sort((a,b) => a.producto.localeCompare(b.producto));
    }
    else if (this.selectOption=== "nombre-descendente"){
        this.datosPerifericos.sort((a,b) => b.producto.localeCompare(a.producto));
    }
},
    mostrar(){
        if(this.selectMostrar === "All"){
            this.datosPc = this.datos.slice(19,31);
            this.datosPc = this.datosPc.slice(0,12)
        }
        else if(this.selectMostrar === "4"){
            this.datosPc = this.datos.slice(19,31);
            this.datosPc = this.datosPc.slice(0,4)
        }
        else if(this.selectMostrar === "9"){
            this.datosPc = this.datos.slice(19,31);
            this.datosPc = this.datosPc.slice(0,9)
        }
       
    },
    mostrarMonitores(){
        if(this.selectMostrar === "All"){
            this.datosMonitor = this.datos.slice(31,40);
            this.datosMonitor = this.datosMonitor.slice(0,9)
        }
        else if(this.selectMostrar === "2"){
            this.datosMonitor = this.datos.slice(31,40);
            this.datosMonitor = this.datosMonitor.slice(0,2)
        }
        else if(this.selectMostrar === "4"){
            this.datosMonitor = this.datos.slice(31,40);
            this.datosMonitor = this.datosMonitor.slice(0,4)
        }

    },
    mostrarPerifericos(){
        if(this.selectMostrar === "All"){
            this.datosPerifericos  = this.datos.slice(40,58);
            this.datosPerifericos  = this.datosPerifericos.slice(0,18)
        }
        else if(this.selectMostrar === "3"){
            this.datosPerifericos  = this.datos.slice(40,58);
            this.datosPerifericos  = this.datosPerifericos .slice(0,3)
        }
        else if(this.selectMostrar === "12"){
            this.datosPerifericos  = this.datos.slice(40,58);
            this.datosPerifericos  = this.datosPerifericos .slice(0,12)
        }
    }
    },
    created() {  // created() se ejecuta cada vez que se crea el objeto VUE
        this.fetchData(this.url)
    }
}).mount('#app')





