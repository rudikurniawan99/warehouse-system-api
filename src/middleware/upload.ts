import multer from 'multer'

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images')
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}-${file.originalname.trim().toLowerCase()}`)
  }
})

const upload = multer({ storage: diskStorage })
export default upload