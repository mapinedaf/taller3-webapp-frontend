<template>
  <div class="page">
    

    <main class="container">
      <section class="card">
        <div class="card-title">
          <h2>Vista de cámara</h2>
          <span class="pill">LIVE</span>
        </div>

        <div class="camera-frame">
          <WebcamView
            ref="webcam"
            @image-captured="onCaptured"
            @predicted="onPredicted"
          />
        </div>

        <div class="controls">
          <button class="btn" @click="capturar">Capturar</button>
          <button class="btn primary" @click="predecir">Predecir</button>
        </div>

        <div v-if="previewUrl" class="preview">
          <img :src="previewUrl" class="preview-img" alt="preview" />
        </div>
      </section>

      <section class="card">
        <div class="card-title">
          <h2>Resultados</h2>
          <span class="counter">{{ resultados.length }}</span>
        </div>

        <div v-if="!resultados.length" class="empty">
          Aún no hay resultados. Captura o predice para verlos aquí.
        </div>

        <ul v-else class="list">
          <li v-for="(r, i) in resultados" :key="i" class="list-item">
            <span class="dot"></span>
            <span class="txt">{{ r }}</span>
          </li>
        </ul>
      </section>
      <section class="card">
        <div class="card-title">
          <h2>Datos del endpoint</h2>
          <span class="counter">{{ predJson ? "OK" : "-" }}</span>
        </div>

        <div class="json-block">
          <label class="lbl">JSON recibido</label>
          <textarea
            class="textarea"
            placeholder="Aquí aparecerá la respuesta del endpoint /data..."
            :value="predJsonPretty"
            readonly
          ></textarea>
        </div>

        <div class="table-wrap" v-if="topPredictions.length">
          <label class="lbl">Top predictions</label>
          <table class="tbl">
            <thead>
              <tr>
                <th>#</th>
                <th>Clase</th>
                <th>Confianza (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(t, i) in topPredictions" :key="i">
                <td>{{ i + 1 }}</td>
                <td>{{ t.class }}</td>
                <td>{{ t.confidence }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="table-wrap" v-if="allProbRows.length">
          <label class="lbl">All probabilities</label>
          <table class="tbl">
            <thead>
              <tr>
                <th>Clase</th>
                <th>Percentage</th>
                <th>Raw</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in allProbRows" :key="row.label">
                <td>{{ row.label }}</td>
                <td>{{ row.percentage }}</td>
                <td class="mono">{{ row.raw }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>


    </main>
  </div>
</template>

<script>

import WebcamView from "../components/WebcamView.vue";

export default {
  name: "ResnetPage",
  components: {  WebcamView },
  data() {
    return {
      resultados: [],
      previewUrl: "",
      predJson: null,
    };
  },
    computed: {
    predJsonPretty() {
      return this.predJson ? JSON.stringify(this.predJson, null, 2) : "";
    },
    topPredictions() {
      return this.predJson?.top_predictions ?? [];
    },
    allProbRows() {
      const ap = this.predJson?.all_probabilities ?? {};
      return Object.entries(ap).map(([label, v]) => ({
        label,
        percentage: v.percentage,
        raw: v.raw,
      }));
    },
  },
  methods: {
    capturar() {
      try {
        const payload = this.$refs.webcam.capture();
        this.previewUrl = payload.dataURL;
        this.resultados.unshift("captura realizada");
      } catch (e) {
        alert(e.message);
      }
    },
    async predecir() {
      try {
        const { resultImageUrl, resultJson } = await this.$refs.webcam.predict();

        
        this.previewUrl = resultImageUrl;

       
        this.predJson = resultJson;

        this.resultados.unshift(
          `predicción: ${resultJson.predicted_class} (${resultJson.confidence}%)`
        );
      } catch (e) {
        alert(e.message);
      }
    },
    onCaptured(payload) {
      console.log("captured", payload);
    },
    onPredicted(payload) {
      console.log("predicted", payload);
    },
  },
};
</script>
<style scoped>
.page{ 
  min-height:100vh; 
  background: #0b1220;
  color:#e5e7eb; 
} 

.container{ 
  max-width: 520px; 
  margin: 0 auto; 
  padding: 14px 14px 22px; 
  display: grid; 
  gap: 14px; 
} 

.card{ 
  background: rgba(17,24,39,0.78); 
  border: 1px solid rgba(255,255,255,0.08); 
  border-radius: 18px; 
  box-shadow: 0 18px 45px rgba(0,0,0,0.35); 
  overflow: hidden; 
} 

.card-title{ 
  display:flex; 
  align-items:center; 
  justify-content:space-between; 
  padding: 14px 14px 10px; 
} 

.card-title h2{ 
  margin:0; 
  font-size: 1rem; 
  font-weight: 700; 
} 

.pill{ 
  font-size:.75rem; 
  padding: 6px 10px; 
  border-radius: 999px; 
  border: 1px solid rgba(239,68,68,0.35); 
  background: rgba(239,68,68,0.12); 
  color: #fecaca; 
} 

.counter{ 
  min-width: 34px; 
  height: 28px; 
  display:grid; 
  place-items:center; 
  border-radius: 10px; 
  border: 1px solid rgba(99,102,241,0.35); 
  background: rgba(99,102,241,0.14); 
  color: #c7d2fe; 
  font-weight: 800; 
} 

.camera-frame{ 
  margin: 0 14px 12px; 
  border-radius: 16px; 
  overflow: hidden; 
  border: 1px solid rgba(255,255,255,0.10); 
  background: rgba(0,0,0,0.25); 
  aspect-ratio: 4 / 3; 
  display:flex; 
  align-items:center; 
  justify-content:center; 
} 

.camera-frame :deep(video),
.camera-frame :deep(canvas),
.camera-frame :deep(img){ 
  width: 100%; 
  height: 100%; 
  object-fit: cover; 
  display:block; 
} 

/* botones */
.controls{ 
  display:grid; 
  grid-template-columns: 1fr 1fr; 
  gap: 10px; 
  padding: 0 14px 14px; 
} 

.btn{ 
  border: 1px solid rgba(255,255,255,0.14); 
  background: rgba(255,255,255,0.06); 
  color:#e5e7eb; 
  padding: 12px 12px; 
  border-radius: 14px; 
  font-weight: 800; 
  cursor:pointer; 
} 

.btn.primary{ 
  border: 1px solid rgba(59,130,246,0.45); 
  background: rgba(59,130,246,0.22); 
} 

.btn:active{ 
  transform: translateY(1px); 
} 

/* resultados */ 
.empty{ 
  padding: 0 14px 16px; 
  color: rgba(229,231,235,0.65); 
  font-size: .92rem; 
} 

.list{ 
  list-style:none; 
  margin:0; 
  padding: 0 14px 14px; 
  display:grid; 
  gap: 10px; 
} 

.list-item{ 
  display:flex; 
  align-items:center; 
  gap: 10px; 
  padding: 10px 12px; 
  border-radius: 14px; 
  border: 1px solid rgba(255,255,255,0.08); 
  background: rgba(255,255,255,0.04); 
} 

.dot{ 
  width: 10px; 
  height: 10px; 
  border-radius: 50%; 
  background: rgba(16,185,129,0.95); 
  box-shadow: 0 0 0 6px rgba(16,185,129,0.10); 
} 

.txt{ 
  font-weight: 600; 
  color:#e5e7eb; 
}

.preview{
  padding: 0 14px 14px;
}

.preview-img{
  width: 100%;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.10);
  display:block;
}

.lbl{
  display:block;
  padding: 0 14px;
  margin: 10px 0 8px;
  color: rgba(229,231,235,0.7);
  font-size: .9rem;
  font-weight: 700;
}

.textarea{
  width: calc(100% - 28px);
  margin: 0 14px 14px;
  min-height: 170px;
  resize: vertical;
  border-radius: 14px;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(0,0,0,0.25);
  color: #e5e7eb;
  padding: 12px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: .85rem;
  outline: none;
}

.table-wrap{
  padding: 0 14px 14px;
}


.tbl{
  width: 100%;
  border-collapse: collapse;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.10);
  background: rgba(255,255,255,0.04);
}

.tbl th, 
.tbl td{
  padding: 10px 12px;
  border-bottom: 1px solid rgba(255,255,255,0.08); 
  text-align: left;
}

.tbl th{
  font-size: .85rem;
  color: #93c5fd; 
  background: rgba(255,255,255,0.06); 
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.tbl td{
  color: rgba(229,231,235,0.88);
}

.tbl td:first-child{
  color: #a5b4fc; 
  font-weight: 700;
}

.tbl tbody tr:first-child td{
  color: #22c55e; 
  font-weight: 800;
}

.tbl tr:last-child td{ 
  border-bottom: none; 
}

.mono{
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: .85rem;
  opacity: .9;
}
</style>
