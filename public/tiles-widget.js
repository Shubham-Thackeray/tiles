import { db, doc, getDoc } from "../firebase.js";

async function fetchTiles(pubId) {
  try {
    const docRef = doc(db, "tiles", pubId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data().tiles.slice(0, 10); // Max 10 tiles
    } else {
      console.error("No tile configuration found!");
      return [];
    }
  } catch (error) {
    console.error("Error fetching tiles:", error);
    return [];
  }
}

async function injectTiles() {
  const scriptTag = document.querySelector("script[data-pubid]");
  if (!scriptTag) {
    console.error("Missing script tag with data-pubid");
    return;
  }

  const pubId = scriptTag.getAttribute("data-pubid");
  const targetDivId = scriptTag.getAttribute("data-target") || "tiles-widget-container";

  let targetDiv = document.getElementById(targetDivId);
  if (!targetDiv) {
    targetDiv = document.createElement("div");
    targetDiv.id = targetDivId;
    document.body.appendChild(targetDiv);
  }

  const tiles = await fetchTiles(pubId);

  targetDiv.innerHTML = `
    <style>
      .tile-container { display: flex; gap: 10px; flex-wrap: wrap; padding: 20px; }
      .tile { width: 100px; height: 100px; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9; cursor: pointer; text-align: center; }
      .tile img { width: 50px; height: 50px; object-fit: contain; }
      .tile p { margin: 5px 0 0; font-size: 14px; font-weight: bold; }
    </style>
    <div class="tile-container">
      ${tiles.map(tile => `
        <div class="tile" onclick="window.open('${tile.url}', '_blank')">
          <img src="${tile.logo}" alt="${tile.name}" />
          <p>${tile.name}</p>
        </div>
      `).join('')}
    </div>
  `;
}

injectTiles();