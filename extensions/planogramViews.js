// planogramViews.js

let islineStyle = false;

let retailTable_FragIds = [4859, 5162];
let dropZones = [];//to hold dropZones dbIds

let topView;

// use this to get a view snapshot
// a=NOP_VIEWER.getState();delete(a.objectSet);delete(a.renderOptions);delete(a.seedURN);JSON.stringify(a)
let planogramView = {"viewport":{"name":"","eye":[22.246315535018443,-370.6962297713655,38.384375618575696],"target":[9.203600972938302,36.96692125685452,-10.213350484460486],"up":[-0.0037833422309246282,0.11825216353051067,0.9929763905259364],"worldUpVector":[0,0,1],"pivotPoint":[9.024971008300781,-2.5016374588012695,-3.4947609901428223],"distanceToOrbit":383.7224837908627,"aspectRatio":1.8710106382978724,"projection":"perspective","isOrthographic":false,"fieldOfView":6.88},"cutplanes":[[0,-0.9999999999999998,0,9.238046646118162]]}

function initPlanogramView() {
	viewer.setTheme("light-theme");
	viewer.autocam.shotParams.destinationPercent=10;
	viewer.autocam.shotParams.duration = 0.01;
	viewer.disableHighlight(true);
	viewer.setQualityLevel(false,true); //turn off ambient Occlusion (SSAO)

	setTimeout(()=>{
		viewer.setActiveNavigationTool('pan');
		viewer.setViewCube('top-front');
		viewer.navigation.toPerspective();//Orthographic();
	},3000);
	setTimeout(()=>{
		viewer.setViewCube('top');
		viewer.setCutPlanes([new THREE.Vector4(0, 0, 1, -1.8161059737205505)]);
	},3500);
	setTimeout(()=>{
		viewer.setFOV(2);
		viewer.fitToView( retailTable_FragIds );
	},3600);
	setTimeout(()=>{
		viewer.autocam.setCurrentViewAsHome();
		topView = viewer.getState();
		viewer.autocam.shotParams.destinationPercent=3;
		viewer.autocam.shotParams.duration = 3;
		getDropZoneIDs();
	},3900);

	function getDropZoneIDs() {
		console.log('getDropZoneIDs');
	        viewer.search("AAPL_AVE",(fixtures)=>{
	             dropZones = fixtures.concat();
	             console.log(dropZones);
			},null, ["ART_Family_Name"]);

        	viewer.search("AAPL_FIXT",(fixtures)=>{  
	            dropZones = dropZones.concat(fixtures);
	            console.log(dropZones);
	            viewer.select(dropZones);
	        },null, ["ART_Family_Name"]);
	}
}


function switchtoHomeView() {
	viewer.setActiveNavigationTool('pan');
	viewer.restoreState(topView);
}

function switchtoPlanoView() {
	viewer.setActiveNavigationTool('pan');
	viewer.restoreState(planogramView);
}

function switchToOriginalView() {
	viewer.setActiveNavigationTool('orbit');
	viewer.restoreState(vstates[0]);
}


function toggleLineStyle() {
	islineStyle = !islineStyle;
	viewer.impl.setPostProcessParameter("style", (islineStyle) ? "edging" : "none" );
	viewer.impl.setPostProcessParameter("brightness",0.8);
}



/*
function setNewHomeView2() {
	let testview = {"viewport":{"name":"","eye":[16.923691994782203,8.865203421278082,84.74565245522857],"target":[16.923691994782203,23.75318825660465,-5.7182394677824595],"up":[2.591664663214498e-18,0.9867267592879871,0.16238935465425997],"worldUpVector":[0,0,1],"pivotPoint":[6.977747440338135,43.25436019897461,-2.508857846260071],"distanceToOrbit":91.68079315928249,"aspectRatio":1.6562073669849933,"projection":"orthographic","isOrthographic":true,"orthographicHeight":91.68079315928244},"renderOptions":{"environment":"Photo Booth","ambientOcclusion":{"enabled":false,"radius":10,"intensity":1},"toneMap":{"method":1,"exposure":0,"lightMultiplier":-1},"appearance":{"ghostHidden":true,"ambientShadow":false,"antiAliasing":true,"progressiveDisplay":false,"swapBlackAndWhite":false,"displayLines":true,"displayPoints":true}}}
	viewer.restoreState(testview);
	setTimeout(()=>{
		viewer.setViewCube('top');
		viewer.setCutPlanes([new THREE.Vector4(0, 0, 1, -1.8161059737205505)]);
	},3000);
	setTimeout(()=>{
		viewer.fitToView( retailTable_FragIds );
		viewer.autocam.setCurrentViewAsHome();
		topView = viewer.getState();
	},4000);
}
*/