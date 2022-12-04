<style scoped>
.layout {
    /* border: 1px solid #d7dde4; */
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    width: 100%;
    text-align: center;
}

.layout-content-center {
    display: inline-block;

    margin-top: 3%;

    min-width: 600px;
}
</style>
<template>
    <div>
        <WalletPanel ref="wallet" :onAccountChanged="onAccountChanged" />
        <div class="layout">
            <div class="layout-content-center">
                <div>
                    <div>
                        <h2 style="text-align: center; margin-bottom: 20px;">Trigger3</h2>
                        <Radio-group v-model="modelFunc">
                            <Radio label="send">触发</Radio>
                            <Radio label="call">查询</Radio>
                        </Radio-group>
                        <span v-show="scriptFileName !== ''" style="margin-right: 8px;">|</span>
                        <Radio-group v-show="scriptFileName !== ''" v-model="modelExecute">
                            <Radio label="auto">自动</Radio>
                            <Radio label="hand">手动</Radio>
                        </Radio-group>
                        <Select v-model="modelMethod" style="margin-top: 20px;" @on-change="onSelectMethod">
                            <Option v-for="item in abiList" :value="item" :key="item">{{ item }}</Option>
                        </Select>
                        <Input v-model="modelAddres" type="text" style="margin-top: 20px;" placeholder="输入合约地址"><span
                            slot="prepend">Contract</span></Input>
                        <Input v-model="modelTypes" type="text" readonly style="margin-top: 20px;"><span
                            slot="prepend">TypeList</span></Input>
                        <Input v-model="modelParams" type="text" style="margin-top: 20px;"
                            placeholder="输入函数调用参数, json字符串"><span slot="prepend">Params</span></Input>
                        <Input v-model="modelResult" type="text" readonly style="margin-top: 20px;"><span
                            slot="prepend">Result</span><span slot="append">当前流程: {{workIndex}}</span></Input>
                        <!-- <Input v-model="modelResult" type="text" readonly style="margin-top: 20px;"><span
                            slot="prepend">Result</span><span slot="append">{{scriptFileName === '' ?
                            '---':executeResult[modelMethod]}}</span></Input> -->
                        <Button :disabled="executing" @click="web3Execute()" type="primary" style="margin-top: 20px;">Execute</Button>
                        <Upload type="drag" multiple :before-upload="onUploadBefore" action="/" style="margin-top: 20px">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p>点击或将ABI文件拖拽到这里上传</p>
                            </div>
                            <span v-if="fileName !== ''" style="color:green;">{{ fileName + '.json' }}</span>
                        </Upload>
                        <Upload type="drag" :before-upload="onUploadBeforeForTest" action="/" style="margin-top: 20px">
                            <div style="padding: 20px 0">
                                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                <p>点击或将批处理json文件拖拽到这里上传</p>
                            </div>
                            <span v-if="scriptFileName !== ''" style="color:green;">{{ scriptFileName }}</span>
                        </Upload>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import WalletPanel from './wallet.vue';
