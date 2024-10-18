import React, { useEffect, useState } from "react";
import Accordion from "../components/base/Accordion";
import AccordionHeader from "../components/base/AccordionHeader";
import Button from "../components/base/Button";
import Card from "../components/base/Card";
import Checkbox from "../components/base/Checkbox";
import Image from "../components/base/Image";
import Select from "../components/base/Select";
import TextInput from "../components/base/TextInput";
import { Colors } from "../constants/Colors";
import { AiOutlineSearch } from "react-icons/ai";
import Header from "../components/Header";
import { useEthers, useEtherBalance } from "@usedapp/core";

const Create = () => {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);
  const [nftDetails, setNftDetails] = useState({
    name: "",
    description: "",
    category: "",
    termsAgreed: false,
    file: null,
  });

  useEffect(() => {
    activateBrowserWallet();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNftDetails({
      ...nftDetails,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileUpload = (e) => {
    setNftDetails({ ...nftDetails, file: e.target.files[0] });
  };

  const handleSubmit = () => {
    if (!nftDetails.termsAgreed) {
      alert("Please agree to the terms.");
      return;
    }
    console.log("Minting NFT:", nftDetails);
    // NFT minting logic will be added here using smart contract calls
  };

  return (
    <>
      <Header />
      <Card style={{ backgroundColor: Colors.light, margin: "20px", padding: "30px" }}>
        <h2>Create Your NFT</h2>

        <Accordion>
          <AccordionHeader title="NFT Details" />
          <div style={{ padding: "10px" }}>
            <TextInput 
              name="name" 
              placeholder="NFT Name" 
              value={nftDetails.name} 
              onChange={handleChange} 
            />
            <TextInput 
              name="description" 
              placeholder="Description" 
              value={nftDetails.description} 
              onChange={handleChange} 
            />
            <Select
              name="category"
              options={[
                { label: "Art", value: "art" },
                { label: "Music", value: "music" },
                { label: "Collectible", value: "collectible" },
              ]}
              value={nftDetails.category}
              onChange={handleChange}
            />
            <Checkbox 
              name="termsAgreed" 
              label="Agree to Terms" 
              checked={nftDetails.termsAgreed} 
              onChange={handleChange} 
            />
          </div>
        </Accordion>

        <div style={{ marginTop: "20px" }}>
          <AccordionHeader title="Upload Asset" />
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
            <input type="file" onChange={handleFileUpload} />
            {nftDetails.file && (
              <Image 
                src={URL.createObjectURL(nftDetails.file)} 
                alt="NFT Preview" 
                width="100px" 
              />
            )}
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <AccordionHeader title="Search for Assets" />
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
            <AiOutlineSearch size={20} />
            <TextInput placeholder="Search NFTs..." />
            <Button>Search</Button>
          </div>
        </div>

        <Button 
          style={{ marginTop: "30px", backgroundColor: Colors.primary }} 
          onClick={handleSubmit}
        >
          Mint NFT
        </Button>

        <div style={{ marginTop: "20px", color: Colors.secondary }}>
          {account ? (
            <p>Connected Wallet: {account}</p>
          ) : (
            <p>Please connect your wallet to proceed.</p>
          )}
          {etherBalance && (
            <p>Balance: {parseFloat(etherBalance.toString()).toFixed(4)} ETH</p>
          )}
        </div>
      </Card>
    </>
  );
};

export default Create;