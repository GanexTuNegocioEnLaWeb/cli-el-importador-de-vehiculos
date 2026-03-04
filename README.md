falta poner la ruta para ProfilePage.tsx

## Cotización

Revisar el sistema de cotización y que funcione bien.

- que no se repitan los datos en el paso 2, si se repite, que se quite del schema y el input correspondiente
- en el paso dos, no veo la previsualización de la imagen, debo poder ver la url de la imagen o video.
- en cotización:
  - debe estar pre rellenado:
    - documentación de ingreso: 700
    - comisión al asesor: 500
    - factura del taller: 100
    - dolar oficial: 6.97
  - el total debe ser promediado
  - los datos absolutos o los que tienen datos por defectos, tienen que poder ser editable en su propia sección de datos con valores por defecto que debe estar abajo, los datos que debe rellenar el asesor debe estar arriba.
  - si el asesor modificó los datos por defecto, debe existir un botón para volver a los valores por defecto.
  - el fees o impuesto de subasta se calcula automático, pero se debe poder editar cuanto porcentaje, por defecto debe estar en 13% del remate.
  - la trasnferencia a USA se calcula automático, pero se debe poder editar el porcentaje, por defecto es 4% (se calcula sumando el fees con el total del remate y el resultado, sacar el 4%)
  - si se cambia de paso, los datos que puso el asesor o modificó deben persistir
  - al finalizar el resumen y finalizar, que lo redirija a la página de cotizaciones.

## Vehículos

debo poder ver la lista de vehículos con datos importantes en la lista, como quien lo creó, en que estado está (en subasta, subasta perdida, en logística, vendido), y datos que pueden ser importantes ver a primera en las filas de la tabla.

- los filtros lo veo innecesario, quitalos, solo deja el buscador.
- lo veo innecesario la función de seleccionar items, quita eso.
- que en vez de download, diga cotizar, y cree una nueva cotización del auto

- que la vista de detalle de vehículo se vea bien todos los datos del auto junto a su historial de todas las cotizaciones que tuvo y a los clientes a los que se le envió la cotización

## Prospectos

debo poder ver una tabla con buscador y sin flitros, donde pueda ver a los prospectos, un botón para crear nuevo prospecto.

en la vista de crear prospecto, se debe rellenar:

- nombre completo
- teléfono
- luego en opcionales, o detalles avanzados
- fuente (facebook, tiktok, en persona, etc.)
- edad (gacias a su edad, se sabe de que generación es)
- dirección
- correo

y en la vista de detalle de prospecto, debe haber sus datos completos, los autos que se le ofreció, y el historial o seguimiento que se le hizo a ese prospecto, por ejemplo, que le escribió por whatsapp y no generó conversación y luego otro que si genero y quedaron cita para tal fecha, etc.

en las opciones, se debe poder cambiar de prospecto a cliente cuando se cerró una venta de mínimo un vehículo con ese prospecto

no se puede eliminar el registro de un prospecto

## Clientes

los clientes son anteriores prospectos, solo cambia de título y se lo pone en esa vista por que son clientes, luego más de lo mismo

no se puede eliminar un cliente, se lo puede editar, pero no eliminar.

el detalle de prospecto es lo mismo que del cliente, solo cambia el título.

## cotizaciones

Aquí se ven todas las cotizaciones que se hizo a cada auto, y si una cotización se le asignó a un cliente o no.

no se puede editar una cotización, solo se puede ver el detalle.

se puede exportar la cotización como imagen o como pdf.

al momento de crear una nueva cotización, igual es por pasos, primero se selecciona que vehículo (solo los que están en estado de subasta), luego en el segundo paso se usa lo mismo que en el 3er paso al momento de crear un auto, que es cotizar, solo que como ya están pre rellenados los datos del auto, solo se pone los datos de cotización y antes de guardar cotización, es obligado a seleccionar un cliente, para asignar cotización a ese cliente y después de guardarlo, puede exportarlo como imagen o como pdf.

## Usuarios

en nuevo usuario, igual es por pasos, primero se selecciona que tipo de usuario quiere agregar (asesor o administrador), luego genera el link de invitación.

en la sección de ver usuarios, se puede ver a todos los usaurios registrados y su rol que tienen, y se puede ver detalles, pero no se puede editar los datos de ningún otro usuario que no sea el actual.

## Profile

en el perfil actual, el usuario puede modificar sus datos:

- nombre completo
- su biografía
- sus redes sociales (facebook, instagram, tiktok, correo, teléfono)

---

debo crear el módulo auth y la parte pública y separarla de la parte privada. conectando la base de datos y modelando la base de datos.

debo crear el módulo de busqueda global.

debo definir que habrá en la parte pública.

