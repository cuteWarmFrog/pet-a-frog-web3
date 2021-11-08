const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
  const waveContract = await waveContractFactory.deploy();
  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  let petCount;
  petCount = await waveContract.getTotalPets();
  
  let waveTxn = await waveContract.petAFrog();
  await waveTxn.wait();

  petCount = await waveContract.getTotalPets();

  waveTxn = await waveContract.connect(randomPerson).petAFrog();
  await waveTxn.wait();

  petCount = await waveContract.getTotalPets();
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();