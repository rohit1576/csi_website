window.onload =function () {

    // From here script other than sphere

        $('#topBannerHead').css("font-size",Math.max(document.body.clientHeight/10,100)+"px");
        $('#topBannerSubhead').css("font-size",Math.max(document.body.clientHeight/10,60)+"px");
    // till here script other than sphere

    $('.itemimg').css("width",Math.min(417,((document.body.clientWidth-60))));

    
    document.getElementById('canvas').setAttribute("style","height:"+document.body.clientHeight+"px");


    // window.mobileAndTabletcheck = function() {
    //     var check = false;
    //     (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    //     return check;
    // };
};
/**
 * Thanks to below for the sphere
 * @author Eberhard Graether / http://egraether.com/
 * @author Mark Lundin 	/ http://mark-lundin.com
 * @author Simone Manini / https://daron1337.github.io
 * @author Luca Antiga 	/ https://lantiga.github.io
 */

THREE.TrackballControls = function ( object, domElement ) {

    var _this = this;
    var STATE = { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_ZOOM_PAN: 4 };

    this.object = object;
    this.domElement = ( domElement !== undefined ) ? domElement : document;

// API

    this.enabled = true;

    this.screen = { left: 0, top: 0, width: 0, height: 0 };

    this.rotateSpeed = 1.0;
    this.zoomSpeed = 1.2;
    this.panSpeed = 0.3;

    this.noRotate = false;
    this.noZoom = false;
    this.noPan = false;

    this.staticMoving = false;
    this.dynamicDampingFactor = 0.2;

    this.minDistance = 0;
    this.maxDistance = Infinity;

    this.keys = [ 65 /*A*/, 83 /*S*/, 68 /*D*/ ];

// internals

    this.target = new THREE.Vector3();

    var EPS = 0.000001;

    var lastPosition = new THREE.Vector3();

    var _state = STATE.NONE,
        _prevState = STATE.NONE,

        _eye = new THREE.Vector3(),

        _movePrev = new THREE.Vector2(),
        _moveCurr = new THREE.Vector2(),

        _lastAxis = new THREE.Vector3(),
        _lastAngle = 0,

        _zoomStart = new THREE.Vector2(),
        _zoomEnd = new THREE.Vector2(),

        _touchZoomDistanceStart = 0,
        _touchZoomDistanceEnd = 0,

        _panStart = new THREE.Vector2(),
        _panEnd = new THREE.Vector2();

// for reset

    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.up0 = this.object.up.clone();

// events

    var changeEvent = { type: 'change' };
    var startEvent = { type: 'start' };
    var endEvent = { type: 'end' };


// methods

    this.handleResize = function () {

        if ( this.domElement === document ) {

            this.screen.left = 0;
            this.screen.top = 0;
            this.screen.width = window.innerWidth;
            this.screen.height = window.innerHeight;

        } else {

            var box = this.domElement.getBoundingClientRect();
            // adjustments come from similar code in the jquery offset() function
            var d = this.domElement.ownerDocument.documentElement;
            this.screen.left = box.left + window.pageXOffset - d.clientLeft;
            this.screen.top = box.top + window.pageYOffset - d.clientTop;
            this.screen.width = box.width;
            this.screen.height = box.height;

        }

    };

    this.handleEvent = function ( event ) {

        if ( typeof this[ event.type ] == 'function' ) {

            this[ event.type ]( event );

        }

    };

    var getMouseOnScreen = ( function () {

        var vector = new THREE.Vector2();

        return function ( pageX, pageY ) {

            vector.set(
                ( pageX - _this.screen.left ) / _this.screen.width,
                ( pageY - _this.screen.top ) / _this.screen.height
            );

            return vector;

        };

    }() );

    var getMouseOnCircle = ( function () {

        var vector = new THREE.Vector2();

        return function ( pageX, pageY ) {

            vector.set(
                ( ( pageX - _this.screen.width * 0.5 - _this.screen.left ) / ( _this.screen.width * 0.5 ) ),
                ( ( _this.screen.height + 2 * ( _this.screen.top - pageY ) ) / _this.screen.width ) // screen.width intentional
            );

            return vector;
        };

    }() );

    this.rotateCamera = (function() {

        var axis = new THREE.Vector3(),
            quaternion = new THREE.Quaternion(),
            eyeDirection = new THREE.Vector3(),
            objectUpDirection = new THREE.Vector3(),
            objectSidewaysDirection = new THREE.Vector3(),
            moveDirection = new THREE.Vector3(),
            angle;

        return function () {

            moveDirection.set( _moveCurr.x - _movePrev.x, _moveCurr.y - _movePrev.y, 0 );
            angle = moveDirection.length();

            if ( angle ) {

                _eye.copy( _this.object.position ).sub( _this.target );

                eyeDirection.copy( _eye ).normalize();
                objectUpDirection.copy( _this.object.up ).normalize();
                objectSidewaysDirection.crossVectors( objectUpDirection, eyeDirection ).normalize();

                objectUpDirection.setLength( _moveCurr.y - _movePrev.y );
                objectSidewaysDirection.setLength( _moveCurr.x - _movePrev.x );

                moveDirection.copy( objectUpDirection.add( objectSidewaysDirection ) );

                axis.crossVectors( moveDirection, _eye ).normalize();

                angle *= _this.rotateSpeed;
                quaternion.setFromAxisAngle( axis, angle );

                _eye.applyQuaternion( quaternion );
                _this.object.up.applyQuaternion( quaternion );

                _lastAxis.copy( axis );
                _lastAngle = angle;

            }

            else if ( !_this.staticMoving && _lastAngle ) {

                _lastAngle *= Math.sqrt( 1.0 - _this.dynamicDampingFactor );
                _eye.copy( _this.object.position ).sub( _this.target );
                quaternion.setFromAxisAngle( _lastAxis, _lastAngle );
                _eye.applyQuaternion( quaternion );
                _this.object.up.applyQuaternion( quaternion );

            }

            _movePrev.copy( _moveCurr );

        };

    }());


    this.zoomCamera = function () {

        var factor;

        if ( _state === STATE.TOUCH_ZOOM_PAN ) {

            factor = _touchZoomDistanceStart / _touchZoomDistanceEnd;
            _touchZoomDistanceStart = _touchZoomDistanceEnd;
            _eye.multiplyScalar( factor );

        } else {

            factor = 1.0 + ( _zoomEnd.y - _zoomStart.y ) * _this.zoomSpeed;

            if ( factor !== 1.0 && factor > 0.0 ) {

                _eye.multiplyScalar( factor );

                if ( _this.staticMoving ) {

                    _zoomStart.copy( _zoomEnd );

                } else {

                    _zoomStart.y += ( _zoomEnd.y - _zoomStart.y ) * this.dynamicDampingFactor;

                }

            }

        }

    };

    this.panCamera = (function() {

        var mouseChange = new THREE.Vector2(),
            objectUp = new THREE.Vector3(),
            pan = new THREE.Vector3();

        return function () {

            mouseChange.copy( _panEnd ).sub( _panStart );

            if ( mouseChange.lengthSq() ) {

                mouseChange.multiplyScalar( _eye.length() * _this.panSpeed );

                pan.copy( _eye ).cross( _this.object.up ).setLength( mouseChange.x );
                pan.add( objectUp.copy( _this.object.up ).setLength( mouseChange.y ) );

                _this.object.position.add( pan );
                _this.target.add( pan );

                if ( _this.staticMoving ) {

                    _panStart.copy( _panEnd );

                } else {

                    _panStart.add( mouseChange.subVectors( _panEnd, _panStart ).multiplyScalar( _this.dynamicDampingFactor ) );

                }

            }
        };

    }());

    this.checkDistances = function () {

        if ( !_this.noZoom || !_this.noPan ) {

            if ( _eye.lengthSq() > _this.maxDistance * _this.maxDistance ) {

                _this.object.position.addVectors( _this.target, _eye.setLength( _this.maxDistance ) );

            }

            if ( _eye.lengthSq() < _this.minDistance * _this.minDistance ) {

                _this.object.position.addVectors( _this.target, _eye.setLength( _this.minDistance ) );

            }

        }

    };

    this.update = function () {

        _eye.subVectors( _this.object.position, _this.target );

        if ( !_this.noRotate ) {

            _this.rotateCamera();

        }

        if ( !_this.noZoom ) {

            _this.zoomCamera();

        }

        if ( !_this.noPan ) {

            _this.panCamera();

        }

        _this.object.position.addVectors( _this.target, _eye );

        _this.checkDistances();

        _this.object.lookAt( _this.target );

        if ( lastPosition.distanceToSquared( _this.object.position ) > EPS ) {

            _this.dispatchEvent( changeEvent );

            lastPosition.copy( _this.object.position );

        }

    };

    this.reset = function () {

        _state = STATE.NONE;
        _prevState = STATE.NONE;

        _this.target.copy( _this.target0 );
        _this.object.position.copy( _this.position0 );
        _this.object.up.copy( _this.up0 );

        _eye.subVectors( _this.object.position, _this.target );

        _this.object.lookAt( _this.target );

        _this.dispatchEvent( changeEvent );

        lastPosition.copy( _this.object.position );

    };

// listeners

    function keydown( event ) {

        if ( _this.enabled === false ) return;

        window.removeEventListener( 'keydown', keydown );

        _prevState = _state;

        if ( _state !== STATE.NONE ) {

            return;

        } else if ( event.keyCode === _this.keys[ STATE.ROTATE ] && !_this.noRotate ) {

            _state = STATE.ROTATE;

        } else if ( event.keyCode === _this.keys[ STATE.ZOOM ] && !_this.noZoom ) {

            _state = STATE.ZOOM;

        } else if ( event.keyCode === _this.keys[ STATE.PAN ] && !_this.noPan ) {

            _state = STATE.PAN;

        }

    }

    function keyup( event ) {

        if ( _this.enabled === false ) return;

        _state = _prevState;

        window.addEventListener( 'keydown', keydown, false );

    }

    function mousedown( event ) {

        if ( _this.enabled === false ) return;

        event.preventDefault();
        event.stopPropagation();

        if ( _state === STATE.NONE ) {

            _state = event.button;

        }

        if ( _state === STATE.ROTATE && !_this.noRotate ) {

            _moveCurr.copy( getMouseOnCircle( event.pageX, event.pageY ) );
            _movePrev.copy(_moveCurr);

        } else if ( _state === STATE.ZOOM && !_this.noZoom ) {

            _zoomStart.copy( getMouseOnScreen( event.pageX, event.pageY ) );
            _zoomEnd.copy(_zoomStart);

        } else if ( _state === STATE.PAN && !_this.noPan ) {

            _panStart.copy( getMouseOnScreen( event.pageX, event.pageY ) );
            _panEnd.copy(_panStart);

        }

        document.addEventListener( 'mousemove', mousemove, false );
        document.addEventListener( 'mouseup', mouseup, false );

        _this.dispatchEvent( startEvent );

    }

    function mousemove( event ) {

        if ( _this.enabled === false ) return;

        event.preventDefault();
        event.stopPropagation();

        if ( _state === STATE.ROTATE && !_this.noRotate ) {

            _movePrev.copy(_moveCurr);
            _moveCurr.copy( getMouseOnCircle( event.pageX, event.pageY ) );

        } else if ( _state === STATE.ZOOM && !_this.noZoom ) {

            _zoomEnd.copy( getMouseOnScreen( event.pageX, event.pageY ) );

        } else if ( _state === STATE.PAN && !_this.noPan ) {

            _panEnd.copy( getMouseOnScreen( event.pageX, event.pageY ) );

        }

    }

    function mouseup( event ) {

        if ( _this.enabled === false ) return;

        event.preventDefault();
        event.stopPropagation();

        _state = STATE.NONE;

        document.removeEventListener( 'mousemove', mousemove );
        document.removeEventListener( 'mouseup', mouseup );
        _this.dispatchEvent( endEvent );

    }

    function mousewheel( event ) {

        if ( _this.enabled === false ) return;

        event.preventDefault();
        event.stopPropagation();

        var delta = 0;

        if ( event.wheelDelta ) { // WebKit / Opera / Explorer 9

            delta = event.wheelDelta / 40;

        } else if ( event.detail ) { // Firefox

            delta = - event.detail / 3;

        }

        _zoomStart.y += delta * 0.01;
        _this.dispatchEvent( startEvent );
        _this.dispatchEvent( endEvent );

    }

    function touchstart( event ) {

        if ( _this.enabled === false ) return;

        switch ( event.touches.length ) {

            case 1:
                _state = STATE.TOUCH_ROTATE;
                _moveCurr.copy( getMouseOnCircle( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
                _movePrev.copy(_moveCurr);
                break;

            case 2:
                _state = STATE.TOUCH_ZOOM_PAN;
                var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
                var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
                _touchZoomDistanceEnd = _touchZoomDistanceStart = Math.sqrt( dx * dx + dy * dy );

                var x = ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX ) / 2;
                var y = ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY ) / 2;
                _panStart.copy( getMouseOnScreen( x, y ) );
                _panEnd.copy( _panStart );
                break;

            default:
                _state = STATE.NONE;

        }
        _this.dispatchEvent( startEvent );


    }

    function touchmove( event ) {

        if ( _this.enabled === false ) return;

        event.preventDefault();
        event.stopPropagation();

        switch ( event.touches.length ) {

            case 1:
                _movePrev.copy(_moveCurr);
                _moveCurr.copy( getMouseOnCircle(  event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
                break;

            case 2:
                var dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
                var dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
                _touchZoomDistanceEnd = Math.sqrt( dx * dx + dy * dy );

                var x = ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX ) / 2;
                var y = ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY ) / 2;
                _panEnd.copy( getMouseOnScreen( x, y ) );
                break;

            default:
                _state = STATE.NONE;

        }

    }

    function touchend( event ) {

        if ( _this.enabled === false ) return;

        switch ( event.touches.length ) {

            case 1:
                _movePrev.copy(_moveCurr);
                _moveCurr.copy( getMouseOnCircle(  event.touches[ 0 ].pageX, event.touches[ 0 ].pageY ) );
                break;

            case 2:
                _touchZoomDistanceStart = _touchZoomDistanceEnd = 0;

                var x = ( event.touches[ 0 ].pageX + event.touches[ 1 ].pageX ) / 2;
                var y = ( event.touches[ 0 ].pageY + event.touches[ 1 ].pageY ) / 2;
                _panEnd.copy( getMouseOnScreen( x, y ) );
                _panStart.copy( _panEnd );
                break;

        }

        _state = STATE.NONE;
        _this.dispatchEvent( endEvent );

    }

    this.domElement.addEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );

    this.domElement.addEventListener( 'mousedown', mousedown, false );

    // this.domElement.addEventListener( 'mousewheel', mousewheel, false );
    // this.domElement.addEventListener( 'DOMMouseScroll', mousewheel, false ); // firefox

    this.domElement.addEventListener( 'touchstart', touchstart, false );
    this.domElement.addEventListener( 'touchend', touchend, false );
    // this.domElement.addEventListener( 'touchmove', touchmove, false );

    window.addEventListener( 'keydown', keydown, false );
    window.addEventListener( 'keyup', keyup, false );

    this.handleResize();

