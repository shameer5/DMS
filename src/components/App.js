import DSS from '../abis/StorageSystem.json'
import React, {useEffect, useState} from 'react';
import './App.css';
import Form from './Form/Form'
import Web3 from 'web3'
import Content from './Content/Content'

const create = require('ipfs-http-client');
const ipfs = create({host: 'ipfs.infura.io', port: 5001, protocol:'https'});

const App = () => {
  const [account, setAccount] = useState();
  const [dss, setDss] = useState({});
  const [viewFile, setViewFile] = useState([])
  const [file, setFile] = useState({
    name: 'Select a file...',
    size: null,
    type: '',
    description: ''
  });
  const [active, setActive] = useState(false);

  useEffect(()=> {
    getWeb3()
  },[])

  useEffect(()=> {
    getBlockChain()
  },[account])

  const getWeb3 = async() => {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      console.log("ethereum...")
    }
    else if (window.web3)
    {
      window.web3 = new Web3(window.web3.currentProvider)
      console.log("web3...")
    }
    else {
      console.log("CAN NOT CONNECT....")
    }
  }

  const getBlockChain = async() => {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
    const netId = await web3.eth.net.getId()
    /* Each network details are stored in their respective network id*/
    const netData = DSS.networks[netId]
    if(netData)
    { 
      const dss = new web3.eth.Contract(DSS.abi,netData.address)
      setDss(dss)
      if(account !== undefined )
      {
        blockChainFiles(dss);
      }
    }
    else {
      window.alert(`The DSS contact isn't available in the network`)
    }
  }

  const blockChainFiles = async (dss) => {
    console.log(dss)
    const totalFiles = await dss.methods.totalFiles().call();
    for( let index = totalFiles; index>=1; index--)
    {
      const file = await dss.methods.files(index).call();
      setViewFile(viewFile => [...viewFile, file])
    }
  }

  const fileUpload = async (data) => {
    console.log('Uploading files...')
    try{
      const value = await ipfs.add(data)
      const result = value[0]
      console.log('File added to IPFS...')
      console.log('Adding File to the blockchain...')
      dss.methods.addingFile(file.name, result.hash, file.type, file.description, file.size).send({from: account}).on('transactionHash', () => {
        setFile({
          name: 'Select a file...',
          size: null,
          type: '',
          description: ''
        })
        console.log("File Uploaded to the Blockchain...")
      }).on('error', (error)=> {
          console.log("ERROR! File not uploaded to the Blockchain...")
        })
    } catch (error)
    {
      console.log(error)
    }
  }

  return(
    <>
      <div className="m-2">
      <h1 className={`${file.name !== 'Select a file...' && !active && `filter blur`} text-2xl font-bold text-center mt-5 mb-12`}>Decentralized Storage System</h1>
      <Form file={file} setFile={setFile} account={account} active={active} setActive={setActive} fileUpload={fileUpload}/>
      {!viewFile.length ? (<div>
        <h1>first time</h1>
      </div>) : (
        <div className={`${file.name !== 'Select a file...' && !active && `filter blur`} flex flex-wrap mt-12 gap-4 md:justify-center`}>          
        {viewFile.map((oneFile) => (
          <div className='flex  flex-intial p-2 shadow-custom rounded-xl bg-green-400' key={oneFile.fileId}>
              <Content oneFile={oneFile}/>
          </div>
        ))}
        </div>
      )}
      </div>
    </>
  )
}

export default App;