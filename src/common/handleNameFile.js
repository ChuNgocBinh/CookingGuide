
const builtName = (originalname) => {
    const ext = originalname.split(".").pop();
    const fileName = originalname.substring(0, originalname.indexOf(ext) - 1)
    return `${fileName}-${Date.now()}.${ext}`
}

module.exports = builtName