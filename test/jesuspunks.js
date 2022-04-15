const { expect } = require("chai");

describe(' jesus punks contract', () => {
    const setup = async ({maxSupply = 10000}) => {
        const  [owner] = await ethers.getSigners();
        const jesuspunks = await ethers.getContractFactory("jesuspunks");
        const deployed = await jesuspunks.deploy(maxSupply);

        return {
            owner,
            deployed,
        };
    };

    describe('deployment', () => {
        it('sets max supply to passed param', async () => {
            const maxSupply = 4000; 

            const {deployed} = await setup({ maxSupply});

            const returnedMaxSupply = await deployed.maxSupply();
            expect(maxSupply).to.equal(returnedMaxSupply);
        });
    });
    describe("minting", () => {
        it('minst a new token and assigns it to owner', async () => {
            const { owner, deployed } = await setup({});  
        
            await deployed.mint();

            const ownerOfMinted = await deployed.ownerOf(0);

            expect (ownerOfMinted).to.equal(owner.address);
        
        });

        it ('has a minting limit', async () => {
            const maxSupply = 2;

            const { deployed } = await setup({ maxSupply});
         
            //mint all
            await Promise.all([deployed.mint(), deployed.mint()]);
            

            // assert the last minting
            await expect(deployed.mint()).to.be.revertedWith(
                "no hay mas"
                );
        });
    });

    describe("tokenURI", () => {
        it('returns valid metadata', async () => {
            const { deployed } = await setup({});

            await deployed.mint();

            const tokenURI = await deployed.tokenURI(0);
            const stringifiedTokenURI = await tokenURI.toString();
            const [, base64JSON] = stringifiedTokenURI.split(
                "data:application/json;base64,"
            );
            const stringifiedMetadata = await Buffer.from(
                base64JSON,
                "base64"
                ).toString("ascii");

                const metadata = JSON.parse(stringifiedMetadata);

                expect(metadata).to.have.all.keys("name", "description", "image");
        });
    });
});