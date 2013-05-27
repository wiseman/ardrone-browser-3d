var Drone = function() {
  THREE.Object3D.call(this);
  var material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
  });
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
  m.makeRotationFromEuler(new THREE.Vector3(euler.roll * PI180,
                                            euler.yaw * -PI180,
                                            euler.pitch * PI180),
                          'YZX');
  this.matrix = m;
  this.matrixAutoUpdate = false;
  this.updateMatrixWorld(true);
};
