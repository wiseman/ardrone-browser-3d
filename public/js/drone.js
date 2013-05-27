var Drone = function(model) {
  THREE.Object3D.call(this);
  this.add(model);
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
