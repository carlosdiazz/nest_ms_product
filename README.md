# Product Microservice

## Dev

1. Instalar dependencias
2. Crear archivo `.env` basado en el `.env.template`
3. Ejecutar migracion de prisma `npx prisma migrate dev`
4. Ejecutar `npm run dev`

## Correr migraccion

Para correr Migracion `npx prisma migrate dev --name nameExample`

## PROD

Para la imagen en Producion ejecutar:
```
  docker build -f dockerfile.prod -t ms-products.
```
PRUEBA