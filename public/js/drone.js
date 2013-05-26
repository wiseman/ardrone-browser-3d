var Drone = function(navdata) {
  THREE.Object3D.call(this);
  this.navdata = navdata;1
  this.stepNum = 0;

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

Drone.prototype.step = function() {
  var state = this.navdata[Math.floor(this.stepNum / 3)];
  this.stepNum = (this.stepNum + 1) % (this.navdata.length * 3);
  var r = state.demo.drone.camera.rotation;
  var t = state.demo.drone.camera.translation;
  var m = new THREE.Matrix4(r.m11, r.m12, r.m13, 0,
                            r.m21, r.m22, r.m23, 0,
                            r.m31, r.m32, r.m33, 0,
                            0, 0, 0, 1)
  this.matrix = m;
  this.matrixAutoUpdate = false;
  this.updateMatrixWorld(true);
};

Drone.prototype.moveTo = function(x, y, z) {
  this.position.x = x;
  this.position.y = y;
  this.position.z = z;
  this.lowVel = 0;
}
