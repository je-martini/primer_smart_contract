const deploy = async () => {
    const  [deployer] = await ethers.getSigners();

    console.log(" Deploying contract with the account:", deployer.address);

    const jesuspunks = await ethers.getContractFactory("jesuspunks");
    const deployed = await jesuspunks.deploy();

    console.log(" jesus punks is deployed at: ", deployed.address);

};

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error);
        process.exit(1);
});