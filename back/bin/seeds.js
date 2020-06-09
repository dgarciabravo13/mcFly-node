  
const { withDbConnection, dropIfExists } = require("../lib/withDbConnection");
const User = require("../models/user");
const Note = require("../models/note");

withDbConnection(async () => {
  // USERS
  await dropIfExists(User);
  await User.deleteMany();
  await User.create([
    {
      username: "David",
      password: "1234",
      notesFavourites:[],
      notesCreated: [],
    },
    {
      username: "Carballo",
      password: "1234",
      notesFavourites:[],
      notesCreated: [],
    },
    {
      username: "Miguel",
      password: "1234",
      notesFavourites:[],
      notesCreated: [],
    },


  ]);
  console.log(">>> Users Created");
  // ARTICLES
  await dropIfExists(Note);
  await Note.deleteMany();
  await Note.create([
    {
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tortor mauris, aliquam sed aliquam blandit, elementum et lacus. Praesent eu volutpat ex. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin auctor dapibus viverra. Proin non dictum ante. Sed finibus ornare ex, eget pulvinar metus facilisis eu. Curabitur sed odio odio. Cras malesuada nunc justo, at cursus nibh feugiat sed. Praesent ut libero dolor. Aliquam quis pulvinar leo. Nunc quis auctor lectus. Donec pharetra tristique aliquam. Maecenas venenatis scelerisque orci, eget tincidunt nulla feugiat quis.",
    },
    {
      text:
        "Nintendo Switch ha sufrido un intento de hackeo masivo que podríamos catalogar como exitoso tras la información que acaba de compartir Nintendo. La compañía ha informado que más de 160.000 cuentas se han visto afectadas por este suceso.",
    },
    {
      text:
        "Red Dead Redemption 2, el último título de Rockstar Games, llegará al catálogo de tarifa plana de Microsoft el próximo 7 de mayo. Según ha confirmado Xbox, el lanzamiento incluye el contenido adicional del Modo Historia, el Modo Foto con todas las funciones y acceso gratuito a Red Dead Online. ",
    },
  ]);
  console.log(">>> Notes Created");

});