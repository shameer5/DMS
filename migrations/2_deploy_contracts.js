const StorageSystem = artifacts.require("StorageSystem");

module.exports = function(deployer) {
	deployer.deploy(StorageSystem);
};
