import path from 'path'
import fs from 'fs'

const removeImage = (filepath: string) => {
  console.log('filepath', filepath);
  console.log(__dirname);
   
  const deletedFilePath = path.join(__dirname, '../../public/images', filepath)
  console.log('deletedfilepath',deletedFilePath);
}

export default removeImage