// force an update at start
    this.update();

};

THREE.TrackballControls.prototype = Object.create( THREE.EventDispatcher.prototype );
THREE.TrackballControls.prototype.constructor = THREE.TrackballControls;


(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
    var Get = require('./get');
    var get = new Get();
    var debounce = require('./debounce');
    var Camera = require('./camera');
    var PointLight = require('./pointLight');
    var HemiLight = require('./hemiLight');
    var Mesh = require('./mesh');

    var bodyWidth = document.body.clientWidth;
    var bodyHeight = document.body.clientHeight;
    var fps = 60;
    var frameTime;
    var lastTimeRender = +new Date();

    var canvas;
    var renderer;
    var scene;
    var camera;
    var light;
    var globe;
    var ball;

    var initThree = function() {
        canvas = document.getElementById('canvas');
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        if (!renderer) {
            alert('Three.jsの初期化に失敗しました。');
        }
        renderer.setSize(bodyWidth, bodyHeight);
        canvas.appendChild(renderer.domElement);
        renderer.setClearColor(0xeeeeee, 1.0);

        scene = new THREE.Scene();
    };

    var init = function() {
        let maxrad;
        if(360<(4*bodyWidth/6)){
            maxrad=360;
        }else{
            maxrad=(4*bodyWidth/6);
        }
        console.log("maxwidth set to "+maxrad+" as 4*bodywidth/6:"+(4*bodyWidth/6));
        var ballGeometry = new THREE.SphereGeometry(maxrad, 20, 20);
        var ballMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            shading: THREE.FlatShading
        });

        initThree();

        camera = new Camera();
        camera.init(get.radian(45), get.radian(0), bodyWidth, bodyHeight);

        light = new HemiLight();
        light.init(scene, get.radian(0), get.radian(120), 1000, 0x66ff99, 0x3366aa, 1);

        ball = new Mesh();
        ball.init(scene, ballGeometry, ballMaterial);

        renderloop();
        debounce(window, 'resize', function(event){
            resizeRenderer();
        });
    };

    var render = function() {
        renderer.clear();

        ball.updateVertices();

        renderer.render(scene, camera.obj);
    };

    var renderloop = function() {
        var now = +new Date();
        requestAnimationFrame(renderloop);

        if (now - lastTimeRender > 1000 / fps) {
            render();
            lastTimeRender = +new Date();
        }
        camera.trackball.update();
    };

    var resizeRenderer = function() {
        bodyWidth  = document.body.clientWidth;
        bodyHeight = document.body.clientHeight;
        renderer.setSize(bodyWidth, bodyHeight);
        camera.init(get.radian(45), get.radian(0), bodyWidth, bodyHeight);
    };

    init();

},{"./camera":2,"./debounce":3,"./get":4,"./hemiLight":5,"./mesh":6,"./pointLight":7}],2:[function(require,module,exports){
    var Get = require('./get');
    var get = new Get();

    var exports = function(){
        var Camera = function() {
            this.width = 0;
            this.height = 0;
            this.rad1 = 0;
            this.rad2 = 0;
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.r = 0;
            this.obj;
            this.trackball;
        };

        Camera.prototype.init = function(rad1, rad2, width, height) {
            this.width = width;
            this.height = height;
            this.r = 1200;
            this.rad1 = rad1;
            this.rad2 = rad2;
            this.obj = new THREE.PerspectiveCamera(50, this.width / this.height, 1, 10000);
            this.setPosition(this.rad1, this.rad2, this.r);
            this.initTrackBall();
        };

        Camera.prototype.setPosition = function(rad1, rad2) {
            var points = get.pointSphere(rad1, rad2, this.r);
            this.obj.position.set(points[0], points[1], points[2]);
            this.obj.up.set(0, 1, 0);
            this.obj.lookAt({
                x: 0,
                y: 0,
                z: 0
            });
        };

        Camera.prototype.initTrackBall = function() {
            this.trackball = new THREE.TrackballControls(this.obj, this.canvas);
            this.trackball.screen.width = this.width;
            this.trackball.screen.height = this.height;
            this.trackball.noRotate = false;
            this.trackball.rotateSpeed = 3;
            this.trackball.noZoom = true;
            this.trackball.zoomSpeed = 1;
            this.trackball.noPan = false;
            this.trackball.maxDistance = 3000;
            this.trackball.minDistance = 500;
        };

        return Camera;
    };

    module.exports = exports();

},{"./get":4}],3:[function(require,module,exports){
    module.exports = function(object, eventType, callback){
        var timer;

        object.addEventListener(eventType, function(event) {
            clearTimeout(timer);
            timer = setTimeout(function(){
                callback(event);
            }, 500);
        }, false);
    };

},{}],4:[function(require,module,exports){
    var exports = function(){
        var Get = function() {};

        Get.prototype.randomInt = function(min, max){
            return Math.floor(Math.random() * (max - min)) + min;
        };

        Get.prototype.degree = function(radian) {
            return radian / Math.PI * 180;
        };

        Get.prototype.radian = function(degrees) {
            return degrees * Math.PI / 180;
        };

        Get.prototype.pointSphere = function(rad1, rad2, r) {
            var x = Math.cos(rad1) * Math.cos(rad2) * r;
            var z = Math.cos(rad1) * Math.sin(rad2) * r;
            var y = Math.sin(rad1) * r;
            return [x, y, z];
        };

        return Get;
    };

    module.exports = exports();

},{}],5:[function(require,module,exports){
    var Get = require('./get');
    var get = new Get();

    var exports = function(){
        var HemiLight = function() {
            this.rad1 = 0;
            this.rad2 = 0;
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.r = 0;
            this.obj;
        };

        HemiLight.prototype.init = function(scene, rad1, rad2, r, hex1, hex2, intensity) {
            this.r = r;
            this.obj = new THREE.HemisphereLight(hex1, hex2, intensity);
            this.setPosition(rad1, rad2);
            scene.add(this.obj);
        };

        HemiLight.prototype.setPosition = function(rad1, rad2) {
            var points = get.pointSphere(rad1, rad2, this.r);
            this.obj.position.set(points[0], points[1], points[2]);
        };

        return HemiLight;
    };

    module.exports = exports();

},{"./get":4}],6:[function(require,module,exports){
    var Get = require('./get');
    var get = new Get();

    var exports = function() {
        var Mesh = function() {
            this.r = 0;
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.geometry;
            this.material;
            this.mesh;
            this.vertexArr = [];
            this.vertexDeg = [];
            this.vertexWaveCoe = 0;
        };

        Mesh.prototype.init = function(scene, geometry, material) {
            this.geometry = geometry;
            this.material = material;
            this.mesh = new THREE.Mesh(this.geometry, this.material);
            this.r = this.geometry.parameters.radius;
            this.vertexWaveCoe = this.r / 30;

            this.geometry.mergeVertices();
            this.updateVerticesInt();
            this.setPosition();
            this.mesh.rotation.set(get.radian(45), 0,0);

            scene.add(this.mesh);
        };

        Mesh.prototype.setPosition = function() {
            this.mesh.position.set(this.x, this.y, this.z);
        };

        Mesh.prototype.updateVerticesInt = function() {
            var vertices = this.mesh.geometry.vertices;
            for (var i = 0; i < vertices.length; i++) {
                var r = this.r;
                this.vertexArr[i] = r;
                this.vertexDeg[i] = get.randomInt(0, 360);
                vertices[i].normalize().multiplyScalar(r);
            }
            this.mesh.geometry.computeVertexNormals();
            this.mesh.geometry.computeFaceNormals();
            this.mesh.geometry.verticesNeedUpdate = true;
            this.mesh.geometry.elementsNeedUpdate = true;
            this.mesh.geometry.normalsNeedUpdate = true;
        };

        Mesh.prototype.updateVertices = function() {
            var vertices = this.mesh.geometry.vertices;
            for (var i = 0; i < this.vertexArr.length; i++) {
                var r;
                this.vertexDeg[i] += 8;
                r = this.vertexArr[i] + Math.sin(get.radian(this.vertexDeg[i])) * this.vertexWaveCoe;
                vertices[i].normalize().multiplyScalar(r);
            }
            this.mesh.geometry.computeVertexNormals();
            this.mesh.geometry.computeFaceNormals();
            this.mesh.geometry.verticesNeedUpdate = true;
            this.mesh.geometry.elementsNeedUpdate = true;
            this.mesh.geometry.normalsNeedUpdate = true;
        };

        return Mesh;
    };

    module.exports = exports();

},{"./get":4}],7:[function(require,module,exports){
    var Get = require('./get');
    var get = new Get();

    var exports = function(){
        var PointLight = function() {
            this.rad1 = 0;
            this.rad2 = 0;
            this.x = 0;
            this.y = 0;
            this.z = 0;
            this.r = 0;
            this.obj;
        };

        PointLight.prototype.init = function(scene, rad1, rad2, r, hex, intensity, distance) {
            this.r = r;
            this.obj = new THREE.PointLight(hex, intensity, distance);
            this.setPosition(rad1, rad2);
            scene.add(this.obj);
        };

        PointLight.prototype.setPosition = function(rad1, rad2) {
            var points = get.pointSphere(rad1, rad2, this.r);
            this.obj.position.set(points[0], points[1], points[2]);
        };

        return PointLight;
    };

    module.exports = exports();

},{"./get":4}]},{},[1]);