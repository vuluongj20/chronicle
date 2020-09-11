const us = topojson.mesh(usTopo);
const world = topojson.mesh(worldTopo);

function convertToVertex(long, lat, r) {
  const lambda = long * Math.PI / 180;
  const phi = lat * Math.PI / 180;
  return new THREE.Vector3(
    r * Math.cos(phi) * Math.cos(lambda),
    r * Math.sin(phi),
    - r * Math.cos(phi) * Math.sin(lambda)
  );
}

function draw(map, material) {
  for (const country of map) {
    const shape = new THREE.Shape();
    for (const coordinate of country) {
      shape.vertices.push(convertToVertex(coordinate[0], coordinate[1], 100));
    }
    const geometry = new THREE.ShapeGeometry( heartShape );
    const line = new THREE.Line(geometry, material);
    scene.add(line);
  }
}

draw(
  world.coordinates,
  new THREE.MeshMatcapMaterial({color: '#333435', side: THREE.DoubleSide})
);
draw(
  us.coordinates,
  new THREE.MeshMatcapMaterial({color: '#54f7f3', side: THREE.DoubleSide})
);

// LOAD SVG TEXTURE
// const canvas = document.createElement("canvas");
// canvas.width = window.innerWidth > 768 ? 8192 : 4096;
// canvas.height = window.innerWidth > 768 ? 4096 : 2048;
// const ctx = canvas.getContext("2d");
// const img = document.createElement("img");
// img.setAttribute("src", "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svg))));
//
// img.onload = function() {
//   ctx.drawImage(img, 0, 0);
//
//   const sphereTexture = new THREE.Texture(canvas);
//   sphereTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
//   sphereTexture.needsUpdate = true;
//   const sphereGeometry = new THREE.SphereBufferGeometry(100, 48, 48)
//   const sphereMaterial  = new THREE.MeshStandardMaterial({map: sphereTexture, color: '#FFFFFF'})
//   const sphereMesh = new THREE.Mesh( sphereGeometry, sphereMaterial )
//   scene.add(sphereMesh)
// }

// COUNTIES
// const us = topojson.mesh(usTopo);
// function convertToVertex(long, lat, r) {
//   const lambda = long * Math.PI / 180;
//   const phi = lat * Math.PI / 180;
//   return new THREE.Vector3(
//     r * Math.cos(phi) * Math.cos(lambda),
//     r * Math.sin(phi),
//     - r * Math.cos(phi) * Math.sin(lambda)
//   );
// }
// function draw(map, material) {
//   for (const county of map) {
//     const geometry = new THREE.Geometry();
//     for (const coordinate of county) {
//       geometry.vertices.push(convertToVertex(coordinate[0], coordinate[1], 100));
//     }
//     geometry.computeBoundingBox();
//     const centroid = new THREE.Vector3();
//     centroid.addVectors( geometry.boundingBox.min, geometry.boundingBox.max );
//     centroid.multiplyScalar(-0.5);
//     const line = new THREE.Line(geometry, material);
//     scene.add(line);
//   }
// }
// draw(
//   us.coordinates,
//   new THREE.MeshMatcapMaterial({color: '#54f7f3', side: THREE.DoubleSide})
// );
