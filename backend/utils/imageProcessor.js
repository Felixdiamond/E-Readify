const fs = require('fs');


function encodeToBase64(imagePath){
  if (!imagePath){
    return { error: 'missing image path' };
  }
  try{
    const encodedImage = fs.readFileSync(imagePath, { encoding: 'base64' });
    const prefixedEncodedeImage = 'data:image/png;base64,' + encodedImage;
    return prefixedEncodedeImage;
  } catch (error){
    return error;
  }
}

module.exports = encodeToBase64;
