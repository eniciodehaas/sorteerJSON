// keuze sorteerkenmerk
let kenmerk = document.getElementById('kenmerk');
kenmerk.addEventListener('change', (e) => {
    sorteerObject.sorteerkenmerk = e.target.value;
    sorteerObject.sorteren();
})
// JSON importeren
let xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        sorteerObject.data = JSON.parse(this.responseText);
        sorteerObject.sorteren();
    } 
}
xmlhttp.open('GET', "boeken.json", true);
xmlhttp.send();


const maakTabelKop = (arr) => {
    let kop = "<table class='boeken'><tr>";
    arr.forEach((item) => {
        kop += "<th class='boeken__kop'>" + item + "</th>";
    });
    kop += "</tr>";
    return kop;
}

const maakTabelRij = (arr, accent) => {
    let rij = ""
    if(accent == true) {
        rij = "<tr class='boeken__rij--accent'>";
    } else {
        rij = "<tr class='boeken__rij'>"
    }
    arr.forEach((item) => {
        rij += "<td class='boeken__cel'>" + item + "</td>";
    });
    rij += "</tr>";
    return rij;
}


// maak object dat de boeken uitvoert en sorteert en data bevat
// eigenschappen: data en sorteerkenmerk
// methods: sorteren() en uitvoeren()
let sorteerObject = {
    data: "",

    sorteerkenmerk: "titel",

    sorteren: function() {
        this.data.sort( (a,b) => a[this.sorteerkenmerk] > b[this.sorteerkenmerk] ? 1 : -1 );
        this.uitvoeren(this.data);
    },

    uitvoeren: function(data) {
        let uitvoer = maakTabelKop(
            ["titel", 
            "auteur(s)", 
            "cover", 
            "uitgave", 
            "bladzijdes", 
            "taal", 
            "EAN",
            "uitgever",
            "prijs"]);
        for (let i = 0; i < data.length; i++) {
            let accent = false;
            i % 2 == 0 ? accent = true : accent = false;
            let imgElement = 
            "<img src='" +
             data[i].cover + 
            "' class='boeken__cover' alt='" + 
            data[i].titel + 
            "'>";
            uitvoer += maakTabelRij(
                [data[i].titel, 
                data[i].auteur[0], 
                imgElement, 
                data[i].uitgave, 
                data[i].paginas, 
                data[i].taal, 
                data[i].ean,
                data[i].uitgever,
                data[i].prijs], accent,
                );
        }
        document.getElementById('uitvoer').innerHTML = uitvoer;
    }
}