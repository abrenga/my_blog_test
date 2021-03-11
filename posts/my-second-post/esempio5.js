function vincitaObliquaUno(self, sizeX) {

    let primaCellaNellaPrimaColonna = self.selezionaCella(0, 0, self.arrayCelle);

    for (x = 0; x < sizeX; x++) {

        let cella = self.selezionaCella(x, x, self.arrayCelle);
        if (cella.content == "") {
            break;
        }
        if (primaCellaNellaPrimaColonna.content !== cella.content) {
            break;
        }

        if (x == sizeX - 1) {

            alert("Ha vinto la " + cella.content);
        }
    }
}