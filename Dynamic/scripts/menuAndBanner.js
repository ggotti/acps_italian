var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;
function initBanner() {
    canvas = document.getElementById("movie_banner_canvas");
    anim_container = document.getElementById("movie_banner_container");
    dom_overlay_container = document.getElementById("movie_banner_dom_overlay");
    var comp=AdobeAn.getComposition("F2EE6AAC53204C748EF5080F224ED450");
    var lib=comp.getLibrary();
    var loader = new createjs.LoadQueue(false);
    loader.addEventListener("fileload", function(evt){handleFileLoad(evt,comp)});
    loader.addEventListener("complete", function(evt){handleComplete(evt,comp)});
    var lib=comp.getLibrary();
    loader.loadManifest(lib.properties.manifest);
}
function handleFileLoad(evt, comp) {
    var images=comp.getImages();
    if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }
}
function handleComplete(evt,comp) {
    //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
    var lib=comp.getLibrary();
    var ss=comp.getSpriteSheet();
    var queue = evt.target;
    var ssMetadata = lib.ssMetadata;
    for(i=0; i<ssMetadata.length; i++) {
        ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [queue.getResult(ssMetadata[i].name)], "frames": ssMetadata[i].frames} )
    }
    exportRoot = new lib.top_HTML5Canvas();
    stage = new lib.Stage(canvas);
    //Registers the "tick" event listener.
    fnStartAnimation = function() {
        stage.addChild(exportRoot);
        createjs.Ticker.framerate = lib.properties.fps;
        createjs.Ticker.addEventListener("tick", stage);
    }
    //Code to support hidpi screens and responsive scaling.
    AdobeAn.makeResponsive(false,'both',false,1,[canvas,anim_container,dom_overlay_container]);
    AdobeAn.compositionLoaded(lib.properties.id);
    fnStartAnimation();
}

function hideModel(modelToToggle) {
    modelToToggle.style.display = "none";
}

function showModel(modelToToggle) {
    modelToToggle.style.display = "block";
}

function hideAllModals(modals) {
    for(const modal of modals) {
        hideModel(modal)
    }
}

window.onload = function onload() {
    const modalsList = document.getElementsByClassName('modal');
    const modals = Array.from(modalsList).reduce(function(result, item, index,) {
        result[item.id] = item;
        return result;
    }, {});
    const menuBtns = document.getElementsByClassName('menu_btn');

    for(const menuBtn of menuBtns) {
        const buttonId = menuBtn.id;
        const modalName =  buttonId.substring(0, buttonId.lastIndexOf('_'));
        const buttonModal = modals['menu_modal_' + modalName];

        menuBtn.addEventListener("click", function hideModelTrigger() {
            hideAllModals(modalsList)
            showModel(buttonModal);
        })

        buttonModal.addEventListener("mouseleave", function hideModelTrigger() {
            hideModel(buttonModal)
        })
    }

    initBanner()
}
