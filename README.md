ardrone-three
=============

This is an in-browser 3D model of an AR.DRone that shows telemetry
live using three.js.

See a demo at http://wiseman.github.io/ardrone-three/

This is just a simple, ugly hack:

1. Take the ["ar drone 2.0 bleu" Sketchup
model](http://sketchup.google.com/3dwarehouse/details?mid=fb442457163fcdbed04e3327b51cff5c)
by tototech and tweak it a little.

2. Modify eschnou's
[ardrone-webflight](https://github.com/eschnou/ardrone-webflight) a
little.

3. Create a subclass of THREE.Object3D that knows how to transform
rotations from the AR.Drone frame of reference/coordinate system into
the three.js coordinate system:

```
var Drone = function() {
  THREE.Object3D.call(this);
  var loader = new THREE.ColladaLoader();
  var self = this;
  loader.load('assets/ar-drone-2.dae', function(result) {
    result.scene.rotation = new THREE.Vector3(-Math.PI / 2, 0, -Math.PI / 2);
    self.add(result.scene);
  });
}
Drone.prototype = Object.create(THREE.Object3D.prototype);

var PI180 = Math.PI / 180.0;

Drone.prototype.updateState = function(navdata) {
  var euler = navdata.demo.rotation;
  var m = new THREE.Matrix4();
  // I couldn't find documentation on the AR.Drone Euler angle order,
  // but this seems to work.
  m.makeRotationFromEuler(new THREE.Vector3(euler.roll * PI180,
                                            euler.yaw * -PI180,
                                            euler.pitch * PI180),
                          'YZX');
  this.matrix = m;
  this.matrixAutoUpdate = false;
  this.updateMatrixWorld(true);
};
```
