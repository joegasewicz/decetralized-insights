import HDWalletProvider from "@truffle/hdwallet-provider";

export class OrgProvider {
    private readonly secretPhrase: string;
    protected readonly apiURL: string;
    public readonly provider: HDWalletProvider;

    constructor(secretPhrase: string, apiURL: string) {
        this.secretPhrase = secretPhrase;
        this.apiURL = apiURL;
        this.provider = this.createProviderInstance();
    }

    private createProviderInstance() {
        return new HDWalletProvider(this.secretPhrase, this.apiURL);
    }

    public getProvider(): HDWalletProvider {
        return this.provider;
    }
}