import Web3 from "web3";
export default {
    components: {
        WalletPanel
    },
    inject: ["reload"],
    data() {
        return {
            network: '',
            connect: false,
            walletAddress: '',

            modelAddres: '',
            modelMethod: '',
            modelParams: '',
            modelResult: '',
            modelFunc: 'send',
            modelExecute: 'auto',
            modelTypes: '',
            inputTypes: {},
            executing: false,

            workIndex: 0,
            abiList: [],
            abiMap: {},
            scriptMap: {},
            fileName: '',
            scriptFileName: '',
            executeResult: {}
        }
    },
    mounted: function () {
    },
    methods: {
        onSelectMethod(item) {
            this.modelTypes = this.inputTypes[item] === '' || this.inputTypes[item] === undefined ? '无' : this.inputTypes[item];
            if (this.scriptFileName === '') return;
            this.modelAddres = this.scriptMap[item]['contract'];
            this.modelFunc = this.scriptMap[item]['kind'];

            let modelParams = this.scriptMap[item]['params'];
            console.log('before parse modelParams: ', modelParams);
            if (this.executeResult[this.modelAddres] !== undefined && this.executeResult[this.modelAddres] !== null) this.modelAddres = this.executeResult[this.modelAddres];
            if (modelParams.length > 0) {
                modelParams.forEach((element, index) => {
                    if (element + '' === "walletAddress") modelParams[index] = this.walletAddress;
                    else if (this.executeResult[element + ''] !== undefined) {
                        modelParams[index] = this.executeResult[element];
                    }
                })
                this.modelParams = JSON.stringify(modelParams);
            } else {
                this.modelParams = '';
            }
            console.log('after parse modelParams: ', this.modelParams);
        },
        onAccountChanged(action, network, address) {
            if (action === 'connect') {
                this.network = network;
                this.connect = true;
                this.modelAuthID = address;
                this.walletAddress = address;
            } else if (action === 'disconnect') {
                this.network = '';
                this.connect = false;
                this.walletAddress = '';
            }
        },
        onUploadBefore(file) {
            let exceededNum = file.name.lastIndexOf(".");
            let exceededStr = file.name.substring(exceededNum + 1, file.name.length).trim();
            if (exceededStr != "json") {
                this.$Notice.warning({
                    title: '文件格式错误',
                    desc: file.name + '文件格式不正确, 请选择ABI文件'
                });
                return false;
            }
            this.fileName = file.name.split('.')[0];
            this.parseABI(file);
            return false
        },
        onUploadBeforeForTest(file) {
            if (this.abiList.length === 0) {
                this.$Notice.warning({
                    title: '操作异常',
                    desc: '请先上传ABI文件'
                });
                return false;
            }
            let exceededNum = file.name.lastIndexOf(".");
            let exceededStr = file.name.substring(exceededNum + 1, file.name.length).trim();
            if (exceededStr != "json") {
                this.$Notice.warning({
                    title: '文件格式错误',
                    desc: file.name + '文件格式不正确, 请选择json文件'
                });
                return false;
            }
            this.scriptFileName = file.name;
            this.parseTest(file);
            return false
        },
        parseTest(file) {
            const reader = new FileReader()
            reader.readAsText(file)
            let self = this;
            reader.onload = function () {
                if (reader.result) {
                    self.abiList = [];
                    self.scriptMap = JSON.parse(reader.result);
                    Object.keys(self.scriptMap).forEach(function (k) {
                        self.abiList.push(k);
                    })
                    console.log(self.scriptFileName, self.scriptMap);
                }
            }
        },
        parseABI(file) {
            const reader = new FileReader()
            reader.readAsText(file)
            let self = this;
            let abiMap = [];
            reader.onload = function () {
                if (reader.result) {
                    abiMap = JSON.parse(reader.result);
                    self.abiList = [];
                    abiMap.forEach(element => {
                        if (element.name !== undefined && element.name !== '' && self.abiList.indexOf(element.name) < 0) {
                            self.abiList.push(element.name);
                            let inputTypes = [];
                            element.inputs.forEach((inputsEle => {
                                inputTypes.push(' ' + inputsEle.internalType);
                            }))
                            self.inputTypes[element.name] = inputTypes + ''//JSON.stringify(inputTypes);
                        }
                    })
                    self.abiMap[file.name.split('.')[0]] = abiMap;
                    console.log(file.name.split('.')[0], abiMap)
                }
            }
        },
        getAbiMap() {
            if (this.modelMethod.indexOf('.') >= 0) return this.abiMap[this.modelMethod.split('.')[0]];
            return this.abiMap[this.fileName];
        },
        getAbiMethod() {
            if (this.modelMethod.indexOf('.') >= 0) {
                let method = this.modelMethod.split('.')[1];
                if (method.indexOf('_') >= 0) return method.split('_')[0];
                return method;
            }
            return this.modelMethod;
        },
        web3Execute() {
            if (this.scriptFileName === '' || this.modelExecute !== 'auto') {
                this.doWeb3Execute();
            } else {
                this.modelMethod = '';
                this.doSwitchMethod();
                this.doWeb3Execute();
            }
        },
        doSwitchMethod() {
            console.log('doAutoExecute start: ===>')
            if (this.scriptFileName === '') return;

            let self = this;
            if (self.modelMethod !== '') console.log('before doAutoExecute: ', self.modelMethod, self.scriptMap[self.modelMethod])
            for (let k in self.scriptMap) {
                if (k === self.modelMethod) continue;
                if (self.modelMethod !== '' && self.scriptMap[k]['index'] - self.scriptMap[self.modelMethod]['index'] !== 1) continue;
                console.log('doAutoExecute: ', self.modelMethod, k, self.scriptMap[k]);
                self.workIndex = self.scriptMap[k]['index'];
                self.modelMethod = k;
                self.onSelectMethod(k);
                break;
            }
            if (self.modelMethod !== '') console.log('after doAutoExecute: ', self.modelMethod, self.scriptMap[self.modelMethod])
        },
        doWeb3Execute() {
            if (this.modelMethod === '' || this.modelAddres === '') {
                this.$Message.error('参数异常, 无效操作');
                return;
            }

            let self = this;
            let jsonParams = this.parseParams(this.modelMethod, this.modelParams);

            console.log('before web3 execute: ', this.modelAddres, this.modelFunc, this.getAbiMap(), this.getAbiMethod(), jsonParams)

            this.executing = true;
            const from = this.walletAddress;
            const web3Method = this.$refs.wallet.Execute;
            web3Method(this.modelFunc, this.getAbiMap(), this.modelAddres, this.getAbiMethod(), from, jsonParams, function (result) {
                self.$Message.success('web3Execute response succesed');
                let callResult = result + '';
                if (self.modelFunc === 'call' && callResult.indexOf('blockHash') === -1) {
                    callResult = '';
                    self.modelResult = result + '';
                    self.executeResult[self.modelMethod] = result;
                }
                else if (self.modelFunc === 'send') {
                    callResult = '';
                    self.modelResult = JSON.stringify(result);
                }
                if (callResult === '' && self.scriptMap[self.modelMethod] !== undefined && self.scriptMap[self.modelMethod] !== null) 
                {
                    self.doSwitchMethod();
                    if (self.modelExecute === 'auto') self.doWeb3Execute();
                }
                self.executing = false;
                console.log('web3 execute succesed: ', self.modelResult);
            }, function (err) {
                self.executing = false;
                self.$Message.error(err);
                self.modelExecute = 'hand';
                self.executeResult[self.modelMethod] = undefined;
            });
        },
        parseParams(modelMethod, strParams) {
            let self = this;
            if (strParams === '') return [];
            let method = this.getAbiMethod();
            let jsonParams = JSON.parse(strParams);
            this.getAbiMap().forEach(abiJson => {
                if (abiJson['name'] !== method) return;
                if (abiJson['inputs'] === undefined) return;
                let handleFunc = function(arr, jsonArr) {
                    let transFunc = function(element, index, inputVal){
                        console.log('type transfer before: ', index, inputVal[index])
                        // if (element['type'] === 'uint8' || element['type'] === 'uint') return parseInt(inputVal[index] + '');
                        //else if (element['type'] === 'address') return self.$refs.wallet.getWeb3().utils.toChecksumAddress(inputVal[index]);
                        if (element['type'].indexOf('uint256') >= 0 && inputVal[index]['BN'] !== undefined) {
                            return Web3.utils.toBN(Web3.utils.toWei(inputVal[index]['BN'] + '', 'ether'));
                        }
                        else if (element['type'].indexOf('bytes') >= 0) return Web3.utils.hexToBytes(inputVal[index] + '');
                        return inputVal[index];
                    }
                    arr.forEach((element, index) => {
                        if (index >= jsonArr.length) return;
                        if (element['type'].indexOf('[]') > 0) {
                            let arrParams = [];
                            jsonArr[index].forEach((jelement, jindex) => {
                                arrParams.push(transFunc(element, jindex, jsonArr[index]))
                            })
                            jsonArr[index] = arrParams;
                        } else {
                            jsonArr[index] = transFunc(element, index, jsonArr);
                        }
                        console.log('type transfer after: ', index, jsonArr[index])
                    })
                    return jsonArr;
                }
                jsonParams = handleFunc(abiJson['inputs'], jsonParams);
            })
            return jsonParams;
        }
    }
}
</script>