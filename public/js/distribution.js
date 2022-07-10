function distribution(f, n){
    this.set = {
        boxNode: "#box",
        dragNode: '.' + n,
        blockW: 50,
        blockH: 30,
        block: "(18,18)",
        startPos: "(1,1)"
    };
    jQuery.extend(this.set, b);
    this.startX = this.set.startPos.substring(3, 4);
    this.startY = this.set.startPos.substring(1, 2);
    this.row = this.set.block.match(/\d+(\.\d+)?/g)[0];
    this.col = this.set.block.match(/\d+(\.\d+)?/g)[1];
    if (this.startY > this.row || this.startX > this.col) {
        this.startX = 1;
        this.startY = 1;
    }
};

//fill the block with color
function fillColor(b, c){

}
