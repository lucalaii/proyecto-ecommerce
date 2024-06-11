import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Api Backend')
  .setDescription('API creada con Nest de mi proyecto backend (ecommerce)')
  .addBearerAuth()
  .build();
