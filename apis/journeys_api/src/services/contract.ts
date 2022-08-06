import byteData from "../../bin.json";

export class Contract {

    _bytecode: any;
    _abi: any;
    _output = byteData;

    set bytecode(val: any) {
        this._bytecode = val;
    }

    get bytecode() {
        return this._bytecode;
    }

    set abi(val: any) {
        this._abi = val;
    }

    get abi() {
        return this._abi;
    }

    public compile(): void {
        this.abi = this._output.contracts["organisation.sol"].Organisation.abi;
        this.bytecode = this._output.contracts["organisation.sol"].Organisation.evm.bytecode.object;
    }

}
