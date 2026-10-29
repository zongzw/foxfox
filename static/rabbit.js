/* Original low-poly rabbit mesh. The existing MetaMask SVG renderer projects
 * these 3D vertices, culls back faces, sorts depth, and follows the pointer. */
(function () {
  'use strict';
  var positions = [];
  var chunks = [];
  function triangle(a, b, c, color) {
    chunks.push({ color: color, faces: [[a, b, c]] });
  }
  // Faceted ellipsoids share indexed vertices; longitude shading is deterministic.
  function ellipsoid(center, radius, color, segments, rings, lean) {
    var start = positions.length;
    segments = segments || 10;
    rings = rings || 6;
    for (var j = 0; j <= rings; j++) {
      var latitude = Math.PI * j / rings;
      for (var i = 0; i < segments; i++) {
        var longitude = 2 * Math.PI * i / segments;
        var y = radius[1] * Math.cos(latitude);
        positions.push([
          center[0] + radius[0] * Math.sin(latitude) * Math.cos(longitude) + (lean || 0) * y,
          center[1] + y,
          center[2] + radius[2] * Math.sin(latitude) * Math.sin(longitude)
        ]);
      }
    }
    for (var row = 0; row < rings; row++) {
      for (var col = 0; col < segments; col++) {
        var a = start + row * segments + col;
        var b = start + row * segments + (col + 1) % segments;
        var c = a + segments;
        var d = b + segments;
        var shade = 0.88 + 0.12 * Math.sin(2 * Math.PI * (col + 0.5) / segments);
        var fill = color.map(function (channel) { return Math.round(channel * shade); });
        if (row > 0) triangle(a, b, c, fill);
        if (row < rings - 1) triangle(b, d, c, fill);
      }
    }
  }
  var fur = [234, 232, 224];
  ellipsoid([0, -53, -6], [55, 65, 39], fur);
  ellipsoid([-40, -103, 22], [30, 17, 33], [246, 242, 233]);
  ellipsoid([40, -103, 22], [30, 17, 33], [246, 242, 233]);
  ellipsoid([-73, -64, -19], [22, 23, 22], [249, 247, 240]);
  [-1, 1].forEach(function (side) {
    ellipsoid([side * 31, 78, -3], [19, 70, 15], fur, 8, 6, side * 0.14);
    ellipsoid([side * 31, 80, 10], [10, 53, 5], [224, 157, 162], 8, 6, side * 0.14);
  });
  ellipsoid([0, 5, 16], [66, 57, 48], fur, 12, 7);
  [-1, 1].forEach(function (side) {
    ellipsoid([side * 27, 17, 57], [8, 12, 6], [45, 46, 52], 8, 5);
    ellipsoid([side * 25, 21, 62], [2.4, 3.3, 2], [255, 255, 255], 6, 4);
    ellipsoid([side * 19, -16, 57], [24, 18, 12], [251, 246, 236], 8, 5);
  });
  ellipsoid([0, -8, 73], [9, 6, 5], [211, 136, 148], 6, 4);
  ellipsoid([-5, -32, 62], [4, 9, 3], [255, 255, 250], 4, 3);
  ellipsoid([5, -32, 62], [4, 9, 3], [255, 255, 250], 4, 3);
  window.rabbitModel = { positions: positions, chunks: chunks };
}());
