function selezionaCella (x, y) {
    let myBox = null;
    arrayCelle.forEach(box => {
        if (box.X == parseInt(x) && box.Y == parseInt(y)) {
            myBox = box;
        }

    });
    return myBox;
}