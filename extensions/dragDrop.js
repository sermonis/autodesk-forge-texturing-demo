// dragdrop.js

// **********************
// Extension for displaying temporary triangle face for the primitives of viewer face.
// **********************


function DragDropExtension(viewer, options) {
    Autodesk.Viewing.Extension.call(this, viewer, options);

    const frgDbid = viewer.model.getFragmentList().fragments.fragId2dbId;

    // when mouse move
    this.onDragOver = function(event) {
        event.preventDefault();

        var screenPoint = {
            x: event.layerX,
            y: event.layerY
        };
        var hitTest = viewer.impl.hitTest(screenPoint.x, screenPoint.y, true);
        if (!hitTest) return;

        // highlight hit test
        let dbId = frgDbid[hitTest.fragId];

        viewer.clearSelection();

        // Select only tables
        viewer.getProperties(dbId, i => {
            if ((i.name.indexOf("Table") > 0) || (i.name.indexOf("Counter") > 0) || (i.name.indexOf("Bay") > 0))
                viewer.select(dbId);
        });
    }


    this.onDrop = function(event) {
        event.preventDefault();

        const imgfile = event.dataTransfer.getData('url');

        // get frag and dbId from hit-test
        var screenPoint = {
            x: event.layerX,
            y: event.layerY
        };
        var hitTest = viewer.impl.hitTest(screenPoint.x, screenPoint.y, true);
        if (!hitTest) return;
        let dbId = frgDbid[hitTest.fragId];

        // get bounding box of hit-object (gather width and height)
        var bbox = new THREE.Box3();
        var fragList = viewer.model.getFragmentList();
        fragList.getWorldBounds(hitTest.fragId, bbox);

        // rotate and transpose our thin-cube on top of hit-object
        let cube = addCube(bbox);

        function addCube(bbox) {
            var tex = THREE.ImageUtils.loadTexture(imgfile);
            tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
            tex.repeat.set(2, 1);
            tex.needsUpdate = true;

            mesh = new THREE.Mesh(
                new THREE.BoxGeometry(bbox.max.x - bbox.min.x, bbox.max.y - bbox.min.y, 0.1),
                new THREE.MeshBasicMaterial({
                    map: tex,
                    //transparent: true,
                    //opacity: 0.89,
                    side: THREE.DoubleSide
                })
            );
            mesh.position.set( 0.5*(bbox.min.x + bbox.max.x), 0.5*(bbox.min.y + bbox.max.y), bbox.max.z+0.1);
            //mesh.rotation.set(0,0,3.14/2);
            viewer.impl.scene.add(mesh);
            viewer.impl.invalidate(true);
            return mesh;
        }

        function alignMesh(hitTest, fragId) {
            var currentMatrix;
            var fragCount = viewer.model.getFragmentList().
            fragments.fragId2dbId.length
            for (var fragId = 0; fragId < fragCount; ++fragId) {
                var mesh = viewer.impl.getRenderProxy(
                    viewer.model,
                    fragId)

                currentMatrix = mesh.matrixWorld;
                var rotation = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), angle);
                var trans = new THREE.Matrix4().makeTranslation(center.x, center.y, center.z);
                currentMatrix.multiply(trans);
                currentMatrix.multiply(rotation);
                var trans = new THREE.Matrix4().makeTranslation(-center.x, -center.y, -center.z);
                currentMatrix.multiply(trans);
            }
            viewer.impl.sceneUpdate(true);

        }

    }

}


DragDropExtension.prototype = Object.create(Autodesk.Viewing.Extension.prototype);
DragDropExtension.prototype.constructor = DragDropExtension;


DragDropExtension.prototype.load = function() {
    viewer.clientContainer.addEventListener("dragover", this.onDragOver);
    viewer.clientContainer.addEventListener("drop", this.onDrop, false);
    return true;
};


DragDropExtension.prototype.unload = function() {
    viewer.clientContainer.removeEventListener(this.listener1);
    viewer.clientContainer.removeEventListener(this.listener2);
    return true;
};

Autodesk.Viewing.theExtensionManager.registerExtension('DragDropExtension', DragDropExtension);