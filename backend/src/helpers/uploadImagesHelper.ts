import multer from "multer";


const storage = multer.diskStorage({
     destination: function (req, file, cb)
     {
          cb(null, "./public/images");
     },
     filename: function (req: any, file, cb)
     {
          cb(null, `user-${req.session.userid}`);
     }
})

const fileFilter = (req: any, file: any, cb: any) => {
     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/))
     {
          return cb(new Error('Arquivo inválido. Por favor, envie uma imagem.'));
     }

     cb(null, true);
}

const upload = multer({ storage: storage, fileFilter: fileFilter});

export default upload;