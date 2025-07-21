async function descargarVideo() {
  const input = document.getElementById("tiktokUrl");
  const container = document.getElementById("videoContainer");
  const url = input.value.trim();

  container.innerHTML = "";

  if (!url.startsWith("http")) {
    container.innerHTML = "<p class='error'>Por favor ingresa un enlace válido de TikTok.</p>";
    return;
  }

  container.innerHTML = "Procesando video...";

  try {
    const endpoint = `http://localhost:8000/descargar?url=${encodeURIComponent(url)}`;
    const response = await fetch(endpoint);

    if (response.ok) {
      const blob = await response.blob();
      const videoURL = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = videoURL;
      link.download = "tiktok_video.mp4";
      link.textContent = "Descargar video sin marca de agua";
      link.style.display = "block";
      link.style.color = "#0ff";

      container.innerHTML = "";
      container.appendChild(link);
    } else {
      container.innerHTML = "<p class='error'>Error al descargar el video. Verifica el enlace.</p>";
    }
  } catch (err) {
    container.innerHTML = "<p class='error'>Error al conectar con el servidor.</p>";
    console.error(err);
  }
}
