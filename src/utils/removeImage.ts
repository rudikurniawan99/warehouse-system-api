import path from 'path'
import fs from 'fs'

const removeImage = (filepath: string) => {
  const deletedFilePath = path.join(__dirname, '../../', filepath)
  fs.unlinkSync(deletedFilePath)
}

export default removeImage