import DataReader from "./Util/DataReader";

export default class WBMPImage {

    private readonly reader : DataReader;

    private readonly imageType : number;

    private readonly fixHeader : number;

    private readonly width : number;

    private readonly height : number;

    private canvas : HTMLCanvasElement | null;

    public constructor(data : ArrayBuffer){
        this.reader = new DataReader(data);

        this.imageType = this.reader .readMultiByte();
        this.fixHeader = this.reader .readUint8();

        this.width = this.reader.readMultiByte();
        this.height = this.reader.readMultiByte();

        this.canvas = null;
    }

    public getCanvas() : HTMLCanvasElement {
        if(!this.canvas) {
            this.canvas = this.readImage();
        }

        return this.canvas;
    }


    private readImage() : HTMLCanvasElement {
        let canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        let ctx = canvas.getContext("2d");
        if(!ctx)
            throw - 1;
        let imageData = ctx.createImageData(this.width, this.height);

        let pos = 0;
        for(let  y = 0; y<this.height; y++){
            for(let  x = 0; x<this.width;){
                let bits = this.reader.readUint8();
                for(let b =  7; b >= 0 && x<this.width; b--, x++){
                    let color = ((bits >> b) & 1) ? 255 : 0;
                    imageData.data[pos++] = color;
                    imageData.data[pos++] = color;
                    imageData.data[pos++] = color;
                    imageData.data[pos++] = 255;
                }
            }
        }

        ctx.putImageData(imageData, 0, 0);
        return canvas;
    }

}