<style scoped>
.nav-header-left {
    font-size: 20px;
    text-align: left;
    margin-top: 15px;
    margin-left: 10px;
}
</style>
<template>
    <div>
        <Row style="height: 60px; background-color: #ebe9e7; vertical-align: middle;">
            <Col span="12">
            <div style="text-align: left;">
                <div class="nav-header-left">
                    <Select v-model="network" style="width:90px; text-align: center;" placeholder="network"
                        @on-select="selectNetwork">
                        <Option value="mainnet">mainnet</Option>
                        <Option value="goerli">goerli</Option>
                        <Option value="kovan">rinkby</Option>
                    </Select>
                </div>
            </div>
            </Col>
            <Col span="12">
            <div style="text-align: right; margin-top: 5px;">
                <Button :disabled="network === ''" @click="!connect ? init() : uninit()" type="primary"
                    style="margin-top: 10px; margin-right: 10px;">{{!connect ? 'Connect Wallet' :
                    'Disconnect'}}</Button>
            </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import Web3 from "web3";
import Web3Modal from "web3modal";
import detectEthereumProvider from '@metamask/detect-provider';
import WalletConnectProvider from "@walletconnect/web3-provider";
export default {
    data() {
        return {
            network: '',
            connect: false,

            web3: null,
            providerOptions: {
                metamaskconnect: {
                    package: detectEthereumProvider,
                    options: {
                        infuraId: "https://" + this.network + ".infura.io/v3/cf8db3246b74481bb1289c9070156832" // required
                    }
                },
                walletconnect: {
                    package: WalletConnectProvider,
                    options: {
                        infuraId: "https://" + this.network + ".infura.io/v3/cf8db3246b74481bb1289c9070156832" // required
                    }
                }
            }
        }
    },
    mounted() {
        if (localStorage.getItem('network') !== undefined && localStorage.getItem('network') !== null) {
            this.setNetwork(localStorage.getItem('network'));
        }
    },
    methods: {
        setNetwork(network) {
            this.network = network;
            if (localStorage.getItem('wallet') !== undefined && localStorage.getItem('wallet') !== null) {
                let web3Modal = this.initWeb3Modal();
                this.initWeb3(web3Modal);
            }
        },
        selectNetwork(item) {
            this.setNetwork(item.value);
            localStorage.setItem('network', item.value);
        },
        async init() {
            let web3Modal = this.initWeb3Modal();
            await web3Modal.clearCachedProvider();
            await this.initWeb3(web3Modal);
        },
        async uninit() {
            let web3Modal = this.initWeb3Modal();
            await web3Modal.clearCachedProvider();
            this.ondisconnect();
        },
        initWeb3Modal() {
            let network = this.network;
            let providerOptions = this.providerOptions;
            const web3Modal = new Web3Modal({
                network: network, // optional
                cacheProvider: true, // optional
                providerOptions, // required
                // disableInjectedProvider: true
            });
            return web3Modal;
        },
        async initWeb3(web3Modal) {
            const provider = await web3Modal.connect();
            this.web3 = new Web3(provider);

            // check network
            let network = await this.web3.eth.net.getNetworkType();
            if (network === 'main') network = 'mainnet';
            if (network !== this.network) {
                this.$Modal.error({
                    title: 'invalid network: ' + network,
                    content: 'Please switch Ethereum network to ' + this.network,
                });
                await this.uninit();
                return;
            }

            // get accounts
            let self = this;
            const accounts = await this.web3.eth.getAccounts()
            this.onConnect(accounts[0]);

            // Subscribe to accounts change
            provider.on("accountsChanged", (accounts) => {
                console.log("accountsChanged", accounts);
                self.ondisconnect();
            });

            // Subscribe to chainId change
            provider.on("chainChanged", (chainId) => {
                console.log("chainChanged", chainId);
                self.ondisconnect();
            });

            // Subscribe to provider disconnection
            provider.on("disconnect", (error) => {
                console.log("disconnect", error);
                self.ondisconnect();
            });
        },
        onConnect(address) {
            this.connect = true;
            localStorage.setItem('wallet', address);
            this.$parent.onAccountChanged('connect', this.network, address);
        },
        ondisconnect() {
            this.web3 = null;
            this.connect = false;
            localStorage.removeItem('wallet');
            this.$parent.onAccountChanged('disconnect', this.network, '');
        },
        getWeb3() {
            return this.web3;
        },

        async Execute(executeFunc, contractABI, contractAddr, methodName, walletAddress, params, successed, failed) {
            console.log(executeFunc, contractABI, contractAddr, methodName, walletAddress, params)
            const myContract = new this.web3.eth.Contract(contractABI, contractAddr);
            let web3Func = myContract.methods[methodName];
            console.log(methodName, web3Func, myContract.methods);

            let self = this;
            let sendObject = {};
            if (params.length === 0) {
                sendObject = web3Func();
            } else {
                sendObject = web3Func(...params);
            }

            console.log('kind: ', executeFunc, 'from: ', walletAddress)

            if (executeFunc == 'call') {
                await sendObject.call({ from: walletAddress }, function (error, result) {
                    if (error) {
                        console.log("Execute failed: ", error);
                        if (failed !== undefined && failed !== null) failed(error);
                    } else {
                        console.log("Execute successed: ", result);
                        if (successed !== undefined && successed !== null) successed(result);
                    }
                })
            } else if (executeFunc == 'send') {
                const gasAmount = await sendObject.estimateGas({ from: walletAddress });
                console.log('gasLimit', gasAmount)
                await sendObject.send({ from: walletAddress, gasLimit: gasAmount })
                    .on('transactionHash', function (hash) {
                        console.log('transactionHash:', hash);
                        self.$Message.success('web3Execute run succesed: ', hash);
                    })
                    .on('confirmation', function (confirmationNumber, receipt) {
                    })
                    .on('receipt', function (receipt) {
                        console.log("Execute successed: ", receipt);
                        if (successed !== undefined && successed !== null) successed(receipt);
                    })
                    .on('error', function(error){
                        console.log("Execute failed: ", error);
                        if (failed !== undefined && failed !== null) failed(error);
                    });
            }
        },
    }
}
</script>