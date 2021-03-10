function creaGriglia(sizeX, sizeY) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    for (let x = 0; x < sizeX; x++) {
        for (let y = 0; y < sizeY; y++) {
            let cella = this.creaCella(x, y);
            cella.x = x;
            cella.y = y;
            this.arrayCelle.push(cella);

        };
    };
};