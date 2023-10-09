import fs from 'fs';
import express from "express";
import mongoose, { mongo } from "mongoose";
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true,  
  }));

app.get(`/api/images`, async (req, res) => {
    

    try {
        const images = await Picture.find().select('fileName');

        if(!images){
            return res.status(404).send('Imagen no encontrada');
        }
        const imgNames = images.map((image) => image.fileName);

        res.json(imgNames);

    } catch (error) {
        console.error('Error al obtener nombres de archivo', error),
        res.status(500).send('Error interno del servidor');
    }
});

try {
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/scroll-infinite',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    console.log('Conexión exitosa a la BD');
} catch (error) {
    console.log(error);
}

const pictureSchema = new mongoose.Schema({
    fileName: { type: String, required: true},
})

const Picture = mongoose.model('Imagenes', pictureSchema);

const directoryPath = './img-op';

fs.readdir(directoryPath, (err, files) => {
    if(err){
        console.error('Error al leer el directorio: ', err);
    }

    const imageFiles = files.filter((file) =>{
        return /\.(jpg|jpeg|png)$/i.test(file);
    });

    imageFiles.forEach((file) => {

        Picture.findOne({fileName: file})
        .then((existingPicture) =>{
            if(!existingPicture){
                const picture = new Picture({
                    fileName: file,
                });

                picture.save()
                .then(() => {
                    console.log(`Imagen ${file} guardada exitosamente.`);
                  })
                .catch((saveErr) => {
                    console.error(`Error al guardar la imagen ${file}:`, saveErr);
                });
            } else{
                console.log(`La imagen ${file} ya existe en la base de datos`);
            }
        })            
    })
})







app.listen(3000, () => {
    console.log(`El servidor está funcionando`)
});

/*try {


    const pictureUno = new Picture({
        fileName: 'img-op'
    });

    pictureUno.save()
        .then(() => {
            console.log('Imagen guardada exitosamente.');
        })
        .catch((saveErr) => {
            console.error('Error al guardar la imagen:', saveErr);
        });

} catch (err) {
    console.log('Error al leer el archivo: ', err);
}*/