var Drone = function() {
  THREE.Object3D.call(this);
  var material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
  });
  //this.add(new THREE.AxisHelper(100));
  var loader = new THREE.ColladaLoader();
  var self = this;
  loader.load('assets/ar-drone-2.dae', function(result) {
    //result.scene.rotation = new THREE.Vector3(-Math.PI / 2, 0, -Math.PI / 2);
    self.add(result.scene);
  });
}
Drone.prototype = Object.create(THREE.Object3D.prototype);

Drone.prototype.updateState = function(navdata) {
  var r = navdata.demo.drone.camera.rotation;
  var m = new THREE.Matrix4(r.m11, r.m12, r.m13, 0,
                            r.m21, r.m22, r.m23, 0,
                            r.m31, r.m32, r.m33, 0,
                            0, 0, 0, 1)
  this.matrix = m;
  this.matrixAutoUpdate = false;
  this.updateMatrixWorld(true);
};
