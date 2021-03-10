 function inserisciX (cella) {

    if (cella.content == "" && self.toccaAllaX == true) {
        cella.content = "X";
        this.toccaAllaX = false;
    }
}