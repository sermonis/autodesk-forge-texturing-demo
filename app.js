let viewer;
let isOpen = false;

function loadModel(urn) {
    options = {
        useADP: false,
        env: "Local",
        isAEC: true,
    };
    viewer = new Autodesk.Viewing.Private.GuiViewer3D(document.getElementById('forgeViewer'));
    Autodesk.Viewing.Initializer(options);
    viewer.start(urn, options, ()=>{
        initPlanogramView();
        viewer.loadExtension("DragDropExtension");       
    });    
}

function onSlider(val) {
  floorExplode( viewer, val, [0] );
  viewer.impl.sceneUpdated(true);
}

function openView(level) {
  viewer.restoreState(vstates[level || 4]);
  if (isOpen) return;
  isOpen = true;
  animate({
    timing: makeEaseOut(circ),
    draw(progress) { onSlider(progress) },
    duration: 800,
  });
}

function resetView() {
  if (!isOpen) return;
  isOpen = false;
  viewer.restoreState(vstates[0]);
  animate({
    timing: makeEaseOut(circ),
    draw(progress) { onSlider(1-progress) },
    duration: 1500,
  });
}


const vstates = [
  {"seedURN":"home","objectSet":[{"id":[],"isolated":[],"hidden":[],"explodeScale":0,"idType":"lmv"}],"viewport":{"name":"","eye":[-18.222875432929598,0.3526622228608508,26.555223498739444],"target":[7.814201856702946,42.295499645768594,-3.129992092350862],"up":[0.2717893048937576,0.43782236007660746,0.8569960062697595],"worldUpVector":[0,0,1],"pivotPoint":[6.977747440338135,43.25436019897461,-2.508857846260071],"distanceToOrbit":57.60506079816494,"aspectRatio":2.0364963503649633,"projection":"orthographic","isOrthographic":true,"orthographicHeight":57.60506079816494},"renderOptions":{"environment":"Boardwalk","ambientOcclusion":{"enabled":false,"radius":12,"intensity":1},"toneMap":{"method":1,"exposure":-7,"lightMultiplier":-1e-20},"appearance":{"ghostHidden":true,"ambientShadow":false,"antiAliasing":true,"progressiveDisplay":false,"swapBlackAndWhite":false,"displayLines":true,"displayPoints":true}},"cutplanes":[[]]},
  {"seedURN":"level1","objectSet":[{"id":[],"isolated":[],"hidden":[2504],"explodeScale":0,"idType":"lmv"}],"viewport":{"name":"","eye":[-36.41125987722669,-30.732643696677684,-86.22762903383037],"target":[-36.365517298329515,-30.676039477578286,-86.29621236253467],"up":[0.431068121123091,0.5334258575508876,0.7277617257368708],"worldUpVector":[0,0,1],"pivotPoint":[19.137502518237405,34.13362693786621,-167.54953570228284],"distanceToOrbit":117.89919814238792,"aspectRatio":1.9121887287024901,"projection":"perspective","isOrthographic":false,"fieldOfView":37.80748210294843}},
  {"seedURN":"level2","objectSet":[{"id":[],"isolated":[],"hidden":[2504,2592,2685,2691,2698,2839,3030,2838],"explodeScale":0,"idType":"lmv"}],"viewport":{"name":"","eye":[-35.46404870563104,-27.529563519257522,-15.30649012863412],"target":[-35.41597137129759,-27.473297920115,-15.373742239357153],"up":[0.4368809056422555,0.5112880372983192,0.7400808180197859],"worldUpVector":[0,0,1],"pivotPoint":[15.488505365572507,34.90642802417278,-77.67748231720651],"distanceToOrbit":101.57194522307726,"aspectRatio":1.9121887287024901,"projection":"perspective","isOrthographic":false,"fieldOfView":37.80748210294843}},
  {"seedURN":"level3","objectSet":[{"id":[],"isolated":[],"hidden":[2993,2995,3001,3707,3708,3709,3710,3711,3778,3788,2544,2545,2924,2037,2533,2553,2557,3057,3102,2504,3105,2216],"explodeScale":0,"idType":"lmv"}],"viewport":{"name":"","eye":[-33.14703887727957,-19.89876367602013,76.69370110727729],"target":[-33.098961542946114,-19.8424980768776,76.62644899655426],"up":[0.43688090564222926,0.5112880372982885,0.7400808180198225],"worldUpVector":[0,0,1],"pivotPoint":[17.422795311668544,39.67309215526787,3.7083339691161967],"distanceToOrbit":106.91478663728728,"aspectRatio":1.9121887287024901,"projection":"perspective","isOrthographic":false,"fieldOfView":37.80748210294843}},
  {"seedURN":"exploded","objectSet":[{"id":[],"isolated":[],"hidden":[],"explodeScale":0,"idType":"lmv"}],"viewport":{"name":"","eye":[-274.98795631207673,-551.2456417563669,18.376081859041367],"target":[-274.94317121075403,-551.1576115714628,18.36042697592285],"up":[0.07098511535741645,0.1395292775008055,0.9876703367611064],"worldUpVector":[0,0,1],"pivotPoint":[17.422795311668544,39.67309215526787,3.7083339691161967],"distanceToOrbit":653.4364492059653,"aspectRatio":1.9121887287024901,"projection":"perspective","isOrthographic":false,"fieldOfView":37.80748217565049}},
];

window.devicePixelRatio = 1.25;

loadModel('svfs/dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dnJwYXJ0eTEvU2FtcGxlUHJvamVjdF9PZmZpY2UucnZ0/5afc0cc9-dae2-c19e-2d3e-096396cba75f/output.svf');

