<template>
  <div class="model-image-container">
    <!-- Imagen importada -->
    <img 
      :src="modelImage" 
      alt="ResNet60 Model Architecture"
      class="model-image"
    >
    
    <!-- Opcional: con descripción -->
    <div class="image-info">
      <h3>Arquitectura ResNet60</h3>
      <p>Diagrama del modelo de red neuronal residual de 60 capas</p>
    </div>
  </div>
</template>

<script>
// Importación directa desde la ruta proporcionada
import modelImage from '@/assets/resnet60model.png'

export default {
  name: 'ModelImage',
  data() {
    return {
      modelImage: modelImage
    }
  }
}
</script>

<style scoped>
.model-image-container {
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin: 20px 0;
  transition: transform 0.3s ease;
}

.model-image-container:hover {
  transform: translateY(-5px);
}

.model-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  border: 3px solid white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.model-image:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
}

.image-info {
  margin-top: 15px;
  color: white;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

.image-info h3 {
  margin: 10px 0 5px 0;
  font-size: 1.5em;
  font-weight: bold;
}

.image-info p {
  margin: 0;
  font-size: 0.9em;
  opacity: 0.9;
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .model-image-container {
    padding: 15px;
    margin: 15px 0;
  }
  
  .image-info h3 {
    font-size: 1.3em;
  }
}

@media (max-width: 480px) {
  .model-image-container {
    padding: 10px;
  }
  
  .model-image {
    border-width: 2px;
  }
  
  .image-info h3 {
    font-size: 1.1em;
  }
  
  .image-info p {
    font-size: 0.8em;
  }
}
</style>