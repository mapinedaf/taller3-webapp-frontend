<template>
  <div class="video-container">
    <video
      ref="video"
      class="camera-stream"
      :class="{ flipped: isFlipped }"
      playsinline
      autoplay
      muted
    />
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
      <p class="loading-text">Processing image...</p>
    </div>
  </div>
</template>

<script>
import { classifyResnet60, classifyResnet60Data } from "@/clients/resnet60-client";

export default {
  name: "WebcamView",
  data() {
    return {
      mediaStream: null,
      isFlipped: true,
      isLoading: false,
      imageData: {
        image: "",
        image_orienteation: 0,
      },
    };
  },
  methods: {
    toggleFlip() {
      this.isFlipped = !this.isFlipped;
    },

        capture() {
      const video = this.$refs.video;
      if (!video || !video.videoWidth) {
        throw new Error("La cámara aún no está lista.");
      }

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");

      if (this.isFlipped) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageDataURL = canvas.toDataURL("image/png");
      this.imageData.image = imageDataURL;

      const payload = {
        dataURL: imageDataURL,
        width: canvas.width,
        height: canvas.height,
        orientation: this.imageData.image_orienteation,
      };

      this.$emit("image-captured", payload);
      return payload;
    },
    async predict() {
      if (!this.imageData.image) throw new Error("Primero captura una imagen.");

      this.isLoading = true;
      try {
        const [resultImageUrl, resultJson] = await Promise.all([
          classifyResnet60(this.imageData.image, "png"),
          classifyResnet60Data(this.imageData.image, "png"),
        ]);

        const payload = { resultImageUrl, resultJson };
        this.$emit("predicted", payload);
        return payload;
      } finally {
        this.isLoading = false;
      }
    },

    startVideoStream() {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          this.$refs.video.srcObject = mediaStream;
          this.$refs.video.play();
          this.mediaStream = mediaStream;
        })
        .catch((error) => console.error("Error accessing camera:", error));
    },

    stopVideoStream() {
      if (this.mediaStream) {
        this.mediaStream.getTracks().forEach((t) => t.stop());
        this.mediaStream = null;
      }
    },
  },
  mounted() {
    this.startVideoStream();
  },
  beforeUnmount() {
       this.stopVideoStream();
  },
};
</script>

<style scoped>
.video-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.camera-stream {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.camera-stream.flipped {
  transform: scaleX(-1);
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #ffffff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  color: #ffffff;
  margin-top: 20px;
  font-size: 16px;
  font-weight: 500;
}
</style>
