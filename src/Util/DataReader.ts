/**
 *
 */
export default class DataReader {

    /**
     *
     */
    private readonly data : Uint8Array;

    /**
     *
     */
    private offset : number;

    /**
     *
     * @param arrayBuffer
     */
    public constructor(arrayBuffer : ArrayBuffer){
        this.data = new Uint8Array(arrayBuffer);
        this.offset = 0;
    }

    /**
     *
     */
    public readUint8(){
        return this.data[this.offset++] & 0xFF;
    }

    /**
     *
     */
    public readMultiByte(){
        let value = 0;
        let offset = this.offset;

        for(let i = 0; i<4; i++, offset++){
            value = (value << 7) | (this.data[offset] & 0x7F);
            if(!(this.data[offset] & 0x80)){
                this.offset = ++offset;
                return value;
            }
        }

        throw "Invalid integer!";
    }



}