const StorageSystem = artifacts.require('./StorageSystem.sol')

require('chai').use(require('chai-as-promised')).should()

contract('StorageSystem', ([deployer,uploader]) => {
    let dss, result, totalFiles;
    const fileHash = 'JJJJJJJJJJJJJJJJJJJJ'
    const fileType = 'fileType'
    const fileName = 'fileName'
    const fileDescription = 'description'
    const fileSize = 1

    before(async() => {
        dss = await StorageSystem.deployed();
    })

    describe('Testing StorageSystem contract...', () => {
        describe('Success...', () => {
            it('Checking deployement...', async() => {
                const address = await dss.address;
                expect(address).to.not.equal(0x0)
                expect(address).to.not.equal('')
                expect(address).to.not.equal(null)
                expect(address).to.not.equal(undefined)
            })
            before(async() => {
                result = await dss.addingFile(fileName, fileHash, fileType, fileDescription, fileSize, {from: uploader})
                totalFiles = await dss.totalFiles()
            })
            it('Testing Uploading File...', async() => {
                const log = result.logs[0].args
                expect(Number(log.fileId)).to.be.eq(Number(totalFiles))
                expect(log.fileName).to.be.eq(fileName)
                expect(log.fileHash).to.be.eq(fileHash)
                expect(log.fileType).to.be.eq(fileType)
                expect(log.fileDescription).to.be.eq(fileDescription)
                expect(log.uploader).to.be.eq(uploader)
                expect(Number(log.fileSize)).to.be.eq(fileSize)
                expect(Number(totalFiles)).to.be.eq(1)
            })
            it('Testing the file struct...', async() => {
                const files = await dss.files(totalFiles)
                expect(Number(files.fileId)).to.be.eq(Number(totalFiles))
                expect(files.fileName).to.be.eq(fileName)
                expect(files.fileHash).to.be.eq(fileHash)
                expect(files.fileType).to.be.eq(fileType)
                expect(files.fileDescription).to.be.eq(fileDescription)
                expect(Number(files.fileSize)).to.be.eq(fileSize)
                expect(files.uploader).to.be.eq(uploader)
            })
        })
        describe('Failure...', () => {
            it('Testing when fileHash is empty...', async() => {
                await dss.addingFile(fileName, '', fileType, fileDescription, fileSize, {from: uploader}).should.be.rejectedWith(Error);
            })
            it('Testing when fileName is empty...', async() => {
                await dss.addingFile('', fileHash, fileType, fileDescription, fileSize, {from: uploader}).should.be.rejectedWith(Error);
            })
            it('Testing when fileDescription is empty...', async() => {
                await dss.addingFile(fileName, fileHash, fileType, '', fileSize, {from: uploader}).should.be.rejectedWith(Error);
            })
            it('Testing when fileType is empty...', async() => {
                await dss.addingFile(fileName, fileHash, '', fileDescription, fileSize, {from: uploader}).should.be.rejectedWith(Error);
            })
            it('Testing when fileSize is empty...', async() => {
                await dss.addingFile(fileName, fileHash, fileType, fileDescription, '', {from: uploader}).should.be.rejectedWith(Error);
            })
        })
    })
})