const { initializeApp } = require('firebase/app');
const { getDownloadURL, getStorage, ref, uploadBytes } = require('firebase/storage');
const handleNameFile = require('../../common/handleNameFile');
const httpError = require('../../common/httpError')

const firebaseConfig = {
    apiKey: "AIzaSyAfbWeOntoRFuyKgTOknCfNoFXj1g8Bnp8",
    authDomain: "fir-web54.firebaseapp.com",
    projectId: "fir-web54",
    storageBucket: "fir-web54.appspot.com",
    messagingSenderId: "245596579435",
    appId: "1:245596579435:web:909051505e34eded37f32e"
};

const app = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(app);

const whiteList = ['png', 'jpeg', 'jpg']
const preventUploadTypeFiles = (originalname) => {
    const ext = originalname.split('.').pop();
    if (!whiteList.includes(ext)) {
        throw new httpError('not support file', 400)
    }
}

const uploadToCloud = async (req, res) => {
    const file = req.file;
    const { buffer, originalname, mimetype } = file;
    preventUploadTypeFiles(originalname)
    const imageRef = ref(firebaseStorage, handleNameFile(originalname))
    console.log(imageRef)

    const data = await uploadBytes(imageRef, buffer, {
        contentType: mimetype,
    })

    const downloadUrl = await getDownloadURL(data.ref);
    res.send({
        success: true,
        data: downloadUrl
    })
}

module.exports = uploadToCloud