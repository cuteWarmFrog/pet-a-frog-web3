const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.1'),
  });
  await waveContract.deployed();

  console.log("Contract deployed to:", waveContract.address);
  console.log("Contract deployed by:", owner.address);

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  );

  let petCount;
  petCount = await waveContract.getTotalPets();
  console.log(`totalPets: ${petCount}`)

  let waveTxn = await waveContract.petAFrog("I am petting");
  await waveTxn.wait();

  waveTxn = await waveContract.petAFrog("I am petting");
  await waveTxn.wait();

  waveTxn = await waveContract.petAFrog("I am petting");
  await waveTxn.wait();

  petCount = await waveContract.getTotalPets();

  console.log(`totalPets: ${petCount}`);

  waveTxn = await waveContract.connect(randomPerson).petAFrog("another pet");
  await waveTxn.wait();

  waveTxn = await waveContract.connect(randomPerson).petAFrog("another pet");
  await waveTxn.wait();

  waveTxn = await waveContract.connect(randomPerson).petAFrog("another pet");
  await waveTxn.wait();

  petCount = await waveContract.getTotalPets();

  console.log(`totalPets: ${petCount}`);

  let allPets = await waveContract.getAllPets();
  console.log(allPets);

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log(
    'Contract balance:',
    hre.ethers.utils.formatEther(contractBalance)
  );

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