{
"success": true,
"data": {
"metadata": {
"viewport": "width=device-width, initial-scale=1.0",
"theme-color": "#ffffff",
"description": "Copart connects global buyers and sellers online. Browse over 400,000 cars, motorcycles, trucks, industrial, agricultural equipment and more – 4 million successful transactions each year.",
"title": "Online Car Auctions – Used, Salvage & Wholesale Vehicles",
"apple-itunes-app": "app-id=414275302",
"facebook-domain-verification": "wy1d6yp8jynig5rnj0z5stfa0o81h0",
"msapplication-TileColor": "#ffffff",
"yandex-verification": "110e9e21b4756bfd",
"msapplication-config": "/images/browserconfig.xml",
"language": "en",
"fragment": "!",
"format-detection": "telephone=no",
"scrapeId": "019c8335-5399-74dd-968c-f39abf06799f",
"sourceURL": "https://www.copart.com/lot/96244295/clean-title-2015-mazda-6-sport-fl-west-palm-beach",
"url": "https://www.copart.com/lot/96244295/clean-title-2015-mazda-6-sport-fl-west-palm-beach",
"statusCode": 200,
"contentType": "text/html;charset=UTF-8",
"proxyUsed": "basic",
"cacheState": "hit",
"cachedAt": "2026-02-22T01:18:04.562Z",
"creditsUsed": 5,
"concurrencyLimited": false
},
"json": {
"copart_vehicle_details": {
"year_make_model": "2015 MAZDA 6 SPORT",
"run_and_drive": "Run and Drive",
"vin": "JM1GJ1U50F1**\***",
"lot_number": "96244295",
"lane_item": "B/2321",
"sale_name": "FL - WEST PALM BEACH",
"location": "FL - WEST PALM BEACH",
"engine_starts": "Copart verified that the engine starts.",
"transmission_engages": "Copart verified that the transmission engages.",
"title_code": "FL - Cert Of Title-rebuilt",
"odometer": "156,896 mi",
"odometer_status": "Not Actual",
"primary_damage": "Minor Dent/scratches",
"cylinders": "4",
"color": "Blue",
"has_key": "Yes",
"engine_type": "2.5L 4",
"transmission": "Automatic",
"vehicle_type": "Automobile",
"drivetrain": "Front-wheel Drive",
"fuel": "Gas",
"body_style": "Sedan 4d",
"sale_date": "Tue. Feb 24, 2026 10:00 AM EST",
"highlights": "Run and Drive",
"notes": "There are no notes for this lot",
"current_bid": "$1,700",
"auction_countdown": "2D 13H 41min",
"minimum_bid": "Seller reserve not yet met",
"max_bid": "Monster bid",
"bidding_increment": "$50",
"high_resolution_image_urls": [
"https://cs.copart.com/v1/AUTH_svc.pdoc00001/ids-c-prod-lpp/1225/2581ea2f53224ecda23b86a1aaf66231_hrs.jpg",
"https://cs.copart.com/v1/AUTH_svc.pdoc00001/ids-c-prod-lpp/1225/2581ea2f53224ecda23b86a1aaf66231_thb.jpg",
"https://cs.copart.com/v1/AUTH_svc.pdoc00001/ids-c-prod-lpp/1225/d4257c84ba5143c082e87a6b50cd18fa_thb.jpg",
"https://cs.copart.com/v1/AUTH_svc.pdoc00001/ids-c-prod-lpp/1225/18062486a01740aea8cef14ef4213d1e_thb.jpg",
"https://cs.copart.com/v1/AUTH_svc.pdoc00001/ids-c-prod-lpp/1225/0cea3830b5f7412cb44b3709ac44c09c_thb.jpg",
"https://cs.copart.com/v1/AUTH_svc.pdoc00001/ids-c-prod-lpp/1225/f767ceb0516c406f8280f161d00415c5_thb.jpg",
"https://cs.copart.com/v1/AUTH_svc.pdoc00001/ids-c-prod-lpp/1225/8bbd54545bac41c9af0588eb707ef1b1_thb.jpg",
"https://cs.copart.com/v1/AUTH_svc.pdoc00001/ids-c-prod-lpp/1225/316ec65f7499457c81cd4249718461d6_thb.jpg",
"https://cs.copart.com/v1/AUTH_svc.pdoc00001/ids-c-prod-lpp/1225/cc0bdc7522934d41b548329cc0f55e80_thb.jpg",
"https://cs.copart.com/v1/AUTH_svc.pdoc00001/ids-c-prod-lpp/1225/624b422cb5a44979ae8e202f46d2874c_thb.jpg",
"https://cs.copart.com/v1/AUTH_svc.pdoc00001/ids-c-prod-lpp/1225/4894858ac3df4b038f9b1960a3b7f2ca_thb.jpg",
"https://cs.copart.com/v1/AUTH_svc.pdoc00001/ids-c-prod-lpp/1225/2f91bbe256854e3798368c44766128c5_thb.jpg",
"https://cs.copart.com/v1/AUTH_svc.pdoc00001/ids-c-prod-lpp/1225/3d4ffdabbb8a4a2bbf9c79beb81427e8_vthb.jpg"
],
"video_urls": []
}
}
}
}
